import { SetActivateDateShopItem } from "./SetActivateDateShopItem";

/**
 * SetActivateDateOnShopItemsError
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface SetActivateDateOnShopItemsError {
    /** Item */
    Item?: SetActivateDateShopItem;
    /** s:string */
    ErrorMessage?: string;
}
