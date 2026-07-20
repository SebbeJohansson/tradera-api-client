import createClient, { type Client as OpenApiClient, type Middleware } from "openapi-fetch";

import type { paths } from "./generated/rest/schema.js";

const DEFAULT_BASE_URL = "https://api.tradera.com";

export interface TraderaUserCredentials {
  userId: number;
  userToken: string;
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

export abstract class BaseTraderaClient {
  readonly raw: OpenApiClient<paths>;

  constructor(config: TraderaClientConfig) {
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
      fetch: config.fetch,
      headers,
    });
    this.raw.use(errorMiddleware);
  }
}
