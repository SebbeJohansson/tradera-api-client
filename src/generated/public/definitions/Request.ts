
/**
 * request
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface Request {
    /** ItemTypeFilter|s:string|All,Auction,PureBuyItNow,ShopItem */
    FilterItemType?: string;
    /** s:int */
    UserId?: number;
    /** s:int */
    CategoryId?: number;
    /** ActiveFilter|s:string|All,Active,Inactive */
    FilterActive?: string;
    /** s:dateTime */
    MinEndDate?: Date;
    /** s:dateTime */
    MaxEndDate?: Date;
    /** s:dateTime */
    MinCreatedDate?: Date;
    /** s:dateTime */
    MaxCreatedDate?: Date;
}
