import createClient, { type Client as OpenApiClient, type Middleware } from "openapi-fetch";

import type { paths } from "./generated/rest/schema.js";

const DEFAULT_BASE_URL = "https://api.tradera.com";

export interface TraderaUserCredentials {
  userId: number;
  userToken: string;
}

export interface TraderaRetryConfig {
  maxRetries?: number;
  baseDelayMs?: number;
  maxDelayMs?: number;
  multiplier?: number;
  jitter?: number;
  retryUnsafeMethods?: boolean;
}

export interface TraderaClientConfig {
  appId: number;
  appKey: string;
  user?: TraderaUserCredentials;
  userId?: number;
  token?: string;
  baseUrl?: string;
  fetch?: typeof globalThis.fetch;
  headers?: HeadersInit;
  timeoutMs?: number;
  retry?: TraderaRetryConfig;
  rateLimit?: number;
}

export class TraderaConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TraderaConfigError";
  }
}

export class TraderaApiError extends Error {
  readonly status: number;
  readonly body: unknown;
  readonly headers: Headers;
  readonly requestId?: string;

  constructor(response: Response, body: unknown) {
    super(`Tradera API request failed with status ${response.status}`);
    this.name = "TraderaApiError";
    this.status = response.status;
    this.body = body;
    this.headers = response.headers;
    this.requestId = response.headers.get("x-request-id") ?? undefined;
  }
}

async function parseErrorBody(response: Response): Promise<unknown> {
  const text = await response.clone().text();
  if (!text) return undefined;

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

const errorMiddleware: Middleware = {
  async onResponse({ response }) {
    if (!response.ok) {
      throw new TraderaApiError(response, await parseErrorBody(response));
    }

    return response;
  },
};

const retryableMethods = new Set(["GET", "HEAD", "OPTIONS", "PUT", "DELETE"]);

class RateLimiter {
  private readonly capacity: number;
  private tokens: number;
  private updatedAt = Date.now();

  constructor(private readonly rate: number) {
    this.capacity = Math.max(1, rate);
    this.tokens = this.capacity;
  }

  async wait(signal: AbortSignal): Promise<void> {
    while (true) {
      const now = Date.now();
      this.tokens = Math.min(this.capacity, this.tokens + ((now - this.updatedAt) / 1000) * this.rate);
      this.updatedAt = now;
      if (this.tokens >= 1) {
        this.tokens -= 1;
        return;
      }

      await wait(Math.ceil(((1 - this.tokens) / this.rate) * 1000), signal);
    }
  }
}

function validateConfig(config: TraderaClientConfig): void {
  if (!Number.isInteger(config.appId) || config.appId <= 0) {
    throw new TraderaConfigError("appId must be a positive integer");
  }
  if (!config.appKey) {
    throw new TraderaConfigError("appKey is required");
  }

  const hasUserId = config.userId !== undefined;
  const hasToken = config.token !== undefined && config.token !== "";
  if (!config.user && hasUserId !== hasToken) {
    throw new TraderaConfigError("userId and token must be provided together");
  }
  if (config.user && (!Number.isInteger(config.user.userId) || config.user.userId <= 0 || !config.user.userToken)) {
    throw new TraderaConfigError("user credentials require a positive userId and userToken");
  }
  if (config.timeoutMs !== undefined && (!Number.isFinite(config.timeoutMs) || config.timeoutMs <= 0)) {
    throw new TraderaConfigError("timeoutMs must be greater than zero");
  }
  if (config.rateLimit !== undefined && (!Number.isFinite(config.rateLimit) || config.rateLimit <= 0)) {
    throw new TraderaConfigError("rateLimit must be greater than zero");
  }

  const retry = config.retry;
  if (!retry) return;
  if (retry.maxRetries !== undefined && (!Number.isInteger(retry.maxRetries) || retry.maxRetries < 0)) {
    throw new TraderaConfigError("retry.maxRetries must be a non-negative integer");
  }
  for (const [name, value] of [["baseDelayMs", retry.baseDelayMs], ["maxDelayMs", retry.maxDelayMs]] as const) {
    if (value !== undefined && (!Number.isFinite(value) || value < 0)) {
      throw new TraderaConfigError(`retry.${name} must be non-negative`);
    }
  }
  if (retry.multiplier !== undefined && (!Number.isFinite(retry.multiplier) || retry.multiplier <= 0)) {
    throw new TraderaConfigError("retry.multiplier must be greater than zero");
  }
  if (retry.jitter !== undefined && (!Number.isFinite(retry.jitter) || retry.jitter < 0 || retry.jitter > 1)) {
    throw new TraderaConfigError("retry.jitter must be between zero and one");
  }
}

function wait(delayMs: number, signal: AbortSignal): Promise<void> {
  if (signal.aborted) return Promise.reject(signal.reason);
  if (delayMs <= 0) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(done, delayMs);
    function done() {
      signal.removeEventListener("abort", aborted);
      resolve();
    }
    function aborted() {
      clearTimeout(timeout);
      reject(signal.reason);
    }
    signal.addEventListener("abort", aborted, { once: true });
  });
}

