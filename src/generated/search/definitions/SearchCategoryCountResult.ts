import { Categories } from "./Categories";
import { Errors } from "./Errors";

/**
 * SearchCategoryCountResult
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface SearchCategoryCountResult {
    /** Categories[] */
    Categories?: Array<Categories>;
    /** Errors[] */
    Errors?: Array<Errors>;
}
