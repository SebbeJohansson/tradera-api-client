import { Values } from "./Values";
import { CampaignCodeIds } from "./CampaignCodeIds";
import { Attributes } from "./Attributes";

/**
 * request
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface Request {
    /** s:string */
    SearchWords?: string;
    /** s:int */
    CategoryId?: number;
    /** s:boolean */
    SearchInDescription?: boolean;
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
    ZipCode?: string;
    /** s:int */
    CountyId?: number;
    /** s:string */
    Alias?: string;
    /** s:string */
    OrderBy?: string;
    /** s:string */
    ItemStatus?: string;
    /** s:string */
    ItemType?: string;
    /** s:boolean */
    OnlyAuctionsWithBuyNow?: boolean;
    /** s:boolean */
    OnlyItemsWithThumbnail?: boolean;
    /** s:int */
    ItemsPerPage?: number;
    /** s:int */
    PageNumber?: number;
    /** s:string */
    ItemCondition?: string;
    /** s:string */
    SellerType?: string;
    /** Brands */
    Brands?: Values;
    /** CampaignCodeIds */
    CampaignCodeIds?: CampaignCodeIds;
    /** Attributes[] */
    Attributes?: Array<Attributes>;
}
