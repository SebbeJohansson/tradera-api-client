import { SetQuantityShopItem } from "./SetQuantityShopItem";

/**
 * SetQuantityOnShopItemError
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface SetQuantityOnShopItemError {
    /** Item */
    Item?: SetQuantityShopItem;
    /** s:string */
    ErrorMessage?: string;
}
