import { SetPriceShopItem } from "./SetPriceShopItem";

/**
 * SetPriceOnShopItemsError
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface SetPriceOnShopItemsError {
    /** Item */
    Item?: SetPriceShopItem;
    /** s:string */
    ErrorMessage?: string;
}
