import { AdditionalInfo } from "./AdditionalInfo";

/**
 * SellerOrderPayment
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface SellerOrderPayment {
    /** s:string */
    PaymentType?: string;
    /** s:string */
    Reference?: string;
    /** AdditionalInfo */
    AdditionalInfo?: AdditionalInfo;
    /** s:int */
    Amount?: number;
    /** s:dateTime */
    PaidDate?: Date;
    /** s:int */
    PaymentCost?: number;
}
