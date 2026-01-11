import { Search } from "../definitions/Search";
import { SearchResponse } from "../definitions/SearchResponse";
import { SearchAdvanced } from "../definitions/SearchAdvanced";
import { SearchAdvancedResponse } from "../definitions/SearchAdvancedResponse";
import { SearchCategoryCount } from "../definitions/SearchCategoryCount";
import { SearchCategoryCountResponse } from "../definitions/SearchCategoryCountResponse";
import { SearchByFixedCriteria } from "../definitions/SearchByFixedCriteria";
import { SearchByFixedCriteriaResponse } from "../definitions/SearchByFixedCriteriaResponse";
import { SearchByZipCode } from "../definitions/SearchByZipCode";
import { SearchByZipCodeResponse } from "../definitions/SearchByZipCodeResponse";

export interface SearchServiceSoap {
    Search(search: Search, callback: (err: any, result: SearchResponse, rawResponse: any, soapHeader: any, rawRequest: any) => void): void;
    SearchAdvanced(searchAdvanced: SearchAdvanced, callback: (err: any, result: SearchAdvancedResponse, rawResponse: any, soapHeader: any, rawRequest: any) => void): void;
    SearchCategoryCount(searchCategoryCount: SearchCategoryCount, callback: (err: any, result: SearchCategoryCountResponse, rawResponse: any, soapHeader: any, rawRequest: any) => void): void;
    SearchByFixedCriteria(searchByFixedCriteria: SearchByFixedCriteria, callback: (err: any, result: SearchByFixedCriteriaResponse, rawResponse: any, soapHeader: any, rawRequest: any) => void): void;
    SearchByZipCode(searchByZipCode: SearchByZipCode, callback: (err: any, result: SearchByZipCodeResponse, rawResponse: any, soapHeader: any, rawRequest: any) => void): void;
}
