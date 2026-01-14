import { Transaction } from "./Transaction";

/**
 * GetBuyerTransactionsResult
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface GetBuyerTransactionsResult {
    /** Transaction[] */
    Transaction?: Array<Transaction>;
}
