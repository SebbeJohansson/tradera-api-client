import { QueuedRequestResponses } from "./QueuedRequestResponses";
import { ValidationErrors } from "./ValidationErrors";

/**
 * SetPriceOnShopItemsResult
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface SetPriceOnShopItemsResult {
    /** QueuedRequestResponses */
    QueuedRequestResponses?: QueuedRequestResponses;
    /** ValidationErrors */
    ValidationErrors?: ValidationErrors;
}
