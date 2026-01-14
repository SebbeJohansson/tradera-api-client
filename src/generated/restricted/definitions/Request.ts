
/**
 * request
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface Request {
    /** s:dateTime */
    MinTransactionDate?: Date;
    /** s:dateTime */
    MaxTransactionDate?: Date;
    /** TransactionFilter|s:string|New,NewAndUpdated */
    Filter?: string;
}
