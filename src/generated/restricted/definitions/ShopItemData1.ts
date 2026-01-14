import { ShippingOptions1 } from "./ShippingOptions1";
import { PaymentOptions } from "./PaymentOptions";
import { ImageLinks } from "./ImageLinks";
import { ItemImages } from "./ItemImages";
import { VariantData } from "./VariantData";
import { AttributeValues1 } from "./AttributeValues1";

/**
 * shopItemData
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface ShopItemData1 {
    /** s:string */
    Title?: string;
    /** s:string */
    Description?: string;
    /** s:int */
    CategoryId?: number;
    /** s:int */
    AcceptedBuyerId?: number;
    /** ShippingOptions */
    ShippingOptions?: ShippingOptions1;
    /** PaymentOptionIds */
    PaymentOptionIds?: PaymentOptions;
    /** ItemAttributes */
    ItemAttributes?: PaymentOptions;
    /** s:string */
    ShippingCondition?: string;
    /** s:string */
    PaymentCondition?: string;
    /** OwnReferences */
    OwnReferences?: ImageLinks;
    /** s:int */
    VAT?: number;
    /** ItemImages */
    ItemImages?: ItemImages;
    /** s:dateTime */
    ActivateDate?: Date;
    /** s:dateTime */
    DeactivateDate?: Date;
    /** s:int */
    Quantity?: number;
    /** s:int */
    AbsoluteQuantity?: number;
    /** s:int */
    ExternalId?: number;
    /** s:int */
    Price?: number;
    /** s:string */
    SellerPartNo?: string;
    /** VariantData */
    VariantData?: VariantData;
    /** AttributeValues */
    AttributeValues?: AttributeValues1;
    /** s:string */
    DescriptionLanguageCodeIso2?: string;
}
