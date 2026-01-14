import { NonShopItem } from "./NonShopItem";

/**
 * SetPricesOnNonShopItemsError
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface SetPricesOnNonShopItemsError {
    /** Item */
    Item?: NonShopItem;
    /** s:string */
    ErrorMessage?: string;
}
