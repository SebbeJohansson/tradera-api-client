
/**
 * getFeedbackRequest
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface GetFeedbackRequest {
    /** s:int */
    UserId?: number;
    /** GetFeedbackRole|s:string|All,Seller,Buyer */
    Role?: string;
    /** s:int */
    MaxNumberOfItems?: number;
}
