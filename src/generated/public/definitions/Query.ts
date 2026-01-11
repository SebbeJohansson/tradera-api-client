
/**
 * query
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface Query {
    /** s:string */
    SearchWords?: string;
    /** s:int */
    CategoryId?: number;
    /** s:boolean */
    SearchInDescription?: boolean;
    /** SearchMode|s:string|AllWords,AnyWords */
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
    ZipCode?: string;
    /** s:int */
    CountyId?: number;
    /** s:string */
    Alias?: string;
    /** SearchOrderBy|s:string|EndDateAscending,EndDateDescending,PriceAscending,PriceDescending,BidsDescending */
    OrderBy?: string;
    /** SearchItemStatus|s:string|Active,Ended */
    ItemStatus?: string;
    /** SearchItemType|s:string|All,Auction,FixedPrice */
    ItemType?: string;
    /** s:boolean */
    OnlyAuctionsWithBuyNow?: boolean;
    /** s:boolean */
    OnlyItemsWithThumbnail?: boolean;
    /** s:int */
    ItemsPerPage?: number;
    /** s:int */
    PageNumber?: number;
    /** SearchItemConditon|s:string|All,OnlyNew,OnlySecondHand */
    ItemConditon?: string;
    /** SearchSellerType|s:string|All,OnlyPrivate,OnlyBusiness */
    SellerType?: string;
}
