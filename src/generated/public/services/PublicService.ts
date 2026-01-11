import { PublicServiceSoap } from "../ports/PublicServiceSoap";
import { PublicServiceSoap12 } from "../ports/PublicServiceSoap12";

export interface PublicService {
    readonly PublicServiceSoap: PublicServiceSoap;
    readonly PublicServiceSoap12: PublicServiceSoap12;
}
