import { ShopItemData1 } from "./ShopItemData1";

/**
 * updateData
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface UpdateData1 {
    /** s:int */
    ItemId?: number;
    /** ItemData */
    ItemData?: ShopItemData1;
}
