export interface Scheme {
  isSelected: boolean;
  id: number;
  idText: string;
  title: string;
  description: string,
  amount: number;
  unit: string,
  rate: number,
  isEdit: boolean;
}

export const SchemeColumns = [
  {
    key: 'isSelected',
    type: 'isSelected',
    label: '',
  },
  {
    key: 'idText',
    type: 'text',
    label: 'Cascade ID',
    required: true,
  },
  {
    key: 'title',
    type: 'text',
    label: 'Title',
    required: true,
  },
  {
    key: 'description',
    type: 'text',
    label: 'Description',
    required: true,
  },
  {
    key: 'amount',
    type: 'number',
    label: 'Amount',
  },
  {
    key: 'unit',
    type: 'text',
    label: 'Unit',
  },
  {
    key: 'rate',
    type: 'number',
    label: 'Rate',
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: 'Actions',
  },
];
