
/** LeaveOrderFeedbackToBuyer */
export interface LeaveOrderFeedbackToBuyer {
    /** s:int */
    orderNumber?: number;
    /** s:string */
    comment?: string;
    /** FeedbackType|s:string|Positive,Negative */
    type?: string;
}
