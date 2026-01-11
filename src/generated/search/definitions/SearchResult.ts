import { Items } from "./Items";
import { Errors } from "./Errors";

/**
 * SearchResult
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface SearchResult {
    /** s:int */
    TotalNumberOfItems?: number;
    /** s:int */
    TotalNumberOfPages?: number;
    /** Items[] */
    Items?: Array<Items>;
    /** Errors[] */
    Errors?: Array<Errors>;
}
