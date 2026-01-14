// Import clients for wrapper classes
import { createClientAsync as createSearchClientAsync, type SearchClient } from './generated/search/client.js';
import { createClientAsync as createPublicClientAsync, type PublicClient } from './generated/public/client.js';
import { createClientAsync as createListingClientAsync, type ListingClient } from './generated/listing/client.js';
import { createClientAsync as createRestrictedClientAsync, type RestrictedClient } from './generated/restricted/client.js';
import { createClientAsync as createOrderClientAsync, type OrderClient } from './generated/order/client.js';
import { createClientAsync as createBuyerClientAsync, type BuyerClient } from './generated/buyer/client.js';

// Re-export types that users commonly need (tree-shakeable)
export type { SearchClient } from './generated/search/client.js';
export type { PublicClient } from './generated/public/client.js';
export type { ListingClient } from './generated/listing/client.js';
export type { RestrictedClient } from './generated/restricted/client.js';
export type { OrderClient } from './generated/order/client.js';
export type { BuyerClient } from './generated/buyer/client.js';

/**
 * Configuration for Tradera API authentication.
 */
export interface TraderaAuthConfig {
  /** Your Tradera application ID (number) */
  appId: number;
  /** Your Tradera application key (GUID string) */
  appKey: string;
  /** User ID for RestrictedService (required for services that need user impersonation) */
  userId?: number;
  /** Authorization token for RestrictedService (required for services that need user impersonation) */
  token?: string;
}

