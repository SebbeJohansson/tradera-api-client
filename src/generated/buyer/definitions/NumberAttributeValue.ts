import { Values } from "./Values";

/**
 * NumberAttributeValue
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface NumberAttributeValue {
    /** s:int */
    Id?: number;
    /** s:string */
    Name?: string;
    /** Values */
    Values?: Values;
}
