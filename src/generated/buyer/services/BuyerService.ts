import { BuyerServiceSoap } from "../ports/BuyerServiceSoap";
import { BuyerServiceSoap12 } from "../ports/BuyerServiceSoap12";

export interface BuyerService {
    readonly BuyerServiceSoap: BuyerServiceSoap;
    readonly BuyerServiceSoap12: BuyerServiceSoap12;
}
