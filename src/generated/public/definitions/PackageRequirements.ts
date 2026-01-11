import { ImageLinks } from "./ImageLinks";

/**
 * PackageRequirements
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface PackageRequirements {
    /** s:decimal */
    MaxWeight?: number;
    /** s:decimal */
    MinWeight?: number;
    /** s:decimal */
    MaxSumOfAllSides?: number;
    /** s:decimal */
    MaxSumOfLengthAndHeight?: number;
    /** s:decimal */
    MaxLengthPlusCircumference?: number;
    /** s:decimal */
    MaxLength?: number;
    /** s:decimal */
    MaxWidth?: number;
    /** s:decimal */
    MaxHeight?: number;
    /** s:decimal */
    MaxVolume?: number;
    /** s:decimal */
    MinLength?: number;
    /** s:decimal */
    MinWidth?: number;
    /** s:decimal */
    MinHeight?: number;
    /** Restrictions */
    Restrictions?: ImageLinks;
}
