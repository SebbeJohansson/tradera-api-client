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

## Available Clients

The unified client exposes each service directly. Every service can also be constructed independently using the same config shape.

| Unified property | Standalone class | Purpose | User authentication |
| --- | --- | --- | --- |
| `client.search` | `TraderaSearchClient` | Item search operations | No |
| `client.public` | `TraderaPublicClient` | Public items, users, categories, and reference data | No |
| `client.listing` | `TraderaListingClient` | Item restart history | No |
| `client.restricted` | `TraderaRestrictedClient` | Authenticated seller, listing, and account operations | Yes |
| `client.order` | `TraderaOrderClient` | Seller order operations | Yes |
| `client.buyer` | `TraderaBuyerClient` | Buyer purchases, transactions, wishlist, and seller information | Yes |

Endpoint methods and parameter types are generated from the pinned OpenAPI contract. See the [REST API Reference](https://api.tradera.com/v4/swagger/index.html) for the full endpoint inventory; stable client method names and service assignments are maintained in [`openapi/client-operations.json`](openapi/client-operations.json).

## Available API Methods

These tables list methods on the standalone service clients and the corresponding service properties on `TraderaClient`. Unified aggregate aliases are not included.

### Search Client

| Method | Description | Documentation |
| --- | --- | --- |
| `search` | Search for items using basic parameters | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `searchAdvanced` | Perform an advanced search with multiple filters | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `searchCategoryCount` | Get category counts for a search query | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `searchByZipCode` | Search for items by zip code | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `searchByFixedCriteria` | Search using fixed criteria such as ending soon or newly listed | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |

### Public Client

| Method | Description | Documentation |
| --- | --- | --- |
| `fetchToken` | Fetch an authentication token for a user | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `getCategories` | Get the category tree | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `getAttributeDefinitions` | Get attribute definitions for a category | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `getItem` | Get a single item by ID | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `getItemAddedDescriptions` | Get added descriptions for an item | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `getSellerItems` | Get items listed by a seller | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `getSellerItemsQuickInfo` | Get quick information for items listed by a seller | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `getOfficalTime` | Get the current Tradera server time | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `getAcceptedBidderTypes` | Get accepted bidder types | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `getExpoItemTypes` | Get expo item types and current fees | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `getItemTypes` | Get available item types | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `getCounties` | Get Swedish counties | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `getItemFieldValues` | Get VAT rates, item attributes, payment types, and shipping types | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `getShippingOptions` | Get shipping options for country codes | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `getUserByAlias` | Get a user by alias | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `getFeedback` | Get feedback for a user | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `getFeedbackSummary` | Get a feedback summary for a user | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |

### Listing Client

| Method | Description | Documentation |
| --- | --- | --- |
| `getItemRestarts` | Get item restart history | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |

### Restricted Client

| Method | Description | Documentation |
| --- | --- | --- |
| `beginBankIdVerification` | Begin a BankID verification | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `beginBankIdOnFileVerification` | Begin a BankID-on-file verification | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `getBankIdVerificationProgress` | Get BankID verification progress | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `cancelBankIdVerification` | Cancel an ongoing BankID verification | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `getItem` | Get an authenticated seller's item | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `endItem` | End an item listing | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `getSellerItems` | Get the authenticated seller's items | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `getUpdatedSellerItems` | Get seller items updated since a row version | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `getSellerTransactions` | Get seller transactions within a date range | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `addItem` | Add an item listing | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `addItemXml` | Add an item listing from XML | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `addItemImage` | Add an image to a pending item request | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `addItemCampaignCode` | Add a campaign code to a pending item request | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `addItemCommit` | Commit and finalize a pending item request | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `setPricesOnNonShopItems` | Set prices on non-shop items | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `updateItemPrice` | Update a non-shop item price without changing its item type | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `addShopItem` | Add a shop item | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `updateShopItem` | Update a shop item | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `addShopItemVariant` | Add a shop item variant | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `updateShopItemVariant` | Update a shop item variant | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `removeShopItem` | Remove a shop item | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `setPriceOnShopItems` | Set prices on shop items | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `setQuantityOnShopItems` | Set quantities on shop items | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `setActivateDateOnShopItems` | Set activation dates on shop items | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `getRequestResults` | Get results for previously queued requests | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `getShopSettings` | Get the authenticated seller's shop settings | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `setShopSettings` | Update the authenticated seller's shop settings | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `leaveFeedback` | Leave feedback for a transaction | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `leaveOrderFeedbackToBuyer` | Leave order feedback for a buyer | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `validateCampaignCode` | Validate a campaign code for a category | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `updateTransactionStatus` | Update a transaction status | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `getUserInfo` | Get the authenticated user's profile | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `getMemberPaymentOptions` | Get the authenticated user's payment options | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |

### Order Client

| Method | Description | Documentation |
| --- | --- | --- |
| `getSellerOrders` | Get seller orders within a date range | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `getOrders` | Get orders by ID | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `setSellerOrderAsShipped` | Mark an order as shipped | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `getFreightLabels` | Get freight labels for orders | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |

### Buyer Client

| Method | Description | Documentation |
| --- | --- | --- |
| `buy` | Buy an item using Buy It Now | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `getBuyerTransactions` | Get the authenticated buyer's transactions | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `getMemorylistItems` | Get the authenticated buyer's wishlist items | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |
| `getSellerInfo` | Get seller information for a user | [REST API Reference](https://api.tradera.com/v4/swagger/index.html) |

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

## Configuration

All unified and standalone clients accept `TraderaClientConfig`:

| Option | Default | Purpose |
| --- | --- | --- |
| `appId` | Required | Positive Tradera application ID |
| `appKey` | Required | Tradera application key |
| `user` | None | Preferred user credentials: `{ userId, userToken }` |
| `userId`, `token` | None | Backward-compatible top-level user credentials; both are required together |
| `baseUrl` | `https://api.tradera.com` | API base URL |
| `fetch` | `globalThis.fetch` | Custom Fetch implementation |
| `headers` | None | Additional request headers |
| `timeoutMs` | `30000` | Timeout for the complete request lifecycle |
| `retry` | Disabled | Retry and exponential-backoff options |
| `rateLimit` | Disabled | Maximum requests per second |

Missing or invalid application credential values, incomplete user credentials, and invalid transport values throw `TraderaConfigError` during client construction.

### Application Authentication

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

Retries use exponential backoff for network failures, `429` responses, and `5xx` responses. Only idempotent HTTP methods are retried by default. Set `retryUnsafeMethods: true` only when the application can safely repeat operations such as purchases or listing creation. The rate limiter is shared by the unified client and all of its service-scoped instances.

### User Impersonation

Some services require **user impersonation** in addition to app credentials. This means you need to provide the Tradera user's ID and authorization token:

- `TraderaRestrictedClient` - For managing items, transactions, shop settings, and account data
- `TraderaOrderClient` - For managing seller orders
- `TraderaBuyerClient` - For purchases, buyer transactions, wishlist items, and seller information

```typescript
const client = new TraderaRestrictedClient({
  appId: YOUR_APP_ID,
  appKey: "YOUR_APP_KEY",
  user: {
    userId: 12345,
    userToken: "USER_TOKEN"
  }
});
```

The top-level `userId` and `token` options remain supported for compatibility, but both values must be supplied together.

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

## Errors

Non-successful HTTP responses throw `TraderaApiError`, which includes the HTTP status, parsed response body, response headers, and Tradera request ID when available:

```typescript
import { TraderaApiError } from 'tradera-api';

try {
  await client.public.getItem({ itemId: 123456789 });
} catch (error) {
  if (error instanceof TraderaApiError) {
    console.error(error.status, error.requestId, error.body);
  }
}
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

Importing a standalone service allows bundlers to remove unrelated service implementations. Importing `createTraderaClient` intentionally includes all six services because the unified client constructs each service-scoped instance.

## Dependencies

- [openapi-fetch](https://www.npmjs.com/package/openapi-fetch) - Typed Fetch client for OpenAPI schemas
- [openapi-typescript](https://www.npmjs.com/package/openapi-typescript) - TypeScript type generator from OpenAPI

## License

MIT
