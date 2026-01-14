import { ListingServiceSoap } from "../ports/ListingServiceSoap";
import { ListingServiceSoap12 } from "../ports/ListingServiceSoap12";

export interface ListingService {
    readonly ListingServiceSoap: ListingServiceSoap;
    readonly ListingServiceSoap12: ListingServiceSoap12;
}
