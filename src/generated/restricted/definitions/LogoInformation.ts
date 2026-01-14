
/**
 * LogoInformation
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface LogoInformation {
    /** ImageFormat|s:string|Gif,Jpeg,Png */
    ImageFormat?: string;
    /** s:base64Binary */
    ImageData?: string;
    /** s:boolean */
    RemoveLogo?: boolean;
}
