import { Registration } from './registration';
import { Dependant } from "./dependant";
import { Benificiary } from './benificiary';

export interface Member {
    id: number;
    empNo: string;
    name: string;
    address: string;
    email: string;
    contactNo: string;
    civilStatus: string;
    nic: string;
    sex: string;
    dob: Date;
    designation: string;
    department: string;
    password: string;
    mDate: Date;
    status: string;
    role: string;
    deleted: boolean;
    registrations: Registration[];
    dependants: Dependant[];
    beneficiaries: Benificiary[];
}

export const Member_Column_Accept = [
    {
      key: 'isSelected',
      type: 'boolean',
      label: '',
    },
    {
      key: 'id',
      type: 'text',
      label: 'ID',
    },
    {
      key: 'empNo',
      type: 'number',
      label: 'Employee No',
    },
    {
      key: 'name',
      type: 'text',
      label: 'Employee Name',
    },
    {
      key: 'mDate',
      type: 'date',
      label: 'Reg Date',
    },
    {
      key: 'status',
      type: 'text',
      label: 'Status',
    }
  ];