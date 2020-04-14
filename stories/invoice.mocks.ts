export const invoiceWithQuantity = {
  id: '9238d209-8c87-40e8-910a-6f3284d18210',
  invoiceNumber: '56756756765',
  invoiceDate: '2020-03-22',
  clientData: {
    address: 'Rue Calvin 23 Bruxelles 1040',
    firstName: 'Danut',
    lastName: 'Codrescu',
    vat: '',
  },
  items: [
    {
      name: 'Gresie',
      value: 22,
      quantity: 10,
      measurement: 'm2',
    },
    {
      name: 'Parchet',
      value: 44,
      quantity: 11,
      measurement: 'm2',
    },
    {
      name: 'Ceva ceva',
      value: 75,
      quantity: 3,
      measurement: 'ml',
    },
  ],
  profileData: {
    address: 'Rue Calvin 23 Bruxelles 1000',
    firstName: 'Marian',
    lastName: 'Temeian',
    email: 'marian.temeian@icloud.com',
    company: null,
    bankAccount: 'KBC : BE23356789',
    vat: 'BE1234567',
  },
  vat: 39,
  amount: 650,
  vatRuleName: '21%',
  paymentDeadline: '2020-04-29',
};

export const invoiceWithoutQuantity = {
  id: '87fd1ac9-d40d-44e9-ac8a-160253ed1de4',
  invoiceNumber: '434343',
  invoiceDate: '2020-03-22',
  clientData: {
    address: 'Rue Calvin 23 Bruxelles 1040',
    firstName: 'Danut',
    lastName: 'Codrescu',
    vat: '',
  },
  items: [
    {
      name: 'altceva',
      value: 200,
      quantity: 1,
      measurement: null,
    },
    {
      name: 'inca ceva',
      value: 300,
      quantity: 1,
      measurement: '',
    },
    {
      name: 'si inca ceva',
      value: 150,
      quantity: 1,
      measurement: '',
    },
  ],
  vat: 195.09,
  amount: 929,
  profileData: {
    address: 'Rue Calvin 23 Bruxelles 1000',
    firstName: 'Marian',
    lastName: 'Temeian',
    email: 'marian.temeian@icloud.com',
    company: null,
    bankAccount: 'KBC : BE23356789',
    vat: 'BE1234567',
  },
  vatRuleName: '6%',
  paymentDeadline: '2020-04-29',
};

export const offer = {
  id: 'd594ad39-cced-41b1-b44c-66931d9730f4',
  validUntil: '2020-05-10',
  clientData: {
    address: 'Rue Calvin 23 Bruxelles 1040',
    firstName: 'Danut',
    lastName: 'Codrescu',
    company: null,
    vat: '',
  },
  profileData: {
    vat: 'BE1234567',
    address: 'Rue Calvin 23 Bruxelles 1000',
    email: 'marian.temeian@icloud.com',
    phone: '+40744150056',
    company: null,
    firstName: 'Marian',
    lastName: 'Temeian',
  },
  amount: 484,
  vat: 29.04,
  vatRuleName: '6%',
  invoiceDate: '2020-03-29',
  items: [
    {
      name: 'Parchet',
      value: 44,
      quantity: 11,
      measurement: 'm2',
    },
  ],
};
