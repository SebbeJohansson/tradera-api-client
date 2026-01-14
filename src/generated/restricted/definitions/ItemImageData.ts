
/**
 * ItemImageData
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface ItemImageData {
    /** s:boolean */
    HasMega?: boolean;
    /** ImageFormat|s:string|Gif,Jpeg,Png */
    Format?: string;
    /** s:base64Binary */
    Data?: string;
    /** s:string */
    Name?: string;
}
