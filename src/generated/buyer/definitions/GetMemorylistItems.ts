
/** GetMemorylistItems */
export interface GetMemorylistItems {
    /** ActiveFilter|s:string|All,Active,Inactive */
    filterActive?: string;
    /** s:dateTime */
    minEndDate?: Date;
    /** s:dateTime */
    maxEndDate?: Date;
}
