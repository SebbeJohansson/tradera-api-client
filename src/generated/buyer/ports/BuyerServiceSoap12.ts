import { Buy } from "../definitions/Buy";
import { BuyResponse } from "../definitions/BuyResponse";
import { GetMemorylistItems } from "../definitions/GetMemorylistItems";
import { GetMemorylistItemsResponse } from "../definitions/GetMemorylistItemsResponse";
import { AddToMemorylist } from "../definitions/AddToMemorylist";
import { AddToMemorylistResponse } from "../definitions/AddToMemorylistResponse";
import { RemoveFromMemorylist } from "../definitions/RemoveFromMemorylist";
import { RemoveFromMemorylistResponse } from "../definitions/RemoveFromMemorylistResponse";
import { GetBuyerTransactions } from "../definitions/GetBuyerTransactions";
import { GetBuyerTransactionsResponse } from "../definitions/GetBuyerTransactionsResponse";
import { GetBiddingInfo } from "../definitions/GetBiddingInfo";
import { GetBiddingInfoResponse } from "../definitions/GetBiddingInfoResponse";
import { GetSellerInfo } from "../definitions/GetSellerInfo";
import { GetSellerInfoResponse } from "../definitions/GetSellerInfoResponse";
import { MarkTransactionsPaid } from "../definitions/MarkTransactionsPaid";
import { MarkTransactionsPaidResponse } from "../definitions/MarkTransactionsPaidResponse";
import { SendQuestionToSeller } from "../definitions/SendQuestionToSeller";
import { SendQuestionToSellerResponse } from "../definitions/SendQuestionToSellerResponse";

export interface BuyerServiceSoap12 {
    Buy(buy: Buy, callback: (err: any, result: BuyResponse, rawResponse: any, soapHeader: any, rawRequest: any) => void): void;
    GetMemorylistItems(getMemorylistItems: GetMemorylistItems, callback: (err: any, result: GetMemorylistItemsResponse, rawResponse: any, soapHeader: any, rawRequest: any) => void): void;
    AddToMemorylist(addToMemorylist: AddToMemorylist, callback: (err: any, result: AddToMemorylistResponse, rawResponse: any, soapHeader: any, rawRequest: any) => void): void;
    RemoveFromMemorylist(removeFromMemorylist: RemoveFromMemorylist, callback: (err: any, result: RemoveFromMemorylistResponse, rawResponse: any, soapHeader: any, rawRequest: any) => void): void;
    GetBuyerTransactions(getBuyerTransactions: GetBuyerTransactions, callback: (err: any, result: GetBuyerTransactionsResponse, rawResponse: any, soapHeader: any, rawRequest: any) => void): void;
    GetBiddingInfo(getBiddingInfo: GetBiddingInfo, callback: (err: any, result: GetBiddingInfoResponse, rawResponse: any, soapHeader: any, rawRequest: any) => void): void;
    GetSellerInfo(getSellerInfo: GetSellerInfo, callback: (err: any, result: GetSellerInfoResponse, rawResponse: any, soapHeader: any, rawRequest: any) => void): void;
    MarkTransactionsPaid(markTransactionsPaid: MarkTransactionsPaid, callback: (err: any, result: MarkTransactionsPaidResponse, rawResponse: any, soapHeader: any, rawRequest: any) => void): void;
    SendQuestionToSeller(sendQuestionToSeller: SendQuestionToSeller, callback: (err: any, result: SendQuestionToSellerResponse, rawResponse: any, soapHeader: any, rawRequest: any) => void): void;
}
