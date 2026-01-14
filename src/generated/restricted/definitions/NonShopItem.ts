import { ReservedPrice } from "./ReservedPrice";
import { BinPrice } from "./BinPrice";

/**
 * NonShopItem
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface NonShopItem {
    /** s:int */
    Id?: number;
    /** s:int */
    OpeningPrice?: number;
    /** ReservedPrice */
    ReservedPrice?: ReservedPrice;
    /** BinPrice */
    BinPrice?: BinPrice;
}
