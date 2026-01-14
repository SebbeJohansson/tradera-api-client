import { PaymentOptions } from "./PaymentOptions";
import { ShippingOptions1 } from "./ShippingOptions1";
import { ImageLinks } from "./ImageLinks";
import { ItemImages } from "./ItemImages";
import { AttributeValues1 } from "./AttributeValues1";

/**
 * shopItemData
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface ShopItemData {
    /** s:dateTime */
    ActivateDate?: Date;
    /** s:int */
    AcceptedBuyerId?: number;
    /** s:int */
    CategoryId?: number;
    /** s:dateTime */
    DeactivateDate?: Date;
    /** ItemAttributes */
    ItemAttributes?: PaymentOptions;
    /** s:string */
    Description?: string;
    /** s:string */
    PaymentCondition?: string;
    /** s:int */
    Price?: number;
    /** s:int */
    Quantity?: number;
    /** s:int */
    AbsoluteQuantity?: number;
    /** s:string */
    ShippingCondition?: string;
    /** s:string */
    Title?: string;
    /** s:int */
    VAT?: number;
    /** ShippingOptions */
    ShippingOptions?: ShippingOptions1;
    /** PaymentOptionIds */
    PaymentOptionIds?: PaymentOptions;
    /** OwnReferences */
    OwnReferences?: ImageLinks;
    /** ItemImages */
    ItemImages?: ItemImages;
    /** s:int */
    ExternalId?: number;
    /** AttributeValues */
    AttributeValues?: AttributeValues1;
    /** s:string */
    DescriptionLanguageCodeIso2?: string;
}
