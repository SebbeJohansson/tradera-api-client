import { QueuedRequestResponses } from "./QueuedRequestResponses";
import { ValidationErrors2 } from "./ValidationErrors2";

/**
 * SetActivateDateOnShopItemsResult
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface SetActivateDateOnShopItemsResult {
    /** QueuedRequestResponses */
    QueuedRequestResponses?: QueuedRequestResponses;
    /** ValidationErrors */
    ValidationErrors?: ValidationErrors2;
}
