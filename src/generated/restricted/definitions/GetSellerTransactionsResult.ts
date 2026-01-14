import { Transaction } from "./Transaction";

/**
 * GetSellerTransactionsResult
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface GetSellerTransactionsResult {
    /** Transaction[] */
    Transaction?: Array<Transaction>;
}
