import { ImageLinks } from "./ImageLinks";

/**
 * Item
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface Item {
    /** s:int */
    Id?: number;
    /** ItemType|s:string|Auction,PureBuyItNow,ShopItem */
    Type?: string;
    /** s:string */
    Title?: string;
    /** OwnReferences */
    OwnReferences?: ImageLinks;
}
