// Import clients for wrapper classes
import { createClientAsync as createSearchClientAsync, type SearchClient } from './generated/search/client.js';
import { createClientAsync as createPublicClientAsync, type PublicClient } from './generated/public/client.js';

// Re-export types that users commonly need (tree-shakeable)
export type { SearchClient } from './generated/search/client.js';
export type { PublicClient } from './generated/public/client.js';

/**
 * Configuration for Tradera API authentication.
 */
export interface TraderaAuthConfig {
  /** Your Tradera application ID (number) */
  appId: number;
  /** Your Tradera application key (GUID string) */
  appKey: string;
}

// Helper to add auth headers to a client
function addAuthHeader<T extends { addSoapHeader: Function }>(client: T, authConfig: TraderaAuthConfig): T {
  client.addSoapHeader({
    AuthenticationHeader: {
      AppId: authConfig.appId,
      AppKey: authConfig.appKey
    }
  }, '', 'tns', 'http://api.tradera.com');
  return client;
}

/**
 * Base class for Tradera API clients.
 * Handles client initialization and authentication header setup.
 */

abstract class BaseTraderaClient<TClient extends { addSoapHeader: Function }> {
  protected client: TClient | null = null;
  protected wsdlUrl: string;
  protected authConfig: TraderaAuthConfig;

  constructor(authConfig: TraderaAuthConfig) {
    this.authConfig = authConfig;
  }

  protected async initialize() {
    if (!this.client) {
      this.client = await this.createClientAsync(this.wsdlUrl);
      addAuthHeader(this.client, this.authConfig);
    }
    return this.client;
  }

  protected async createClientAsync(wsdlUrl: string): Promise<TClient> {
    throw new Error('createClientAsync must be implemented by subclass');
  }
}

/**
 * A convenience wrapper for the Tradera Search Service API.
 * Handles authentication automatically and provides typed methods for all search operations.
 * 
 * @see {@link https://api.tradera.com/v3/searchservice.asmx} for API documentation
 * 
 * @example
 * ```typescript
 * const client = new TraderaSearchClient({ appId: 1234, appKey: "your-key" });
 * const [result] = await client.search({ query: "vintage", categoryId: 0 });
 * ```
 */
export class TraderaSearchClient extends BaseTraderaClient<SearchClient> {
  wsdlUrl = 'https://api.tradera.com/v3/SearchService.asmx?WSDL';

  createClientAsync(wsdlUrl: string): Promise<SearchClient> {
    return createSearchClientAsync(wsdlUrl);
  }

