
/**
 * DetailedSellerRating
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface DetailedSellerRating {
    /** s:int */
    ItemAsDescribedCount?: number;
    /** s:double */
    ItemAsDescribedAverage?: number;
    /** s:int */
    CommResponsivenessCount?: number;
    /** s:double */
    CommResponsivenessAverage?: number;
    /** s:int */
    ShippingTimeCount?: number;
    /** s:double */
    ShippingTimeAverage?: number;
    /** s:int */
    ShippingHandlingChargesCount?: number;
    /** s:double */
    ShippingHandlingChargesAverage?: number;
}
