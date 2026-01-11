import { EstimatedDeliveryTime } from "./EstimatedDeliveryTime";
import { Insurance } from "./Insurance";

/**
 * DeliveryInformation
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface DeliveryInformation {
    /** s:boolean */
    MailBoxWithServicePointBackup?: boolean;
    /** s:boolean */
    ServicePoint?: boolean;
    /** s:boolean */
    CanChangeServicePoint?: boolean;
    /** s:boolean */
    IsTraceable?: boolean;
    /** s:boolean */
    IsParcelBoxDeliveryPossible?: boolean;
    /** EstimatedDeliveryTime */
    EstimatedDeliveryTime?: EstimatedDeliveryTime;
    /** Insurance */
    Insurance?: Insurance;
}
