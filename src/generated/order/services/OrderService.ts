import { OrderServiceSoap } from "../ports/OrderServiceSoap";
import { OrderServiceSoap12 } from "../ports/OrderServiceSoap12";

export interface OrderService {
    readonly OrderServiceSoap: OrderServiceSoap;
    readonly OrderServiceSoap12: OrderServiceSoap12;
}
