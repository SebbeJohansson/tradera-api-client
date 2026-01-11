
/**
 * request
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface Request1 {
    /** s:int */
    CategoryId?: number;
    /** s:string */
    Alias?: string;
    /** s:int */
    CountyId?: number;
    /** s:boolean */
    SearchInDescription?: boolean;
    /** s:string */
    ItemCondition?: string;
    /** s:string */
    ZipCode?: string;
    /** s:string */
    SearchWords?: string;
    /** s:int */
    PageNumber?: number;
    /** s:boolean */
    OnlyItemsWithThumbnail?: boolean;
    /** s:boolean */
    OnlyAuctionsWithBuyNow?: boolean;
    /** s:string */
    Mode?: string;
    /** s:int */
    PriceMinimum?: number;
    /** s:int */
    PriceMaximum?: number;
    /** s:int */
    BidsMinimum?: number;
    /** s:int */
    BidsMaximum?: number;
    /** s:string */
    ItemStatus?: string;
    /** s:string */
    ItemType?: string;
    /** s:string */
    SellerType?: string;
}
