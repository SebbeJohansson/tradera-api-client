import { Product } from "./Product";

/**
 * Products
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface Products {
    /** Product[] */
    Product?: Array<Product>;
}
