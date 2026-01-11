import { SearchServiceSoap } from "../ports/SearchServiceSoap";
import { SearchServiceSoap12 } from "../ports/SearchServiceSoap12";

export interface SearchService {
    readonly SearchServiceSoap: SearchServiceSoap;
    readonly SearchServiceSoap12: SearchServiceSoap12;
}
