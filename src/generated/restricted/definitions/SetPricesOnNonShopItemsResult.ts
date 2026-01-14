import { ValidationErrors1 } from "./ValidationErrors1";

/**
 * SetPricesOnNonShopItemsResult
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface SetPricesOnNonShopItemsResult {
    /** s:boolean */
    IsSuccessful?: boolean;
    /** ValidationErrors */
    ValidationErrors?: ValidationErrors1;
}
