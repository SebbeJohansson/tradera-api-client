
/**
 * BuyResult
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface BuyResult {
    /** s:int */
    NextBid?: number;
    /** BuyStatus|s:string|Bought,Ended,NotStarted,NotAllowed,PurchaseOwnItem,RegionNotAccepted,UnexpectedError,BuyItNowNoLongerAvailable,PriceChanged,ItemNotFound,NumberOfBuysLimitReached,BuyNotAvailableOnItem */
    Status?: string;
}
