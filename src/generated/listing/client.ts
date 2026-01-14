import { Client as SoapClient, createClientAsync as soapCreateClientAsync, IExOptions as ISoapExOptions } from "soap";
import { GetItemRestarts } from "./definitions/GetItemRestarts";
import { GetItemRestartsResponse } from "./definitions/GetItemRestartsResponse";
import { ListingService } from "./services/ListingService";

export interface ListingClient extends SoapClient {
    ListingService: ListingService;
    GetItemRestartsAsync(getItemRestarts: GetItemRestarts, options?: ISoapExOptions): Promise<[result: GetItemRestartsResponse, rawResponse: any, soapHeader: any, rawRequest: any]>;
}

/** Create ListingClient */
export function createClientAsync(...args: Parameters<typeof soapCreateClientAsync>): Promise<ListingClient> {
    return soapCreateClientAsync(args[0], args[1], args[2]) as any;
}
