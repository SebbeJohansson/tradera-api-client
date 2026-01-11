import { IdDescriptionPair } from "./IdDescriptionPair";

/**
 * GetItemFieldValuesResult
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface GetItemFieldValuesResult {
    /** s:int */
    VAT?: Array<number>;
    /** ItemAttributes[] */
    ItemAttributes?: Array<IdDescriptionPair>;
    /** PaymentTypes[] */
    PaymentTypes?: Array<IdDescriptionPair>;
    /** ShippingTypes[] */
    ShippingTypes?: Array<IdDescriptionPair>;
}
