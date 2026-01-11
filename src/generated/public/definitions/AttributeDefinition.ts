import { ImageLinks } from "./ImageLinks";

/**
 * AttributeDefinition
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface AttributeDefinition {
    /** s:long */
    Id?: number;
    /** s:string */
    Name?: string;
    /** s:string */
    Description?: string;
    /** s:int */
    MaxNumberOfValues?: number;
    /** s:int */
    MinNumberOfValues?: number;
    /** PossibleTermValues */
    PossibleTermValues?: ImageLinks;
    /** s:string */
    Key?: string;
}
