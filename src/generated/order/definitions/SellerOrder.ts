import { Seller } from "./Seller";
import { ShipTo } from "./ShipTo";
import { Items } from "./Items";
import { SellerOrderPayments } from "./SellerOrderPayments";

/**
 * SellerOrder
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface SellerOrder {
    /** s:int */
    OrderId?: number;
    /** s:dateTime */
    CreatedDate?: Date;
    /** s:dateTime */
    ExpiresDate?: Date;
    /** s:dateTime */
    LastUpdatedDate?: Date;
    /** s:int */
    SubTotal?: number;
    /** Seller */
    Seller?: Seller;
    /** Buyer */
    Buyer?: Seller;
    /** ShipTo */
    ShipTo?: ShipTo;
    /** Items */
    Items?: Items;
    /** SellerOrderPayments */
    SellerOrderPayments?: SellerOrderPayments;
    /** s:string */
    ShippingType?: string;
    /** s:int */
    ShippingCost?: number;
    /** s:decimal */
    ShippingWeight?: number;
    /** guid|s:string|pattern */
    PurchaseOrderId?: string;
}
