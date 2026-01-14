
/**
 * AuctionBiddingInfo
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface AuctionBiddingInfo {
    /** s:int */
    Id?: number;
    /** s:string */
    ShortDescription?: string;
    /** s:int */
    SellerId?: number;
    /** s:dateTime */
    EndDate?: Date;
    /** s:string */
    ThumbnailLink?: string;
    /** s:boolean */
    ReservePriceReached?: boolean;
    /** s:boolean */
    HasBuyItNowOption?: boolean;
    /** s:int */
    BuyItNowPrice?: number;
    /** s:boolean */
    IsEnded?: boolean;
    /** s:int */
    NextBid?: number;
    /** s:int */
    MaxBid?: number;
    /** s:int */
    MaxBidderId?: number;
    /** s:int */
    TotalBids?: number;
    /** s:int */
    MaxAutoBid?: number;
}
