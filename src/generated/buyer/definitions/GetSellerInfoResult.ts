import { DetailedSellerRating } from "./DetailedSellerRating";

/**
 * GetSellerInfoResult
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface GetSellerInfoResult {
    /** DetailedSellerRating */
    DetailedSellerRating?: DetailedSellerRating;
    /** s:int */
    TotalRating?: number;
    /** s:int */
    PositiveFeedbackPercent?: number;
    /** s:string */
    PersonalMessage?: string;
    /** s:boolean */
    IsCompany?: boolean;
    /** s:boolean */
    HasShop?: boolean;
}
