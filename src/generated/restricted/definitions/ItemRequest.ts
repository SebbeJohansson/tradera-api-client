import { ImageLinks } from "./ImageLinks";
import { PaymentOptions } from "./PaymentOptions";
import { ShippingOptions1 } from "./ShippingOptions1";
import { AttributeValues1 } from "./AttributeValues1";

/**
 * itemRequest
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface ItemRequest {
    /** s:string */
    Title?: string;
    /** OwnReferences */
    OwnReferences?: ImageLinks;
    /** s:int */
    CategoryId?: number;
    /** s:int */
    Duration?: number;
    /** s:int */
    Restarts?: number;
    /** s:int */
    StartPrice?: number;
    /** s:int */
    ReservePrice?: number;
    /** s:int */
    BuyItNowPrice?: number;
    /** s:string */
    Description?: string;
    /** PaymentOptionIds */
    PaymentOptionIds?: PaymentOptions;
    /** ShippingOptions */
    ShippingOptions?: ShippingOptions1;
    /** s:int */
    AcceptedBidderId?: number;
    /** ExpoItemIds */
    ExpoItemIds?: PaymentOptions;
    /** s:dateTime */
    CustomEndDate?: Date;
    /** ItemAttributes */
    ItemAttributes?: PaymentOptions;
    /** s:int */
    ItemType?: number;
    /** s:boolean */
    AutoCommit?: boolean;
    /** s:int */
    VAT?: number;
    /** s:string */
    ShippingCondition?: string;
    /** s:string */
    PaymentCondition?: string;
    /** s:string */
    CampaignCode?: string;
    /** s:string */
    DescriptionLanguageCodeIso2?: string;
    /** AttributeValues */
    AttributeValues?: AttributeValues1;
    /** s:int */
    RestartedFromItemId?: number;
}
