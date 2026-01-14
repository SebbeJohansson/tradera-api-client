import { OwnReferences } from "./OwnReferences";

/**
 * SellerOrderItem
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface SellerOrderItem {
    /** s:int */
    ItemId?: number;
    /** ItemType|s:string|Auction,PureBuyItNow,ShopItem */
    Type?: string;
    /** s:string */
    Title?: string;
    /** s:int */
    Quantity?: number;
    /** s:int */
    UnitPrice?: number;
    /** s:int */
    VatRate?: number;
    /** OwnReferences */
    OwnReferences?: OwnReferences;
    /** s:string */
    MerchantPartNumber?: string;
}
