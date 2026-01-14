import { ShopItemData } from "./ShopItemData";

/**
 * updateData
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface UpdateData {
    /** s:int */
    ItemId?: number;
    /** ItemData */
    ItemData?: ShopItemData;
}
