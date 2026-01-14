
/**
 * request
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface Request {
    /** s:dateTime */
    FromDate?: Date;
    /** s:dateTime */
    ToDate?: Date;
    /** SellerOrderQueryDateMode|s:string|CreatedDate,LastUpdatedDate */
    QueryDateMode?: string;
}
