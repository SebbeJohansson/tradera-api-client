
/**
 * transactionStatusUpdateData
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface TransactionStatusUpdateData {
    /** s:int */
    TransactionId?: number;
    /** s:boolean */
    MarkAsPaidConfirmed?: boolean;
    /** s:boolean */
    MarkedAsShipped?: boolean;
    /** s:boolean */
    MarkShippingBooked?: boolean;
}
