import { GetItemResult } from "./GetItemResult";

/**
 * GetSearchResultResult
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface GetSearchResultResult {
    /** s:int */
    TotalNumberOfItems?: number;
    /** s:int */
    TotalNumberOfPages?: number;
    /** Items[] */
    Items?: Array<GetItemResult>;
}
