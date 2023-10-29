export interface ClaimOPD{
    id:number,
    memberId: number,
    /**
     * OPD or SHE(Surgical &Hospital Expenses)
     */
    category: string,
    /**
     * Outdoor, Spectacles, covid test etc..
     */
    requestFor: string,
    startDate: Date,
    endDate: Date,
    claimDate: Date,
    applyDate: Date;
    acceptedDate: Date,

    requestAmount: number,
    deductionAmount: number,
    paidAmount: number,
    place: string,
    nature: string,
    incident: string,
    claimStatus: string,
}