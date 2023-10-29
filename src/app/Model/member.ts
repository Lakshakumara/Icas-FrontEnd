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