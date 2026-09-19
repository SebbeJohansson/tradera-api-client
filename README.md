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

## Official Tradera API Documentation

- [REST API Getting Started](https://api.tradera.com/documentation/rest-getting-started)
- [REST API Reference](https://api.tradera.com/v4/swagger/index.html)
- [Developer Center](https://api.tradera.com)

## Looking for SOAP API v3?

Tradera's SOAP API remains at v3 and is intended for existing integrations. [Tradera recommends that all new integrations should use the new REST-API.](https://api.tradera.com/documentation/soap-getting-started#:~:text=These%20guides%20are%20for%20existing%20SOAP%20API%20integrations.%20New%20integrations%20should%20start%20with%20the%20REST%20API%20v4.) The previous SOAP client is still available as [`tradera-soap-api-client`](https://www.npmjs.com/package/tradera-soap-api-client), and its source is preserved on the [`archive/v3`](https://github.com/SebbeJohansson/tradera-api-client/tree/archive/v3) branch.
New integrations should use this REST v4 client.

## Versioning

The major version of this package tracks the major version of the Tradera REST API it
targets. This client is `4.x`, so it speaks Tradera REST API v4. If Tradera ships a v5,
this package moves to `5.x`.

That has one consequence worth knowing about before you pin a range:

- **Major** changes only when the targeted Tradera API major changes.
- **Minor** covers everything else that is user visible, including breaking changes to
  this package's own API. A minor bump is not guaranteed to be backwards compatible.
- **Patch** is for fixes that do not change the public API.

So the usual `^4.0.0` range can pull in a breaking change. If you need stability, pin the
minor (`~4.1.0`) or an exact version, and read the release notes before upgrading.

Versions below `4.0.0` on npm are a placeholder publish and are not a usable client.
The `1.x` line belongs to the separate SOAP package linked above.

## Installation

```bash
npm install tradera-api
```
or if you use yarn
```bash
yarn add tradera-api
```


## Usage

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
