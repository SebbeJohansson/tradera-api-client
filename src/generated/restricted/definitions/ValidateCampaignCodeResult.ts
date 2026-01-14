
/**
 * ValidateCampaignCodeResult
 * @targetNSAlias `tns`
 * @targetNamespace `http://api.tradera.com`
 */
export interface ValidateCampaignCodeResult {
    /** s:boolean */
    IsValid?: boolean;
    /** s:boolean */
    IsInvalidBecauseDoesNotExist?: boolean;
    /** s:boolean */
    IsInvalidBecauseHasNotStarted?: boolean;
    /** s:boolean */
    IsInvalidBecauseHasEnded?: boolean;
    /** s:boolean */
    IsInvalidBecauseCategoryIsNotAllowed?: boolean;
    /** s:boolean */
    IsInvalidBecauseAlreadyUsed?: boolean;
    /** s:boolean */
    IsInvalidBecauseUserIsNotAllowed?: boolean;
    /** s:string */
    Description?: string;
    /** s:decimal */
    DiscountFactor?: number;
    /** s:decimal */
    ProvisionFactor?: number;
    /** s:decimal */
    MaxFeeCap?: number;
    /** s:boolean */
    IsCustomLengthFeeFree?: boolean;
    /** s:boolean */
    IsUnsoldFeeFree?: boolean;
}
