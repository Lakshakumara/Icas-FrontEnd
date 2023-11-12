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

    claimCount:number,
}

export const UserColumns = [
    {
      key: 'id',
      type: 'number',
      label: 'ID',
    },
    {
      key: 'category',
      type: 'text',
      label: 'Category',
      required: true,
    },
    {
      key: 'requestFor',
      type: 'text',
      label: 'Request',
    },
    {
      key: 'startDate',
      type: 'string',
      label: 'Date',
      required: true,
    },
    {
      key: 'birthDate',
      type: 'date',
      label: 'Date of Birth',
    },
    {
      key: 'isEdit',
      type: 'isEdit',
      label: '',
    },
  ];