  /**
   * Search for items on Tradera.
   * 
   * Possible errors:
   * - `OrderByValidationError` - use of non-existing sort order (OrderBy)
   * - `SearchStringValidationError` - when searching for invalid search words
   * - `InternalError` - internal error
   * 
   * @see {@link https://api.tradera.com/v3/searchservice.asmx?op=Search} for API documentation
   * @param params - Search parameters including query and categoryId
   * @returns A promise with the search result containing items and pagination info
   */
  async search(params: Parameters<SearchClient['SearchAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.SearchAsync(params);
    return result.SearchResult;
  }

  /**
   * Search for items with advanced parameters.
   * 
   * Possible errors:
   * - `OrderByValidationError` - use of non-existing order by (OrderBy)
   * - `ItemTypeValidationError` - use of non-existing item type (ItemType)
   * - `SellerTypeValidationError` - use of non-existing seller type (SellerType)
   * - `ModeValidationError` - use of non-existing mode (Mode)
   * - `ItemStatusValidationError` - use of non-existing item status (ItemStatus)
   * - `ItemConditionValidationError` - use of non-existing item condition (ItemCondition)
   * - `SearchStringValidationError` - when searching for invalid search words
   * - `InternalError` - internal error
   * 
   * @see {@link https://api.tradera.com/v3/searchservice.asmx?op=SearchAdvanced} for API documentation
   * @param params - Advanced search parameters with additional filters
   * @returns A promise with the search result
   */
  async searchAdvanced(params: Parameters<SearchClient['SearchAdvancedAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.SearchAdvancedAsync(params);
    return result.SearchAdvancedResult;
  }

  /**
   * Search for category count - returns the number of items per category matching the search.
   * 
   * Possible errors:
   * - `SellerTypeValidationError` - use of non-existing seller type (SellerType)
   * - `ModeValidationError` - use of non-existing mode (Mode)
   * - `ItemTypeValidationError` - use of non-existing item type (ItemType)
   * - `ItemStatusValidationError` - use of non-existing item status (ItemStatus)
   * - `ItemConditionValidationError` - use of non-existing item condition (ItemCondition)
   * - `SearchStringValidationError` - when searching for invalid search words
   * - `InternalError` - internal error
   * 
   * @see {@link https://api.tradera.com/v3/searchservice.asmx?op=SearchCategoryCount} for API documentation
   * @param params - Search parameters for category count
   * @returns A promise with category count results
   */
  async searchCategoryCount(params: Parameters<SearchClient['SearchCategoryCountAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.SearchCategoryCountAsync(params);
    return result.SearchCategoryCountResult;
  }

  /**
   * Search with a fixed set of possible lists.
   * 
   * @see {@link https://api.tradera.com/v3/searchservice.asmx?op=SearchByFixedCriteria} for API documentation
   * @param params - Fixed criteria search parameters
   * @returns A promise with the search result
   */
  async searchByFixedCriteria(params: Parameters<SearchClient['SearchByFixedCriteriaAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.SearchByFixedCriteriaAsync(params);
    return result.SearchByFixedCriteriaResult;
  }

  /**
   * Search for items on a given zip code.
   * 
   * @see {@link https://api.tradera.com/v3/searchservice.asmx?op=SearchByZipCode} for API documentation
   * @param params - Zip code search parameters
   * @returns A promise with items near the specified zip code
   */
  async searchByZipCode(params: Parameters<SearchClient['SearchByZipCodeAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.SearchByZipCodeAsync(params);
    return result.SearchByZipCodeResult;
  }
}

/**
 * A convenience wrapper for the Tradera Public Service API.
 * Handles authentication automatically and provides typed methods for all public operations.
 * 
 * @see {@link https://api.tradera.com/v3/publicservice.asmx} for API documentation
 * 
 * @example
 * ```typescript
 * const client = new TraderaPublicClient({ appId: 1234, appKey: "your-key" });
 * const [result] = await client.getItem({ itemId: 123456789 });
 * ```
 */
export class TraderaPublicClient extends BaseTraderaClient<PublicClient> {
  wsdlUrl = 'https://api.tradera.com/v3/PublicService.asmx?WSDL';

  /**
   * Gets details for a specific item.
   * 
   * @see {@link https://api.tradera.com/v3/publicservice.asmx?op=GetItem} for API documentation
   * @param params - Parameters containing the item ID
   * @returns A promise with the item details
   */
  async getItem(params: Parameters<PublicClient['GetItemAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.GetItemAsync(params);
    return result.GetItemResult;
  }

  /**
   * Gets items for a specific seller.
   * 
   * @see {@link https://api.tradera.com/v3/publicservice.asmx?op=GetSellerItems} for API documentation
   * @param params - Parameters containing the seller ID
   * @returns A promise with the seller's items
   */
  async getSellerItems(params: Parameters<PublicClient['GetSellerItemsAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.GetSellerItemsAsync(params);
    return result.GetSellerItemsResult;
  }

  /**
   * Returns minimal item information. Useful to get IDs of newly created items.
   * 
   * @see {@link https://api.tradera.com/v3/publicservice.asmx?op=GetSellerItemsQuickInfo} for API documentation
   * @param params - Parameters for quick info request
   * @returns A promise with minimal item information
   */
  async getSellerItemsQuickInfo(params: Parameters<PublicClient['GetSellerItemsQuickInfoAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.GetSellerItemsQuickInfoAsync(params);
    return result.GetSellerItemsQuickInfoResult;
  }

  /**
   * Search for items.
   * 
   * @deprecated Use {@link TraderaSearchClient.search} in SearchService instead.
   * @see {@link https://api.tradera.com/v3/publicservice.asmx?op=GetSearchResult} for API documentation
   * @param params - Search parameters
   * @returns A promise with search results
   */
  async getSearchResult(params: Parameters<PublicClient['GetSearchResultAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.GetSearchResultAsync(params);
    return result.GetSearchResultResult;
  }

  /**
   * Search for items with advanced parameters.
   * 
   * @deprecated Use {@link TraderaSearchClient.searchAdvanced} in SearchService instead.
   * @see {@link https://api.tradera.com/v3/publicservice.asmx?op=GetSearchResultAdvanced} for API documentation
   * @param params - Advanced search parameters
   * @returns A promise with search results
   */
  async getSearchResultAdvanced(params: Parameters<PublicClient['GetSearchResultAdvancedAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.GetSearchResultAdvancedAsync(params);
    return result.GetSearchResultAdvancedResult;
  }

  /**
   * Search for items with advanced parameters, using an XML string.
   * SOAP clients are encouraged to use {@link getSearchResultAdvanced} instead.
   * 
   * @see {@link https://api.tradera.com/v3/publicservice.asmx?op=GetSearchResultAdvancedXml} for API documentation
   * @param params - XML search parameters
   * @returns A promise with search results
   */
  async getSearchResultAdvancedXml(params: Parameters<PublicClient['GetSearchResultAdvancedXmlAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.GetSearchResultAdvancedXmlAsync(params);
    return result.GetSearchResultAdvancedXmlResult;
  }

  /**
   * Gets a user based on their alias.
   * 
   * @see {@link https://api.tradera.com/v3/publicservice.asmx?op=GetUserByAlias} for API documentation
   * @param params - Parameters containing the user alias
   * @returns A promise with user information
   */
  async getUserByAlias(params: Parameters<PublicClient['GetUserByAliasAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.GetUserByAliasAsync(params);
    return result.GetUserByAliasResult;
  }

  /**
   * Returns a previously created authorization token for the specified user.
   * 
   * @see {@link https://api.tradera.com/v3/publicservice.asmx?op=FetchToken} for API documentation
   * @param params - Parameters for token fetch
   * @returns A promise with the authorization token
   */
  async fetchToken(params: Parameters<PublicClient['FetchTokenAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.FetchTokenAsync(params);
    return result.FetchTokenResult;
  }

  /**
   * Returns the official Tradera.com local time (for use with auction endings).
   * 
   * @see {@link https://api.tradera.com/v3/publicservice.asmx?op=GetOfficalTime} for API documentation
   * @param params - Empty parameters object
   * @returns A promise with the official Tradera time
   */
  async getOfficalTime(params: Parameters<PublicClient['GetOfficalTimeAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.GetOfficalTimeAsync(params);
    return result.GetOfficalTimeResult;
  }

  /**
   * Returns a hierarchy of Category objects.
   * 
   * @see {@link https://api.tradera.com/v3/publicservice.asmx?op=GetCategories} for API documentation
   * @param params - Parameters for category request
   * @returns A promise with the category hierarchy
   */
  async getCategories(params: Parameters<PublicClient['GetCategoriesAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.GetCategoriesAsync(params);
    return result.GetCategoriesResult;
  }

  /**
   * Returns definitions of the attributes that may be used on items in the specified category.
   * 
   * @see {@link https://api.tradera.com/v3/publicservice.asmx?op=GetAttributeDefinitions} for API documentation
   * @param params - Parameters containing the category ID
   * @returns A promise with attribute definitions
   */
  async getAttributeDefinitions(params: Parameters<PublicClient['GetAttributeDefinitionsAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.GetAttributeDefinitionsAsync(params);
    return result.GetAttributeDefinitionsResult;
  }

  /**
   * Returns the available payment types.
   * 
   * @deprecated Use {@link getItemFieldValues} instead.
   * @see {@link https://api.tradera.com/v3/publicservice.asmx?op=GetPaymentTypes} for API documentation
   * @param params - Empty parameters object
   * @returns A promise with available payment types
   */
  async getPaymentTypes(params: Parameters<PublicClient['GetPaymentTypesAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.GetPaymentTypesAsync(params);
    return result.GetPaymentTypesResult;
  }

  /**
   * Returns the available accepted bidder types.
   * 
   * @see {@link https://api.tradera.com/v3/publicservice.asmx?op=GetAcceptedBidderTypes} for API documentation
   * @param params - Empty parameters object
   * @returns A promise with accepted bidder types
   */
  async getAcceptedBidderTypes(params: Parameters<PublicClient['GetAcceptedBidderTypesAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.GetAcceptedBidderTypesAsync(params);
    return result.GetAcceptedBidderTypesResult;
  }

  /**
   * Returns the available expo item types. Includes the price in SEK as Value,
   * for possible total fee calculation in the client application.
   * 
   * @see {@link https://api.tradera.com/v3/publicservice.asmx?op=GetExpoItemTypes} for API documentation
   * @param params - Empty parameters object
   * @returns A promise with expo item types and prices
   */
  async getExpoItemTypes(params: Parameters<PublicClient['GetExpoItemTypesAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.GetExpoItemTypesAsync(params);
    return result.GetExpoItemTypesResult;
  }

  /**
   * Returns the available types of shipping when the buyer pays freight.
   * 
   * @deprecated Use {@link getItemFieldValues} instead.
   * @see {@link https://api.tradera.com/v3/publicservice.asmx?op=GetShippingTypes} for API documentation
   * @param params - Empty parameters object
   * @returns A promise with shipping types
   */
  async getShippingTypes(params: Parameters<PublicClient['GetShippingTypesAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.GetShippingTypesAsync(params);
    return result.GetShippingTypesResult;
  }

  /**
   * Returns the available item types.
   * 
   * @see {@link https://api.tradera.com/v3/publicservice.asmx?op=GetItemTypes} for API documentation
   * @param params - Empty parameters object
   * @returns A promise with item types
   */
  async getItemTypes(params: Parameters<PublicClient['GetItemTypesAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.GetItemTypesAsync(params);
    return result.GetItemTypesResult;
  }

  /**
   * Returns a list of counties that can be used in the search query
   * in the method {@link getSearchResultAdvanced}.
   * 
   * @see {@link https://api.tradera.com/v3/publicservice.asmx?op=GetCounties} for API documentation
   * @param params - Empty parameters object
   * @returns A promise with the list of counties
   */
  async getCounties(params: Parameters<PublicClient['GetCountiesAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.GetCountiesAsync(params);
    return result.GetCountiesResult;
  }

  /**
   * Returns an ItemFieldsResponse that holds available values for some of the item fields.
   * 
   * @see {@link https://api.tradera.com/v3/publicservice.asmx?op=GetItemFieldValues} for API documentation
   * @param params - Parameters for field values request
   * @returns A promise with item field values
   */
  async getItemFieldValues(params: Parameters<PublicClient['GetItemFieldValuesAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.GetItemFieldValuesAsync(params);
    return result.GetItemFieldValuesResult;
  }

  /**
   * Gets added descriptions for an item.
   * 
   * @see {@link https://api.tradera.com/v3/publicservice.asmx?op=GetItemAddedDescriptions} for API documentation
   * @param params - Parameters containing the item ID
   * @returns A promise with added descriptions
   */
  async getItemAddedDescriptions(params: Parameters<PublicClient['GetItemAddedDescriptionsAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.GetItemAddedDescriptionsAsync(params);
    return result.GetItemAddedDescriptionsResult;
  }

  /**
   * Returns feedback information regarding a specific user.
   * 
   * @see {@link https://api.tradera.com/v3/publicservice.asmx?op=GetFeedback} for API documentation
   * @param params - Parameters containing the user ID
   * @returns A promise with user feedback
   */
  async getFeedback(params: Parameters<PublicClient['GetFeedbackAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.GetFeedbackAsync(params);
    return result.GetFeedbackResult;
  }

  /**
   * Returns feedback summary regarding a specific user.
   * 
   * @see {@link https://api.tradera.com/v3/publicservice.asmx?op=GetFeedbackSummary} for API documentation
   * @param params - Parameters containing the user ID
   * @returns A promise with user feedback summary
   */
  async getFeedbackSummary(params: Parameters<PublicClient['GetFeedbackSummaryAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.GetFeedbackSummaryAsync(params);
    return result.GetFeedbackSummaryResult;
  }

  /**
   * Gets the available shipping options from a list of countries.
   * 
   * @see {@link https://api.tradera.com/v3/publicservice.asmx?op=GetShippingOptions} for API documentation
   * @param params - Parameters with country list
   * @returns A promise with shipping options
   */
  async getShippingOptions(params: Parameters<PublicClient['GetShippingOptionsAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.GetShippingOptionsAsync(params);
    return result.GetShippingOptionsResult;
  }
}

