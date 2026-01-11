import { LastMonth } from "./LastMonth";

/**
 * GetFeedbackSummaryResult
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface GetFeedbackSummaryResult {
    /** s:int */
    UserId?: number;
    /** LastMonth */
    LastMonth?: LastMonth;
    /** LastSixMonth */
    LastSixMonth?: LastMonth;
    /** LastTwelveMonth */
    LastTwelveMonth?: LastMonth;
}
