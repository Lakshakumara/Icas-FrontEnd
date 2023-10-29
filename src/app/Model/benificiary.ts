export interface Benificiary {
    id: number;
    name: string;
    nic: string;
    relationship: string;
    percent: number;
}
export const BenificiaryColumns = [
    {
        key: 'id',
        type: 'number',
        label: 'ID',
        required: false,
    },
    {
        key: 'name',
        type: 'text',
        label: 'Name',
        required: true,
    },
    {
        key: 'nic',
        type: 'string',
        label: 'NIC',
        required: false,
    },
    {
        key: 'relationship',
        type: 'string',
        label: 'Relationship',
    },
    {
        key: 'percent',
        type: 'number',
        label: 'Percent',
    },
];