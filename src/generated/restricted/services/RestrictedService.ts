import { RestrictedServiceSoap } from "../ports/RestrictedServiceSoap";
import { RestrictedServiceSoap12 } from "../ports/RestrictedServiceSoap12";

export interface RestrictedService {
    readonly RestrictedServiceSoap: RestrictedServiceSoap;
    readonly RestrictedServiceSoap12: RestrictedServiceSoap12;
}