function retryDelay(config: TraderaRetryConfig, attempt: number): number {
  const baseDelay = config.baseDelayMs ?? 1000;
  const maximum = config.maxDelayMs ?? 30_000;
  const delay = Math.min(maximum, baseDelay * Math.pow(config.multiplier ?? 2, attempt));
  const jitter = config.jitter ?? 0.2;
  return delay * (1 - jitter + Math.random() * 2 * jitter);
}

function configuredFetch(config: TraderaClientConfig): typeof globalThis.fetch {
  const baseFetch = config.fetch ?? globalThis.fetch;
  const timeoutMs = config.timeoutMs ?? 30_000;
  const retry = config.retry;
  const limiter = config.rateLimit === undefined ? undefined : new RateLimiter(config.rateLimit);

  return async (input, init) => {
    const request = new Request(input, init);
    const controller = new AbortController();
    const abortRequest = () => controller.abort(request.signal.reason);
    if (request.signal.aborted) abortRequest();
    else request.signal.addEventListener("abort", abortRequest, { once: true });
    const timeout = setTimeout(
      () => controller.abort(new DOMException(`Request timed out after ${timeoutMs}ms`, "TimeoutError")),
      timeoutMs,
    );

    try {
      await limiter?.wait(controller.signal);
      const canRetry = retry !== undefined && (retry.retryUnsafeMethods || retryableMethods.has(request.method));
      const maxRetries = canRetry ? (retry.maxRetries ?? 3) : 0;

      for (let attempt = 0; ; attempt++) {
        try {
          const response = await baseFetch(new Request(request, { signal: controller.signal }));
          const retryableResponse = response.status === 429 || response.status >= 500;
          if (!retryableResponse || attempt >= maxRetries) return response;
          await response.body?.cancel();
        } catch (error) {
          if (controller.signal.aborted || attempt >= maxRetries) throw error;
        }
        await wait(retryDelay(retry!, attempt), controller.signal);
      }
    } finally {
      clearTimeout(timeout);
      request.signal.removeEventListener("abort", abortRequest);
    }
  };
}

export abstract class BaseTraderaClient {
  readonly raw: OpenApiClient<paths>;

  constructor(config: TraderaClientConfig, raw?: OpenApiClient<paths>) {
    validateConfig(config);
    if (raw) {
      this.raw = raw;
      return;
    }

    const headers = new Headers(config.headers);
    headers.set("X-App-Id", String(config.appId));
    headers.set("X-App-Key", config.appKey);

    const user = config.user ?? (
      config.userId !== undefined && config.token
        ? { userId: config.userId, userToken: config.token }
        : undefined
    );
    if (user) {
      headers.set("X-User-Id", String(user.userId));
      headers.set("X-User-Token", user.userToken);
    }

    this.raw = createClient<paths>({
      baseUrl: config.baseUrl ?? DEFAULT_BASE_URL,
      fetch: configuredFetch(config),
      headers,
    });
    this.raw.use(errorMiddleware);
  }
}
