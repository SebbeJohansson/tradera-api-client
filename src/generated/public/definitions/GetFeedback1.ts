
/**
 * GetFeedback
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface GetFeedback1 {
    /** FeedbackRole|s:string|Buyer,Seller */
    FeedbackRole?: string;
    /** FeedbackRating|s:string|None,Negative,Positive */
    FeedbackRating?: string;
    /** s:string */
    Alias?: string;
    /** s:string */
    Comment?: string;
    /** s:dateTime */
    Created?: Date;
    /** s:int */
    TotalRating?: number;
}
