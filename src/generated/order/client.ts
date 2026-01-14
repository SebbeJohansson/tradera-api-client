import { Client as SoapClient, createClientAsync as soapCreateClientAsync, IExOptions as ISoapExOptions } from "soap";
import { GetSellerOrders } from "./definitions/GetSellerOrders";
import { GetSellerOrdersResponse } from "./definitions/GetSellerOrdersResponse";
import { SetSellerOrderAsShipped } from "./definitions/SetSellerOrderAsShipped";
import { SetSellerOrderAsShippedResponse } from "./definitions/SetSellerOrderAsShippedResponse";
import { SetSellerOrderAsPaid } from "./definitions/SetSellerOrderAsPaid";
import { SetSellerOrderAsPaidResponse } from "./definitions/SetSellerOrderAsPaidResponse";
import { GetOrders } from "./definitions/GetOrders";
import { GetOrdersResponse } from "./definitions/GetOrdersResponse";
import { GetFreightLabels } from "./definitions/GetFreightLabels";
import { GetFreightLabelsResponse } from "./definitions/GetFreightLabelsResponse";
import { OrderService } from "./services/OrderService";

export interface OrderClient extends SoapClient {
    OrderService: OrderService;
    GetSellerOrdersAsync(getSellerOrders: GetSellerOrders, options?: ISoapExOptions): Promise<[result: GetSellerOrdersResponse, rawResponse: any, soapHeader: any, rawRequest: any]>;
    SetSellerOrderAsShippedAsync(setSellerOrderAsShipped: SetSellerOrderAsShipped, options?: ISoapExOptions): Promise<[result: SetSellerOrderAsShippedResponse, rawResponse: any, soapHeader: any, rawRequest: any]>;
    SetSellerOrderAsPaidAsync(setSellerOrderAsPaid: SetSellerOrderAsPaid, options?: ISoapExOptions): Promise<[result: SetSellerOrderAsPaidResponse, rawResponse: any, soapHeader: any, rawRequest: any]>;
    GetOrdersAsync(getOrders: GetOrders, options?: ISoapExOptions): Promise<[result: GetOrdersResponse, rawResponse: any, soapHeader: any, rawRequest: any]>;
    GetFreightLabelsAsync(getFreightLabels: GetFreightLabels, options?: ISoapExOptions): Promise<[result: GetFreightLabelsResponse, rawResponse: any, soapHeader: any, rawRequest: any]>;
}

/** Create OrderClient */
export function createClientAsync(...args: Parameters<typeof soapCreateClientAsync>): Promise<OrderClient> {
    return soapCreateClientAsync(args[0], args[1], args[2]) as any;
}
