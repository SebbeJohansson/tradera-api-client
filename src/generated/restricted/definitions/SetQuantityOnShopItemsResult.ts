import { ValidationErrors3 } from "./ValidationErrors3";

/**
 * SetQuantityOnShopItemsResult
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface SetQuantityOnShopItemsResult {
    /** s:int */
    SuccessfulUpdates?: number;
    /** ValidationErrors */
    ValidationErrors?: ValidationErrors3;
}
