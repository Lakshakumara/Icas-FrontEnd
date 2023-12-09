import { ClaimData } from "./claimData";
import { Member } from "./member";

export interface Claim {
    id: number,
    member:Member,
    memberId: number,
    empNo: string,
    name: string,
    claimData: ClaimData,
    category: string,
    requestFor: string,
    startDate: Date,
    endDate: Date,
    claimDate: Date,
    requestAmount: number,
    deductionAmount: number,
    paidAmount: number,
    place: string,
    nature: string,
    incident: string,
    claimStatus: string,
    acceptedDate: Date,
    mecSendDate: Date,
    mecReturnDate: Date,
    rejectedDate: Date,
    financeSeendDate: Date,
    completedDate: Date,
    mecRemarks: string,
    rejectRemarks: string,
    remarks: string,
    appeal: boolean,
    appealRefId: number,
    appealRemarks: string,
}
export const MEC_Column_Accept = [
    {
      key: 'id',
      type: 'number',
      label: 'ID',
    },
    {
      key: 'empNo',
      type: 'text',
      label: 'Emp NO',
    },
    {
        key: 'name',
        type: 'text',
        label: 'Name',
      },
    {
      key: 'requestFor',
      type: 'text',
      label: 'Request',
    }
  ];