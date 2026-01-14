import { LogoInformation } from "./LogoInformation";

/**
 * shopSettings
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface ShopSettings {
    /** s:string */
    CompanyInformation?: string;
    /** s:string */
    PurchaseTerms?: string;
    /** s:boolean */
    ShowGalleryMode?: boolean;
    /** s:boolean */
    ShowAuctionView?: boolean;
    /** LogoInformation */
    LogoInformation?: LogoInformation;
    /** s:string */
    BannerColor?: string;
    /** s:boolean */
    IsTemporaryClosed?: boolean;
    /** s:string */
    TemporaryClosedMessage?: string;
    /** s:string */
    ContactInformation?: string;
    /** s:string */
    LogoImageUrl?: string;
    /** s:int */
    MaxActiveItems?: number;
    /** s:int */
    MaxInventoryItems?: number;
}
