import { TermAttributeValues } from "./TermAttributeValues";
import { NumberAttributeValues } from "./NumberAttributeValues";

/**
 * AttributeValues
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface AttributeValues {
    /** TermAttributeValues */
    TermAttributeValues?: TermAttributeValues;
    /** NumberAttributeValues */
    NumberAttributeValues?: NumberAttributeValues;
}
