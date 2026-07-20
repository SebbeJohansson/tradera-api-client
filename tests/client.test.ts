import { describe, expect, it, vi } from "vitest";

import {
  createTraderaClient,
  TraderaApiError,
  TraderaPublicClient,
  TraderaRestrictedClient,
  TraderaSearchClient,
} from "../src/index.js";

function jsonResponse(body: unknown, init?: ResponseInit): Response {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      "content-type": "application/json",
      ...init?.headers,
    },
  });
}

describe("createTraderaClient", () => {
  it("adds application credentials to requests", async () => {
    const fetch = vi.fn<typeof globalThis.fetch>(async (request) => {
      expect(request.url).toBe("https://api.tradera.com/v4/reference-data/time");
      expect(request.headers.get("X-App-Id")).toBe("1234");
      expect(request.headers.get("X-App-Key")).toBe("app-key");
      expect(request.headers.has("X-User-Id")).toBe(false);
      return jsonResponse("2026-07-20T12:00:00Z");
    });
    const client = createTraderaClient({ appId: 1234, appKey: "app-key", fetch });

    const data = await client.getOfficialTime();

    expect(data).toBe("2026-07-20T12:00:00Z");
    expect(fetch).toHaveBeenCalledOnce();
  });

  it("adds user credentials and preserves custom headers", async () => {
    const fetch = vi.fn<typeof globalThis.fetch>(async (request) => {
      expect(request.headers.get("X-User-Id")).toBe("5678");
      expect(request.headers.get("X-User-Token")).toBe("user-token");
      expect(request.headers.get("X-Client-Name")).toBe("test-client");
      return jsonResponse({});
    });
    const client = createTraderaClient({
      appId: 1234,
      appKey: "app-key",
      user: { userId: 5678, userToken: "user-token" },
      headers: { "X-Client-Name": "test-client" },
      fetch,
    });

    await client.getCurrentUser();

    expect(fetch).toHaveBeenCalledOnce();
  });

  it.each([
    [jsonResponse({ code: "InvalidCredentials" }, { status: 401, headers: { "x-request-id": "request-1" } }), { code: "InvalidCredentials" }],
    [new Response("temporarily unavailable", { status: 503 }), "temporarily unavailable"],
  ])("throws TraderaApiError for unsuccessful responses", async (response, expectedBody) => {
    const client = createTraderaClient({
      appId: 1234,
      appKey: "app-key",
      fetch: vi.fn(async () => response),
    });

    const request = client.getOfficialTime();

    await expect(request).rejects.toMatchObject<Partial<TraderaApiError>>({
      name: "TraderaApiError",
      status: response.status,
      body: expectedBody,
    });
  });

  it("maps named method arguments to path and query parameters", async () => {
    const fetch = vi.fn<typeof globalThis.fetch>(async (request) => {
      expect(request.url).toBe("https://api.tradera.com/v4/items/123456789");
      return jsonResponse({ id: 123456789, title: "Vintage item" });
    });
    const client = createTraderaClient({ appId: 1234, appKey: "app-key", fetch });

    const item = await client.getItem({ itemId: 123456789 });

    expect(item).toMatchObject({ id: 123456789, title: "Vintage item" });
  });

  it("maps named search parameters to the REST query", async () => {
    const fetch = vi.fn<typeof globalThis.fetch>(async (request) => {
      const url = new URL(request.url);
      expect(url.pathname).toBe("/v4/search");
      expect(url.searchParams.get("query")).toBe("vintage");
      expect(url.searchParams.get("categoryId")).toBe("10");
      return jsonResponse({ items: [] });
    });
    const client = createTraderaClient({ appId: 1234, appKey: "app-key", fetch });

    await client.search({ query: "vintage", categoryId: 10 });

    expect(fetch).toHaveBeenCalledOnce();
  });
});

describe("service clients", () => {
  it("preserves service classes and object arguments", async () => {
    const fetch = vi.fn<typeof globalThis.fetch>(async (request) => {
      expect(request.url).toBe("https://api.tradera.com/v4/items/123456789");
      return jsonResponse({ id: 123456789 });
    });
    const client = new TraderaPublicClient({
      appId: 1234,
      appKey: "app-key",
      fetch,
    });

    const item = await client.getItem({ itemId: 123456789 });

    expect(item).toMatchObject({ id: 123456789 });
  });

  it("preserves search client calls", async () => {
    const fetch = vi.fn<typeof globalThis.fetch>(async (request) => {
      expect(new URL(request.url).searchParams.get("query")).toBe("vintage");
      return jsonResponse({ items: [] });
    });
    const client = new TraderaSearchClient({
      appId: 1234,
      appKey: "app-key",
      fetch,
    });

    await client.search({ query: "vintage" });

    expect(fetch).toHaveBeenCalledOnce();
  });

  it("supports top-level user credentials", async () => {
    const fetch = vi.fn<typeof globalThis.fetch>(async (request) => {
      expect(request.headers.get("X-User-Id")).toBe("5678");
      expect(request.headers.get("X-User-Token")).toBe("user-token");
      return jsonResponse({});
    });
    const client = new TraderaRestrictedClient({
      appId: 1234,
      appKey: "app-key",
      userId: 5678,
      token: "user-token",
      fetch,
    });

    await client.getUserInfo({});

    expect(fetch).toHaveBeenCalledOnce();
  });
});
