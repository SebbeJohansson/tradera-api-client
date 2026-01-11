import { Client as SoapClient, createClientAsync as soapCreateClientAsync, IExOptions as ISoapExOptions } from "soap";
import { Search } from "./definitions/Search";
import { SearchResponse } from "./definitions/SearchResponse";
import { SearchAdvanced } from "./definitions/SearchAdvanced";
import { SearchAdvancedResponse } from "./definitions/SearchAdvancedResponse";
import { SearchCategoryCount } from "./definitions/SearchCategoryCount";
import { SearchCategoryCountResponse } from "./definitions/SearchCategoryCountResponse";
import { SearchByFixedCriteria } from "./definitions/SearchByFixedCriteria";
import { SearchByFixedCriteriaResponse } from "./definitions/SearchByFixedCriteriaResponse";
import { SearchByZipCode } from "./definitions/SearchByZipCode";
import { SearchByZipCodeResponse } from "./definitions/SearchByZipCodeResponse";
import { SearchService } from "./services/SearchService";

export interface SearchClient extends SoapClient {
    SearchService: SearchService;
    SearchAsync(search: Search, options?: ISoapExOptions): Promise<[result: SearchResponse, rawResponse: any, soapHeader: any, rawRequest: any]>;
    SearchAdvancedAsync(searchAdvanced: SearchAdvanced, options?: ISoapExOptions): Promise<[result: SearchAdvancedResponse, rawResponse: any, soapHeader: any, rawRequest: any]>;
    SearchCategoryCountAsync(searchCategoryCount: SearchCategoryCount, options?: ISoapExOptions): Promise<[result: SearchCategoryCountResponse, rawResponse: any, soapHeader: any, rawRequest: any]>;
    SearchByFixedCriteriaAsync(searchByFixedCriteria: SearchByFixedCriteria, options?: ISoapExOptions): Promise<[result: SearchByFixedCriteriaResponse, rawResponse: any, soapHeader: any, rawRequest: any]>;
    SearchByZipCodeAsync(searchByZipCode: SearchByZipCode, options?: ISoapExOptions): Promise<[result: SearchByZipCodeResponse, rawResponse: any, soapHeader: any, rawRequest: any]>;
    SearchAsync(search: Search, options?: ISoapExOptions): Promise<[result: SearchResponse, rawResponse: any, soapHeader: any, rawRequest: any]>;
    SearchAdvancedAsync(searchAdvanced: SearchAdvanced, options?: ISoapExOptions): Promise<[result: SearchAdvancedResponse, rawResponse: any, soapHeader: any, rawRequest: any]>;
    SearchCategoryCountAsync(searchCategoryCount: SearchCategoryCount, options?: ISoapExOptions): Promise<[result: SearchCategoryCountResponse, rawResponse: any, soapHeader: any, rawRequest: any]>;
    SearchByFixedCriteriaAsync(searchByFixedCriteria: SearchByFixedCriteria, options?: ISoapExOptions): Promise<[result: SearchByFixedCriteriaResponse, rawResponse: any, soapHeader: any, rawRequest: any]>;
    SearchByZipCodeAsync(searchByZipCode: SearchByZipCode, options?: ISoapExOptions): Promise<[result: SearchByZipCodeResponse, rawResponse: any, soapHeader: any, rawRequest: any]>;
}

/** Create SearchClient */
export function createClientAsync(...args: Parameters<typeof soapCreateClientAsync>): Promise<SearchClient> {
    return soapCreateClientAsync(args[0], args[1], args[2]) as any;
}
