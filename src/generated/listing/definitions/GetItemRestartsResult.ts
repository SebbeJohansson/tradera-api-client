import { RestartedItems } from "./RestartedItems";

/**
 * GetItemRestartsResult
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface GetItemRestartsResult {
    /** s:int */
    LastRestartedItemId?: number;
    /** s:int */
    AncestorItemId?: number;
    /** RestartedItems */
    RestartedItems?: RestartedItems;
}