// Helper to add auth headers to a client
function addAuthHeader<T extends { addSoapHeader: Function }>(client: T, authConfig: TraderaAuthConfig): T {
  client.addSoapHeader({
    AuthenticationHeader: {
      AppId: authConfig.appId,
      AppKey: authConfig.appKey
    }
  }, '', 'tns', 'http://api.tradera.com');

  if (authConfig.userId !== undefined && authConfig.token) {
    client.addSoapHeader({
      AuthorizationHeader: {
        UserId: authConfig.userId,
        Token: authConfig.token
      }
    }, '', 'tns', 'http://api.tradera.com');
  }

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

/**
 * A convenience wrapper for the Tradera Listing Service API.
 * Handles authentication automatically and provides typed methods for all listing operations.
 * 
 * @see {@link https://api.tradera.com/v3/listingservice.asmx} for API documentation
 * 
 * @example
 * ```typescript
 * const client = new TraderaListingClient({ appId: 1234, appKey: "your-key" });
 * const [result] = await client.getItemRestarts({ itemId: 123456789 });
 * ```
 */
export class TraderaListingClient extends BaseTraderaClient<ListingClient> {
  wsdlUrl = 'https://api.tradera.com/v3/ListingService.asmx?WSDL';

  createClientAsync(wsdlUrl: string): Promise<ListingClient> {
    return createListingClientAsync(wsdlUrl);
  }

  async getItemRestarts(params: Parameters<ListingClient['GetItemRestartsAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.GetItemRestartsAsync(params);
    return result.GetItemRestartsResult;
  }
}

/**
 * A convenience wrapper for the Tradera Restricted Service API.
 * Handles authentication automatically and provides typed methods for all restricted operations.
 * 
 * @see {@link https://api.tradera.com/v3/restrictedservice.asmx} for API documentation
 * 
 * @example
 * ```typescript
 * const client = new TraderaRestrictedClient({ appId: 1234, appKey: "your-key" });
 * const [result] = await client.getItem({ itemId: 123456789 });
 * ```
 */
export class TraderaRestrictedClient extends BaseTraderaClient<RestrictedClient> {
  wsdlUrl = 'https://api.tradera.com/v3/RestrictedService.asmx?WSDL';

  createClientAsync(wsdlUrl: string): Promise<RestrictedClient> {
    return createRestrictedClientAsync(wsdlUrl);
  }

  async getItem(params: Parameters<RestrictedClient['GetItemAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.GetItemAsync(params);
    return result.GetItemResult;
  }

  async getSellerItems(params: Parameters<RestrictedClient['GetSellerItemsAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.GetSellerItemsAsync(params);
    return result.GetSellerItemsResult;
  }

  async getSellerTransactions(params: Parameters<RestrictedClient['GetSellerTransactionsAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.GetSellerTransactionsAsync(params);
    return result.GetSellerTransactionsResult;
  }

  async addItem(params: Parameters<RestrictedClient['AddItemAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.AddItemAsync(params);
    return result.AddItemResult;
  }

  async addItemXml(params: Parameters<RestrictedClient['AddItemXmlAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.AddItemXmlAsync(params);
    return result.AddItemXmlResult;
  }

  async addItemImage(params: Parameters<RestrictedClient['AddItemImageAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.AddItemImageAsync(params);
    return result;
  }

  async addItemCampaignCode(params: Parameters<RestrictedClient['AddItemCampaignCodeAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.AddItemCampaignCodeAsync(params);
    return result;
  }

  async validateCampaignCode(params: Parameters<RestrictedClient['ValidateCampaignCodeAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.ValidateCampaignCodeAsync(params);
    return result.ValidateCampaignCodeResult;
  }

  async addItemCommit(params: Parameters<RestrictedClient['AddItemCommitAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.AddItemCommitAsync(params);
    return result;
  }

  async leaveFeedback(params: Parameters<RestrictedClient['LeaveFeedbackAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.LeaveFeedbackAsync(params);
    return result.LeaveFeedbackResult;
  }

  async endItem(params: Parameters<RestrictedClient['EndItemAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.EndItemAsync(params);
    return result.EndItemResult;
  }

  async addShopItem(params: Parameters<RestrictedClient['AddShopItemAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.AddShopItemAsync(params);
    return result.AddShopItemResult;
  }

  async addShopItemVariant(params: Parameters<RestrictedClient['AddShopItemVariantAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.AddShopItemVariantAsync(params);
    return result.AddShopItemVariantResult;
  }

  async updateShopItem(params: Parameters<RestrictedClient['UpdateShopItemAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.UpdateShopItemAsync(params);
    return result.UpdateShopItemResult;
  }

  async updateShopItemVariant(params: Parameters<RestrictedClient['UpdateShopItemVariantAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.UpdateShopItemVariantAsync(params);
    return result.UpdateShopItemVariantResult;
  }

  async getRequestResults(params: Parameters<RestrictedClient['GetRequestResultsAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.GetRequestResultsAsync(params);
    return result.GetRequestResultsResult;
  }

  async removeShopItem(params: Parameters<RestrictedClient['RemoveShopItemAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.RemoveShopItemAsync(params);
    return result.RemoveShopItemResult;
  }

  async setShopSettings(params: Parameters<RestrictedClient['SetShopSettingsAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.SetShopSettingsAsync(params);
    return result;
  }

  async getShopSettings(params: Parameters<RestrictedClient['GetShopSettingsAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.GetShopSettingsAsync(params);
    return result.GetShopSettingsResult;
  }

  async updateTransactionStatus(params: Parameters<RestrictedClient['UpdateTransactionStatusAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.UpdateTransactionStatusAsync(params);
    return result.UpdateTransactionStatusResult;
  }

  async getUpdatedSellerItems(params: Parameters<RestrictedClient['GetUpdatedSellerItemsAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.GetUpdatedSellerItemsAsync(params);
    return result.GetUpdatedSellerItemsResult;
  }

  async getUserInfo(params: Parameters<RestrictedClient['GetUserInfoAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.GetUserInfoAsync(params);
    return result.GetUserInfoResult;
  }

  async setPriceOnShopItems(params: Parameters<RestrictedClient['SetPriceOnShopItemsAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.SetPriceOnShopItemsAsync(params);
    return result.SetPriceOnShopItemsResult;
  }

  async setPricesOnNonShopItems(params: Parameters<RestrictedClient['SetPricesOnNonShopItemsAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.SetPricesOnNonShopItemsAsync(params);
    return result.SetPricesOnNonShopItemsResult;
  }

  async setActivateDateOnShopItems(params: Parameters<RestrictedClient['SetActivateDateOnShopItemsAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.SetActivateDateOnShopItemsAsync(params);
    return result.SetActivateDateOnShopItemsResult;
  }

  async setQuantityOnShopItems(params: Parameters<RestrictedClient['SetQuantityOnShopItemsAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.SetQuantityOnShopItemsAsync(params);
    return result.SetQuantityOnShopItemsResult;
  }

  async leaveOrderFeedbackToBuyer(params: Parameters<RestrictedClient['LeaveOrderFeedbackToBuyerAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.LeaveOrderFeedbackToBuyerAsync(params);
    return result;
  }

  async getMemberPaymentOptions(params: Parameters<RestrictedClient['GetMemberPaymentOptionsAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.GetMemberPaymentOptionsAsync(params);
    return result.GetMemberPaymentOptionsResult;
  }

  async beginBankIdVerification(params: Parameters<RestrictedClient['BeginBankIdVerificationAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.BeginBankIdVerificationAsync(params);
    return result.BeginBankIdVerificationResult;
  }

  async getBankIdVerificationProgress(params: Parameters<RestrictedClient['GetBankIdVerificationProgressAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.GetBankIdVerificationProgressAsync(params);
    return result.GetBankIdVerificationProgressResult;
  }

  async cancelBankIdVerification(params: Parameters<RestrictedClient['CancelBankIdVerificationAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.CancelBankIdVerificationAsync(params);
    return result;
  }

  async beginBankIdOnFileVerification(params: Parameters<RestrictedClient['BeginBankIdOnFileVerificationAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.BeginBankIdOnFileVerificationAsync(params);
    return result.BeginBankIdOnFileVerificationResult;
  }
}

/**
 * A convenience wrapper for the Tradera Order Service API.
 * Handles authentication automatically and provides typed methods for all order operations.
 *
 * **Authentication required:** This service requires user impersonation credentials.
 * You must provide `userId` and `token` in the auth config.
 *
 * @see {@link https://api.tradera.com/v3/OrderService.asmx} for API documentation
 *
 * @example
 * ```typescript
 * const client = new TraderaOrderClient({
 *   appId: 1234,
 *   appKey: "your-key",
 *   userId: 5678,
 *   token: "user-auth-token"
 * });
 * const [result] = await client.getSellerOrders({});
 * ```
 */
export class TraderaOrderClient extends BaseTraderaClient<OrderClient> {
  wsdlUrl = 'https://api.tradera.com/v3/OrderService.asmx?WSDL';

  createClientAsync(wsdlUrl: string): Promise<OrderClient> {
    return createOrderClientAsync(wsdlUrl);
  }

  async getSellerOrders(params: Parameters<OrderClient['GetSellerOrdersAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.GetSellerOrdersAsync(params);
    return result.GetSellerOrdersResult;
  }

  async setSellerOrderAsShipped(params: Parameters<OrderClient['SetSellerOrderAsShippedAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.SetSellerOrderAsShippedAsync(params);
    return result.SetSellerOrderAsShippedResult;
  }

  async setSellerOrderAsPaid(params: Parameters<OrderClient['SetSellerOrderAsPaidAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.SetSellerOrderAsPaidAsync(params);
    return result.SetSellerOrderAsPaidResult;
  }

  async getOrders(params: Parameters<OrderClient['GetOrdersAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.GetOrdersAsync(params);
    return result.GetOrdersResult;
  }

  async getFreightLabels(params: Parameters<OrderClient['GetFreightLabelsAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.GetFreightLabelsAsync(params);
    return result.GetFreightLabelsResult;
  }
}

/**
 * A convenience wrapper for the Tradera Buyer Service API.
 * Handles authentication automatically and provides typed methods for all buyer operations.
 *
 * **Authentication required:** This service requires user impersonation credentials.
 * You must provide `userId` and `token` in the auth config.
 *
 * @see {@link https://api.tradera.com/v3/BuyerService.asmx} for API documentation
 *
 * @example
 * ```typescript
 * const client = new TraderaBuyerClient({
 *   appId: 1234,
 *   appKey: "your-key",
 *   userId: 5678,
 *   token: "user-auth-token"
 * });
 * const [result] = await client.getBuyerTransactions({});
 * ```
 */
export class TraderaBuyerClient extends BaseTraderaClient<BuyerClient> {
  wsdlUrl = 'https://api.tradera.com/v3/BuyerService.asmx?WSDL';

  createClientAsync(wsdlUrl: string): Promise<BuyerClient> {
    return createBuyerClientAsync(wsdlUrl);
  }

  async buy(params: Parameters<BuyerClient['BuyAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.BuyAsync(params);
    return result.BuyResult;
  }

  async getMemorylistItems(params: Parameters<BuyerClient['GetMemorylistItemsAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.GetMemorylistItemsAsync(params);
    return result.GetMemorylistItemsResult;
  }

  async addToMemorylist(params: Parameters<BuyerClient['AddToMemorylistAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.AddToMemorylistAsync(params);
    return result;
  }

  async removeFromMemorylist(params: Parameters<BuyerClient['RemoveFromMemorylistAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.RemoveFromMemorylistAsync(params);
    return result;
  }

  async getBuyerTransactions(params: Parameters<BuyerClient['GetBuyerTransactionsAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.GetBuyerTransactionsAsync(params);
    return result.GetBuyerTransactionsResult;
  }

  async getBiddingInfo(params: Parameters<BuyerClient['GetBiddingInfoAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.GetBiddingInfoAsync(params);
    return result.GetBiddingInfoResult;
  }

  async getSellerInfo(params: Parameters<BuyerClient['GetSellerInfoAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.GetSellerInfoAsync(params);
    return result.GetSellerInfoResult;
  }

  async markTransactionsPaid(params: Parameters<BuyerClient['MarkTransactionsPaidAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.MarkTransactionsPaidAsync(params);
    return result;
  }

  async sendQuestionToSeller(params: Parameters<BuyerClient['SendQuestionToSellerAsync']>[0]) {
    const client = await this.initialize();
    const [result] = await client.SendQuestionToSellerAsync(params);
    return result.SendQuestionToSellerResult;
  }
}

