
/**
 * Insurance
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface Insurance {
    /** s:decimal */
    TotalAmount?: number;
    /** s:decimal */
    TotalAmountUpToItemValue?: number;
    /** s:decimal */
    AmountPerKilogram?: number;
    /** s:boolean */
    HasReimbursementUpToPackageCost?: boolean;
}
