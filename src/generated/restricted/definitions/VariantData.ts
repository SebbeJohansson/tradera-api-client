import { VariantAttributes } from "./VariantAttributes";

/**
 * VariantData
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface VariantData {
    /** s:string */
    VariantGroupId?: string;
    /** VariantAttributes */
    VariantAttributes?: VariantAttributes;
}
