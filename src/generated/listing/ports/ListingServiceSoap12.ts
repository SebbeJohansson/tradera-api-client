import { GetItemRestarts } from "../definitions/GetItemRestarts";
import { GetItemRestartsResponse } from "../definitions/GetItemRestartsResponse";

export interface ListingServiceSoap12 {
    GetItemRestarts(getItemRestarts: GetItemRestarts, callback: (err: any, result: GetItemRestartsResponse, rawResponse: any, soapHeader: any, rawRequest: any) => void): void;
}
