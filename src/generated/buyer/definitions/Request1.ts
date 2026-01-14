
/**
 * request
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface Request1 {
    /** s:dateTime */
    MinDate?: Date;
    /** s:dateTime */
    MaxDate?: Date;
    /** ActiveFilter|s:string|All,Active,Inactive */
    FilterActive?: string;
    /** s:boolean */
    IncludeHidden?: boolean;
    /** LeadingFilter|s:string|All,OnlyLeading,OnlyNotLeading */
    FilterLeading?: string;
}
