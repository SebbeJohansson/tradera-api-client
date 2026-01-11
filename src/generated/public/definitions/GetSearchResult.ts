
/** GetSearchResult */
export interface GetSearchResult {
    /** s:string */
    query?: string;
    /** s:int */
    categoryId?: number;
    /** s:int */
    pageNumber?: number;
    /** SearchOrderBy|s:string|EndDateAscending,EndDateDescending,PriceAscending,PriceDescending,BidsDescending */
    orderBy?: string;
}
