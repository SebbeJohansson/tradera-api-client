import { ResultCode } from "./ResultCode";

/**
 * RequestResult
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface RequestResult {
    /** s:int */
    RequestId?: number;
    /** ResultCode */
    ResultCode?: ResultCode;
    /** s:string */
    Message?: string;
}
