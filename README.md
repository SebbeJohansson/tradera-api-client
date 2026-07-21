# Tradera API Client

<p>
  <a href="https://www.npmjs.com/package/tradera-api"><img src="https://img.shields.io/npm/v/tradera-api" alt="Version"></a>
  <a href="https://www.npmjs.com/package/tradera-api"><img src="https://img.shields.io/npm/dm/tradera-api" alt="Downloads"></a>
  <a href="https://github.com/SebbeJohansson/tradera-api-client/blob/main/LICENSE"><img src="https://img.shields.io/github/license/sebbejohansson/tradera-api-client" alt="License"></a>
</p>

A fully-typed TypeScript client for the [Tradera](https://www.tradera.com) REST API v4. This package provides easy-to-use clients for Tradera's services, with auto-generated TypeScript types and client bindings.

## Features

- 🔒 **Fully typed** - Complete TypeScript definitions for all API methods and responses
- ⚡ **Async/await support** - All API methods return Promises
- 🛠️ **IntelliSense support** - Full autocomplete in VS Code and other TypeScript-aware editors
- 🌳 **Tree-shakeable** - Import only what you need
- 🔄 **Auto-generated** - Client code is generated directly from Tradera's OpenAPI definition
- **Configurable transport** - Runtime validation, timeouts, retries, rate limiting, custom headers, and custom Fetch implementations

## Official Tradera API Documentation

- [REST API Getting Started](https://api.tradera.com/documentation/rest-getting-started)
- [REST API Reference](https://api.tradera.com/v4/swagger/index.html)
- [Developer Center](https://api.tradera.com)

## Looking for SOAP API v3?

Tradera's SOAP API remains at v3 and is intended for existing integrations. [Tradera recommends that all new integrations should use the new REST-API.](https://api.tradera.com/documentation/soap-getting-started#:~:text=These%20guides%20are%20for%20existing%20SOAP%20API%20integrations.%20New%20integrations%20should%20start%20with%20the%20REST%20API%20v4.) The previous SOAP client is still available as [`tradera-soap-api-client`](https://www.npmjs.com/package/tradera-soap-api-client), and its source is preserved on the [`archive/v3`](https://github.com/SebbeJohansson/tradera-api-client/tree/archive/v3) branch.
New integrations should use this REST v4 client.

## Installation

```bash
npm install tradera-api
```
or if you use yarn
```bash
yarn add tradera-api
```


## Usage

### Unified Client

`TraderaClient` contains every REST operation and exposes service-scoped instances that share the same configuration, transport, and rate limiter:

```typescript
import { createTraderaClient } from 'tradera-api';

const client = createTraderaClient({
  appId: YOUR_APP_ID,
  appKey: "YOUR_APP_KEY"
});

const item = await client.getItem({ itemId: 123456789 });
const searchResult = await client.search.search({ query: "vintage" });
const publicItem = await client.public.getItem({ itemId: 123456789 });
```

The standalone `TraderaSearchClient`, `TraderaPublicClient`, and other service classes remain available when only one API area is needed.

### Search Service

Use `TraderaSearchClient` for searching items on Tradera:

```typescript
import { TraderaSearchClient } from 'tradera-api';

const searchClient = new TraderaSearchClient({
  appId: YOUR_APP_ID,
  appKey: "YOUR_APP_KEY"
});

// Basic search
const result = await searchClient.search({
  query: "vintage",
  categoryId: 0
});

console.log(result);

// Advanced search, category counts, zip code searches, and fixed criteria
// searches are also available as typed methods generated from Tradera's
// OpenAPI definition.
const advancedResult = await searchClient.searchAdvanced({});
```

### Public Service

Use `TraderaPublicClient` for accessing item details, user information, categories, and more:

```typescript
import { TraderaPublicClient } from 'tradera-api';

const publicClient = new TraderaPublicClient({
  appId: YOUR_APP_ID,
  appKey: "YOUR_APP_KEY"
});

// Get item details
const item = await publicClient.getItem({ itemId: 123456789 });
console.log(item?.id);
console.log(item?.shortDescription);

// Get all categories
const categories = await publicClient.getCategories({});
console.log(categories);

// Get user information
const user = await publicClient.getUserByAlias({ alias: "username" });
console.log(user?.totalRating);

// Get seller's items
const sellerItems = await publicClient.getSellerItems({ sellerId: 12345 });
console.log(sellerItems);

// Get user feedback
const feedback = await publicClient.getFeedback({ userId: 12345 });
console.log(feedback);

// Get official Tradera time (for auction endings)
const time = await publicClient.getOfficalTime({});
console.log(time);
```

### Using the Raw REST Client

For more control, you can use the generated path client directly:

```typescript
import { createTraderaClient } from 'tradera-api';

const client = createTraderaClient({
  appId: YOUR_APP_ID,
  appKey: "YOUR_APP_KEY"
});

const { data } = await client.raw.GET('/v4/items/{itemId}', {
  params: {
    path: { itemId: 123456789 }
  }
});

console.log(data);
```

## Available API Methods

### Search Service

[Official Documentation](https://api.tradera.com/v4/swagger/index.html)

| Method | Description | Documentation |
|--------|-------------|---------------|
| `search` | Search for items | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `searchAdvanced` | Advanced search with filters | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `searchCategoryCount` | Get category counts for search | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `searchByFixedCriteria` | Search with fixed criteria lists | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `searchByZipCode` | Search items near a zip code | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |

### Public Service

[Official Documentation](https://api.tradera.com/v4/swagger/index.html)

| Method | Description | Documentation |
|--------|-------------|---------------|
| `getItem` | Get details for a specific item | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `getSellerItems` | Get items from a specific seller | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `getSellerItemsQuickInfo` | Get minimal item info (useful for new items) | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `getUserByAlias` | Get user information by alias | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `fetchToken` | Fetch authorization token | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `getOfficalTime` | Get official Tradera time | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `getCategories` | Get category hierarchy | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `getAttributeDefinitions` | Get attribute definitions for a category | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `getAcceptedBidderTypes` | Get accepted bidder types | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `getExpoItemTypes` | Get expo item types with prices | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `getItemTypes` | Get available item types | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `getCounties` | Get list of counties for search | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `getItemFieldValues` | Get available item field values | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `getItemAddedDescriptions` | Get added descriptions for an item | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `getFeedback` | Get user feedback | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `getFeedbackSummary` | Get user feedback summary | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `getShippingOptions` | Get shipping options for countries | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |

## Scripts

### Build

```bash
yarn build
```

Compiles TypeScript to JavaScript in the `dist/` folder.

### Regenerate Client

```bash
yarn generate
```

Regenerates `src/generated/rest` from the pinned Tradera OpenAPI definition in `openapi/tradera-v4.json`. Stable method names and service assignments are defined in `openapi/client-operations.json` because the upstream definition does not currently provide operation IDs. The generated files should not be edited directly; the authored generator is `scripts/generate-client.ts`.

To fetch the latest OpenAPI definition and regenerate the client:

```bash
yarn update-contract
```

## Authentication

To use the Tradera API, you need to register for API credentials at [Tradera's developer portal](https://api.tradera.com). You will receive:

- **AppId** - Your application ID (number)
- **AppKey** - Your application key (GUID string)

These are automatically included in the `X-App-Id` and `X-App-Key` HTTP headers when using the clients.

### Transport Configuration

Requests time out after 30 seconds by default. Retries and rate limiting are opt-in:

```typescript
const client = createTraderaClient({
  appId: YOUR_APP_ID,
  appKey: "YOUR_APP_KEY",
  timeoutMs: 15_000,
  rateLimit: 5,
  retry: {
    maxRetries: 3,
    baseDelayMs: 500,
    maxDelayMs: 10_000,
    multiplier: 2,
    jitter: 0.2
  }
});
```

Retries use exponential backoff for network failures, `429` responses, and `5xx` responses. Only idempotent HTTP methods are retried by default. Set `retryUnsafeMethods: true` only when the application can safely repeat operations such as purchases or listing creation.

Invalid application credentials, incomplete user credentials, and invalid transport values throw `TraderaConfigError` during client construction.

### User Impersonation

Some services require **user impersonation** in addition to app credentials. This means you need to provide the Tradera user's ID and authorization token:

- [`TraderaRestrictedClient`](src/index.ts) - For managing items, transactions, and shop settings
- [`TraderaOrderClient`](src/index.ts) - For managing orders

```typescript
const client = new TraderaRestrictedClient({
  appId: YOUR_APP_ID,
  appKey: "YOUR_APP_KEY",
  userId: 12345,          // Tradera user ID
  token: "USER_TOKEN"     // Authorization token
});
```

To obtain a user token, use the `fetchToken` method from `TraderaPublicClient`:

```typescript
import { TraderaPublicClient } from 'tradera-api';

const publicClient = new TraderaPublicClient({
  appId: YOUR_APP_ID,
  appKey: "YOUR_APP_KEY"
});

const token = await publicClient.fetchToken({
  userId: 12345,
  secretKey: "USER_SECRET_KEY"
});

console.log(token);
```

## Tree Shaking

This package supports tree shaking. You can import only what you need:

```typescript
// Import only the search client
import { TraderaSearchClient } from 'tradera-api';

// Or import generated contract types
import type { components, paths } from 'tradera-api';

type Item = components['schemas']['Item'];
type GetItemPath = paths['/v4/items/{itemId}'];
```

## Dependencies

- [openapi-fetch](https://www.npmjs.com/package/openapi-fetch) - Typed Fetch client for OpenAPI schemas
- [openapi-typescript](https://www.npmjs.com/package/openapi-typescript) - TypeScript type generator from OpenAPI

## License

MIT
