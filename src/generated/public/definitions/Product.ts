import { PackageRequirements } from "./PackageRequirements";
import { DeliveryInformation } from "./DeliveryInformation";
import { TermsAndConditions } from "./TermsAndConditions";

/**
 * Product
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface Product {
    /** s:int */
    Id?: number;
    /** s:string */
    ShippingProvider?: string;
    /** s:int */
    ShippingProviderId?: number;
    /** s:string */
    Name?: string;
    /** s:decimal */
    Weight?: number;
    /** s:int */
    Price?: number;
    /** s:int */
    VatPercent?: number;
    /** s:string */
    ToCountry?: string;
    /** s:string */
    FromCountry?: string;
    /** PackageRequirements */
    PackageRequirements?: PackageRequirements;
    /** s:int */
    DimensionsExceededPenalty?: number;
    /** s:int */
    WeightExceededPenalty?: number;
    /** s:boolean */
    DisplayPenaltyWarning?: boolean;
    /** DeliveryInformation */
    DeliveryInformation?: DeliveryInformation;
    /** TermsAndConditions */
    TermsAndConditions?: TermsAndConditions;
}
