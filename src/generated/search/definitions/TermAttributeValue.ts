import { Values } from "./Values";

/**
 * TermAttributeValue
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface TermAttributeValue {
    /** s:int */
    Id?: number;
    /** s:string */
    Name?: string;
    /** Values */
    Values?: Values;
}
