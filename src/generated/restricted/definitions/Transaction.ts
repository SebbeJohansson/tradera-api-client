import { Buyers } from "./Buyers";
import { Item } from "./Item";

/**
 * Transaction
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface Transaction {
    /** s:int */
    Id?: number;
    /** s:dateTime */
    Date?: Date;
    /** s:int */
    Amount?: number;
    /** s:dateTime */
    LastUpdatedDate?: Date;
    /** s:boolean */
    IsMarkedAsPaidConfirmed?: boolean;
    /** s:boolean */
    IsMarkedAsShipped?: boolean;
    /** s:boolean */
    IsShippingBooked?: boolean;
    /** s:boolean */
    IsFeedbackLeftBySeller?: boolean;
    /** s:boolean */
    IsFeedbackLeftByBuyer?: boolean;
    /** Buyer */
    Buyer?: Buyers;
    /** Item */
    Item?: Item;
}
