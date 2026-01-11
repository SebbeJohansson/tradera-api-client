import { ImageLinks } from "./ImageLinks";
import { AttributeValues } from "./AttributeValues";

/**
 * Items
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface Items {
    /** s:int */
    Id?: number;
    /** s:string */
    ShortDescription?: string;
    /** s:int */
    BuyItNowPrice?: number;
    /** s:int */
    SellerId?: number;
    /** s:string */
    SellerAlias?: string;
    /** s:int */
    MaxBid?: number;
    /** s:string */
    ThumbnailLink?: string;
    /** s:double */
    SellerDsrAverage?: number;
    /** s:dateTime */
    EndDate?: Date;
    /** s:int */
    NextBid?: number;
    /** s:boolean */
    HasBids?: boolean;
    /** s:boolean */
    IsEnded?: boolean;
    /** s:string */
    ItemType?: string;
    /** s:string */
    ItemUrl?: string;
    /** s:int */
    CategoryId?: number;
    /** s:int */
    BidCount?: number;
    /** ImageLinks */
    ImageLinks?: ImageLinks;
    /** AttributeValues */
    AttributeValues?: AttributeValues;
    /** s:string */
    LongDescription?: string;
}
