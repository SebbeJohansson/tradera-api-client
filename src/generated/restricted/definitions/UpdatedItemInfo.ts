
/**
 * UpdatedItemInfo
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface UpdatedItemInfo {
    /** s:int */
    Id?: number;
    /** s:long */
    RowVersion?: number;
    /** ItemType|s:string|Auction,PureBuyItNow,ShopItem */
    ItemType?: string;
}
