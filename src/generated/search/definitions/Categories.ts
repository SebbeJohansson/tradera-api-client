
/**
 * Categories
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface Categories {
    /** s:int */
    Id?: number;
    /** s:string */
    Name?: string;
    /** s:int */
    NoOfItemsInCategory?: number;
    /** s:int */
    NoOfItemsInCategoryIncludingChildren?: number;
    /** ChildCategories[] */
    ChildCategories?: Array<Categories>;
}
