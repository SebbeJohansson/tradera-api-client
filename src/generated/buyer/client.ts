import { Client as SoapClient, createClientAsync as soapCreateClientAsync, IExOptions as ISoapExOptions } from "soap";
import { Buy } from "./definitions/Buy";
import { BuyResponse } from "./definitions/BuyResponse";
import { GetMemorylistItems } from "./definitions/GetMemorylistItems";
import { GetMemorylistItemsResponse } from "./definitions/GetMemorylistItemsResponse";
import { AddToMemorylist } from "./definitions/AddToMemorylist";
import { AddToMemorylistResponse } from "./definitions/AddToMemorylistResponse";
import { RemoveFromMemorylist } from "./definitions/RemoveFromMemorylist";
import { RemoveFromMemorylistResponse } from "./definitions/RemoveFromMemorylistResponse";
import { GetBuyerTransactions } from "./definitions/GetBuyerTransactions";
import { GetBuyerTransactionsResponse } from "./definitions/GetBuyerTransactionsResponse";
import { GetBiddingInfo } from "./definitions/GetBiddingInfo";
import { GetBiddingInfoResponse } from "./definitions/GetBiddingInfoResponse";
import { GetSellerInfo } from "./definitions/GetSellerInfo";
import { GetSellerInfoResponse } from "./definitions/GetSellerInfoResponse";
import { MarkTransactionsPaid } from "./definitions/MarkTransactionsPaid";
import { MarkTransactionsPaidResponse } from "./definitions/MarkTransactionsPaidResponse";
import { SendQuestionToSeller } from "./definitions/SendQuestionToSeller";
import { SendQuestionToSellerResponse } from "./definitions/SendQuestionToSellerResponse";
import { BuyerService } from "./services/BuyerService";

export interface BuyerClient extends SoapClient {
    BuyerService: BuyerService;
    BuyAsync(buy: Buy, options?: ISoapExOptions): Promise<[result: BuyResponse, rawResponse: any, soapHeader: any, rawRequest: any]>;
    GetMemorylistItemsAsync(getMemorylistItems: GetMemorylistItems, options?: ISoapExOptions): Promise<[result: GetMemorylistItemsResponse, rawResponse: any, soapHeader: any, rawRequest: any]>;
    AddToMemorylistAsync(addToMemorylist: AddToMemorylist, options?: ISoapExOptions): Promise<[result: AddToMemorylistResponse, rawResponse: any, soapHeader: any, rawRequest: any]>;
    RemoveFromMemorylistAsync(removeFromMemorylist: RemoveFromMemorylist, options?: ISoapExOptions): Promise<[result: RemoveFromMemorylistResponse, rawResponse: any, soapHeader: any, rawRequest: any]>;
    GetBuyerTransactionsAsync(getBuyerTransactions: GetBuyerTransactions, options?: ISoapExOptions): Promise<[result: GetBuyerTransactionsResponse, rawResponse: any, soapHeader: any, rawRequest: any]>;
    GetBiddingInfoAsync(getBiddingInfo: GetBiddingInfo, options?: ISoapExOptions): Promise<[result: GetBiddingInfoResponse, rawResponse: any, soapHeader: any, rawRequest: any]>;
    GetSellerInfoAsync(getSellerInfo: GetSellerInfo, options?: ISoapExOptions): Promise<[result: GetSellerInfoResponse, rawResponse: any, soapHeader: any, rawRequest: any]>;
    MarkTransactionsPaidAsync(markTransactionsPaid: MarkTransactionsPaid, options?: ISoapExOptions): Promise<[result: MarkTransactionsPaidResponse, rawResponse: any, soapHeader: any, rawRequest: any]>;
    SendQuestionToSellerAsync(sendQuestionToSeller: SendQuestionToSeller, options?: ISoapExOptions): Promise<[result: SendQuestionToSellerResponse, rawResponse: any, soapHeader: any, rawRequest: any]>;
}

/** Create BuyerClient */
export function createClientAsync(...args: Parameters<typeof soapCreateClientAsync>): Promise<BuyerClient> {
    return soapCreateClientAsync(args[0], args[1], args[2]) as any;
}
