import { GetItemResult } from "./GetItemResult";

/**
 * GetSellerItemsResult
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface GetSellerItemsResult {
    /** Item[] */
    Item?: Array<GetItemResult>;
}
