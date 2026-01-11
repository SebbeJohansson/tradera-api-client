
/**
 * ItemQuickInfo
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface ItemQuickInfo {
    /** s:dateTime */
    CreationDate?: Date;
    /** ItemType|s:string|Auction,PureBuyItNow,ShopItem */
    ItemType?: string;
    /** s:int */
    Id?: number;
}
