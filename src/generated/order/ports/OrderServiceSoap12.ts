import { GetSellerOrders } from "../definitions/GetSellerOrders";
import { GetSellerOrdersResponse } from "../definitions/GetSellerOrdersResponse";
import { SetSellerOrderAsShipped } from "../definitions/SetSellerOrderAsShipped";
import { SetSellerOrderAsShippedResponse } from "../definitions/SetSellerOrderAsShippedResponse";
import { SetSellerOrderAsPaid } from "../definitions/SetSellerOrderAsPaid";
import { SetSellerOrderAsPaidResponse } from "../definitions/SetSellerOrderAsPaidResponse";
import { GetOrders } from "../definitions/GetOrders";
import { GetOrdersResponse } from "../definitions/GetOrdersResponse";
import { GetFreightLabels } from "../definitions/GetFreightLabels";
import { GetFreightLabelsResponse } from "../definitions/GetFreightLabelsResponse";

export interface OrderServiceSoap12 {
    GetSellerOrders(getSellerOrders: GetSellerOrders, callback: (err: any, result: GetSellerOrdersResponse, rawResponse: any, soapHeader: any, rawRequest: any) => void): void;
    SetSellerOrderAsShipped(setSellerOrderAsShipped: SetSellerOrderAsShipped, callback: (err: any, result: SetSellerOrderAsShippedResponse, rawResponse: any, soapHeader: any, rawRequest: any) => void): void;
    SetSellerOrderAsPaid(setSellerOrderAsPaid: SetSellerOrderAsPaid, callback: (err: any, result: SetSellerOrderAsPaidResponse, rawResponse: any, soapHeader: any, rawRequest: any) => void): void;
    GetOrders(getOrders: GetOrders, callback: (err: any, result: GetOrdersResponse, rawResponse: any, soapHeader: any, rawRequest: any) => void): void;
    GetFreightLabels(getFreightLabels: GetFreightLabels, callback: (err: any, result: GetFreightLabelsResponse, rawResponse: any, soapHeader: any, rawRequest: any) => void): void;
}
