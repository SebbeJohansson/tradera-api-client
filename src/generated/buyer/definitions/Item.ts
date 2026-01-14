import { ShippingOptions } from "./ShippingOptions";
import { PaymentOptions } from "./PaymentOptions";
import { ImageLinks } from "./ImageLinks";
import { Buyers } from "./Buyers";
import { Status } from "./Status";
import { DetailedImageLinks } from "./DetailedImageLinks";
import { AttributeValues } from "./AttributeValues";

/**
 * Item
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface Item {
    /** ShippingOptions[] */
    ShippingOptions?: Array<ShippingOptions>;
    /** PaymentOptions */
    PaymentOptions?: PaymentOptions;
    /** ImageLinks */
    ImageLinks?: ImageLinks;
    /** Buyers[] */
    Buyers?: Array<Buyers>;
    /** Status */
    Status?: Status;
    /** s:int */
    StartQuantity?: number;
    /** s:int */
    RemainingQuantity?: number;
    /** ItemType|s:string|Auction,PureBuyItNow,ShopItem */
    ItemType?: string;
    /** DetailedImageLinks[] */
    DetailedImageLinks?: Array<DetailedImageLinks>;
    /** s:int */
    Id?: number;
    /** s:int */
    VAT?: number;
    /** s:string */
    ShortDescription?: string;
    /** OwnReferences */
    OwnReferences?: ImageLinks;
    /** AttributeValues */
    AttributeValues?: AttributeValues;
    /** ItemAttributes */
    ItemAttributes?: PaymentOptions;
    /** s:string */
    LongDescription?: string;
    /** s:dateTime */
    StartDate?: Date;
    /** s:dateTime */
    EndDate?: Date;
    /** s:int */
    CategoryId?: number;
    /** s:int */
    OpeningBid?: number;
    /** s:int */
    ReservePrice?: number;
    /** s:boolean */
    ReservePriceReached?: boolean;
    /** s:int */
    BuyItNowPrice?: number;
    /** s:int */
    NextBid?: number;
    /** s:string */
    PaymentCondition?: string;
    /** s:string */
    ShippingCondition?: string;
    /** s:boolean */
    AcceptsPickup?: boolean;
    /** s:int */
    TotalBids?: number;
    /** s:int */
    MaxBid?: number;
    /** s:boolean */
    Bold?: boolean;
    /** s:boolean */
    Thumbnail?: boolean;
    /** s:boolean */
    Highlight?: boolean;
    /** s:boolean */
    FeaturedItem?: boolean;
    /** s:string */
    ItemLink?: string;
    /** s:string */
    ThumbnailLink?: string;
    /** s:int */
    AcceptedBuyerId?: number;
    /** s:boolean */
    Paypal?: boolean;
    /** s:int */
    PaymentTypeId?: number;
    /** Seller */
    Seller?: Buyers;
    /** MaxBidder */
    MaxBidder?: Buyers;
    /** s:boolean */
    UserSelectedEndDate?: boolean;
    /** s:int */
    Restarts?: number;
    /** s:int */
    Duration?: number;
    /** s:boolean */
    ReservePriceManuallySet?: boolean;
}
