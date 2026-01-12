# Tradera SOAP API Client

<p>
  <a href="https://www.npmjs.com/package/tradera-soap-api-client"><img src="https://img.shields.io/npm/v/tradera-soap-api-client" alt="Version"></a>
  <a href="hhttps://www.npmjs.com/package/tradera-soap-api-client"><img src="https://img.shields.io/npm/dm/tradera-soap-api-client" alt="Downloads"></a>
  <a href="https://github.com/SebbeJohansson/tradera-api-client/blob/main/LICENSE"><img src="https://img.shields.io/github/license/SebbeJohansson/tradera-api-client" alt="License"></a>
</p>

A fully-typed TypeScript client for the [Tradera](https://www.tradera.com) SOAP API. This package provides easy-to-use clients for Tradera's services, with auto-generated TypeScript types and client bindings.

## Features

- 🔒 **Fully typed** - Complete TypeScript definitions for all API methods and responses
- ⚡ **Async/await support** - All API methods return Promises
- 🛠️ **IntelliSense support** - Full autocomplete in VS Code and other TypeScript-aware editors
- 🌳 **Tree-shakeable** - Import only what you need
- 🔄 **Auto-generated** - Client code is generated directly from Tradera's WSDL definitions

## Official Tradera API Documentation

- [Search Service API](https://api.tradera.com/v3/searchservice.asmx)
- [Public Service API](https://api.tradera.com/v3/publicservice.asmx)
- [Developer Center](https://api.tradera.com/DeveloperCenter)

## Installation

```bash
npm install
```

## Usage

### Search Service

Use `TraderaSearchClient` for searching items on Tradera:

```typescript
import { TraderaSearchClient } from 'tradera-soap-api-client';

const searchClient = new TraderaSearchClient({
  appId: YOUR_APP_ID,
  appKey: "YOUR_APP_KEY"
});

// Basic search
const result = await searchClient.search({
  query: "vintage",
  categoryId: 0
});

console.log(result.SearchResult?.Items);
console.log(result.SearchResult?.TotalNumberOfItems);

// Advanced search with filters
const advancedResult = await searchClient.searchAdvanced({
  query: "retro",
  categoryId: 0,
  pageNumber: 1,
  itemsPerPage: 50,
  orderBy: "EndDateAscending"
});

// Search by zip code
const localResult = await searchClient.searchByZipCode({
  zipCode: "11122",
  distance: 10,
  categoryId: 0
});
```

### Public Service

Use `TraderaPublicClient` for accessing item details, user information, categories, and more:

```typescript
import { TraderaPublicClient } from 'tradera-soap-api-client';

const publicClient = new TraderaPublicClient({
  appId: YOUR_APP_ID,
  appKey: "YOUR_APP_KEY"
});

// Get item details
const item = await publicClient.getItem({ itemId: 123456789 });
console.log(item.GetItemResult?.Title);
console.log(item.GetItemResult?.CurrentBid);

// Get all categories
const categories = await publicClient.getCategories({});
console.log(categories.GetCategoriesResult?.Categories);

// Get user information
const user = await publicClient.getUserByAlias({ alias: "username" });
console.log(user.GetUserByAliasResult?.TotalRating);

// Get seller's items
const sellerItems = await publicClient.getSellerItems({ sellerId: 12345 });
console.log(sellerItems.GetSellerItemsResult?.Items);

// Get user feedback
const feedback = await publicClient.getFeedback({ userId: 12345 });
console.log(feedback.GetFeedbackResult?.Feedbacks);

// Get official Tradera time (for auction endings)
const time = await publicClient.getOfficalTime({});
console.log(time.GetOfficalTimeResult);
```

### Using the Raw SOAP Client

For more control, you can use the generated SOAP client directly:

```typescript
import { createClientAsync } from './src/generated/search/client.js';

async function searchTradera() {
  const wsdlUrl = "http://api.tradera.com/v3/SearchService.asmx?WSDL";
  const client = await createClientAsync(wsdlUrl);

  // Add required Tradera authentication headers
  client.addSoapHeader({
    AuthenticationHeader: {
      AppId: YOUR_APP_ID,
      AppKey: "YOUR_APP_KEY"
    }
  }, '', 'tns', 'http://api.tradera.com');

  // Search for items
  const result = await client.SearchAsync({
    query: "vintage",
    categoryId: 0
  });

  console.log(result.SearchResult?.Items);
  console.log(result.SearchResult?.TotalNumberOfItems);
}
```

## Available API Methods

### Search Service

[Official Documentation](https://api.tradera.com/v3/searchservice.asmx)

| Method | Description | Documentation |
|--------|-------------|---------------|
| `search` | Search for items | [Search](https://api.tradera.com/v3/searchservice.asmx?op=Search) |
| `searchAdvanced` | Advanced search with filters | [SearchAdvanced](https://api.tradera.com/v3/searchservice.asmx?op=SearchAdvanced) |
| `searchCategoryCount` | Get category counts for search | [SearchCategoryCount](https://api.tradera.com/v3/searchservice.asmx?op=SearchCategoryCount) |
| `searchByFixedCriteria` | Search with fixed criteria lists | [SearchByFixedCriteria](https://api.tradera.com/v3/searchservice.asmx?op=SearchByFixedCriteria) |
| `searchByZipCode` | Search items near a zip code | [SearchByZipCode](https://api.tradera.com/v3/searchservice.asmx?op=SearchByZipCode) |

### Public Service

[Official Documentation](https://api.tradera.com/v3/publicservice.asmx)

| Method | Description | Documentation |
|--------|-------------|---------------|
| `getItem` | Get details for a specific item | [GetItem](https://api.tradera.com/v3/publicservice.asmx?op=GetItem) |
| `getSellerItems` | Get items from a specific seller | [GetSellerItems](https://api.tradera.com/v3/publicservice.asmx?op=GetSellerItems) |
| `getSellerItemsQuickInfo` | Get minimal item info (useful for new items) | [GetSellerItemsQuickInfo](https://api.tradera.com/v3/publicservice.asmx?op=GetSellerItemsQuickInfo) |
| `getUserByAlias` | Get user information by alias | [GetUserByAlias](https://api.tradera.com/v3/publicservice.asmx?op=GetUserByAlias) |
| `fetchToken` | Fetch authorization token | [FetchToken](https://api.tradera.com/v3/publicservice.asmx?op=FetchToken) |
| `getOfficalTime` | Get official Tradera time | [GetOfficalTime](https://api.tradera.com/v3/publicservice.asmx?op=GetOfficalTime) |
| `getCategories` | Get category hierarchy | [GetCategories](https://api.tradera.com/v3/publicservice.asmx?op=GetCategories) |
| `getAttributeDefinitions` | Get attribute definitions for a category | [GetAttributeDefinitions](https://api.tradera.com/v3/publicservice.asmx?op=GetAttributeDefinitions) |
| `getAcceptedBidderTypes` | Get accepted bidder types | [GetAcceptedBidderTypes](https://api.tradera.com/v3/publicservice.asmx?op=GetAcceptedBidderTypes) |
| `getExpoItemTypes` | Get expo item types with prices | [GetExpoItemTypes](https://api.tradera.com/v3/publicservice.asmx?op=GetExpoItemTypes) |
| `getItemTypes` | Get available item types | [GetItemTypes](https://api.tradera.com/v3/publicservice.asmx?op=GetItemTypes) |
| `getCounties` | Get list of counties for search | [GetCounties](https://api.tradera.com/v3/publicservice.asmx?op=GetCounties) |
| `getItemFieldValues` | Get available item field values | [GetItemFieldValues](https://api.tradera.com/v3/publicservice.asmx?op=GetItemFieldValues) |
| `getItemAddedDescriptions` | Get added descriptions for an item | [GetItemAddedDescriptions](https://api.tradera.com/v3/publicservice.asmx?op=GetItemAddedDescriptions) |
| `getFeedback` | Get user feedback | [GetFeedback](https://api.tradera.com/v3/publicservice.asmx?op=GetFeedback) |
| `getFeedbackSummary` | Get user feedback summary | [GetFeedbackSummary](https://api.tradera.com/v3/publicservice.asmx?op=GetFeedbackSummary) |
| `getShippingOptions` | Get shipping options for countries | [GetShippingOptions](https://api.tradera.com/v3/publicservice.asmx?op=GetShippingOptions) |

#### Deprecated Methods

| Method | Description | Use Instead |
|--------|-------------|-------------|
| `getSearchResult` | Search for items | `TraderaSearchClient.search` |
| `getSearchResultAdvanced` | Advanced search | `TraderaSearchClient.searchAdvanced` |
| `getSearchResultAdvancedXml` | XML-based search | `TraderaSearchClient.searchAdvanced` |
| `getPaymentTypes` | Get payment types | `getItemFieldValues` |
| `getShippingTypes` | Get shipping types | `getItemFieldValues` |

## Scripts

### Build

```bash
npm run build
```

Compiles TypeScript to JavaScript in the `dist/` folder.

### Regenerate Client

```bash
npm run generate-client
```

Regenerates the TypeScript client from Tradera's WSDL definitions. This fetches the latest WSDL from:

- `http://api.tradera.com/v3/SearchService.asmx?WSDL`
- `http://api.tradera.com/v3/PublicService.asmx?WSDL`

## Authentication

To use the Tradera API, you need to register for API credentials at [Tradera's developer portal](https://api.tradera.com/DeveloperCenter). You will receive:

- **AppId** - Your application ID (number)
- **AppKey** - Your application key (GUID string)

These are automatically included in SOAP headers when using the wrapper clients.

## Tree Shaking

This package supports tree shaking. You can import only what you need:

```typescript
// Import only the search client
import { TraderaSearchClient } from 'tradera-soap-api-client';

// Or import types directly from subpaths
import { Search } from 'tradera-soap-api-client/search';
import { Public } from 'tradera-soap-api-client/public';
```

## Dependencies

- [soap](https://www.npmjs.com/package/soap) - SOAP client for Node.js
- [wsdl-tsclient](https://www.npmjs.com/package/wsdl-tsclient) - TypeScript client generator from WSDL

## License

MIT
