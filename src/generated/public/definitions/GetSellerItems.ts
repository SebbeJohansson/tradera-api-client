
/** GetSellerItems */
export interface GetSellerItems {
    /** s:int */
    userId?: number;
    /** s:int */
    categoryId?: number;
    /** ActiveFilter|s:string|All,Active,Inactive */
    filterActive?: string;
    /** s:dateTime */
    minEndDate?: Date;
    /** s:dateTime */
    maxEndDate?: Date;
    /** ItemTypeFilter|s:string|All,Auction,PureBuyItNow,ShopItem */
    filterItemType?: string;
}
