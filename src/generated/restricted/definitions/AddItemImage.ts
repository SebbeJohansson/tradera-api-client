
/** AddItemImage */
export interface AddItemImage {
    /** s:int */
    requestId?: number;
    /** s:base64Binary */
    imageData?: string;
    /** ImageFormat|s:string|Gif,Jpeg,Png */
    imageFormat?: string;
    /** s:boolean */
    hasMega?: boolean;
}
