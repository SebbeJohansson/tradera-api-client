
/** LeaveFeedback */
export interface LeaveFeedback {
    /** s:int */
    transactionId?: number;
    /** s:string */
    comment?: string;
    /** FeedbackType|s:string|Positive,Negative */
    type?: string;
}
