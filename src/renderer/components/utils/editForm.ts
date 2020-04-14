import { ARRAY_ERROR } from 'final-form';
import { omit } from 'lodash';
import { Expense, Query, VatRule } from '../../generated/graphql';
import {
  calculateNet,
  calculateVat,
  checkForErrors,
} from '../invoices/helpers';

export const submitForm = (id: string) => (
  values: any,
  selectedClient: React.MutableRefObject<string | undefined>,
  selectedProfile: React.MutableRefObject<string | undefined>,
  data: Query,
  createInvoice: any,
) => {
  const errors = { [ARRAY_ERROR]: [] as string[] };

  if (checkForErrors(errors, values)[ARRAY_ERROR].length) {
    return errors;
  }
  const vat = data.vatRules.find((rule) => rule.id === (values as any).vat);
  const invoiceData = {
    invoiceDate: values.invoiceDate,
    items: JSON.stringify(
      values.items.map((val: any) => omit(val, ['__typename'])),
    ),
    vat: parseFloat(calculateVat(values.items, vat!.percentage).toString()),
    vatRuleName: vat?.name ?? vat?.percentage,
    amount: parseFloat(calculateNet(values.items).toString()),
    invoiceNumber: values.invoiceNumber,
    paymentDeadline: values.paymentDeadline,
  };
  const client = {
    clientId: selectedClient.current,
    clientData: JSON.stringify({
      firstName: values.clientFirstName,
      lastName: values.clientLastName,
      company: values.clientCompany,
      address: values.clientAddress,
      vat: values.clientVat,
    }),
  };
  const profile = {
    profileId: selectedProfile.current,
    profileData: JSON.stringify({
      firstName: values.profileFirstName,
      lastName: values.profileLastName,
      company: values.profileCompany,
      address: values.profileAddress,
      vat: values.profileVat,
      phone: values.profilePhone,
      email: values.profileEmail,
      bankAccount: values.profileBankAccount,
    }),
  };
  createInvoice({
    variables: { data: { id, ...profile, ...client, ...invoiceData } },
  });
};

export function setInitialValues(
  initialData: any,
  type: 'Invoice' | 'Offer',
  vat?: VatRule,
) {
  return {
    invoiceDate: new Date(initialData.invoiceDate),
    items: initialData.items,
    profile: initialData.profile,
    profileFirstName: initialData.profileData.firstName,
    profileLastName: initialData.profileData.lastName,
    profileCompany: initialData.profileData.company,
    profileEmail: initialData.profileData.email,
    profilePhone: initialData.profileData.phone,
    profileAddress: initialData.profileData.address,
    profileVat: initialData.profileData.vat,
    profileBankAccount: initialData.profileData.bankAccount,
    client: initialData.client,
    clientFirstName: initialData.clientData.firstName,
    clientLastName: initialData.clientData.lastName,
    clientCompany: initialData.clientData.company,
    clientAddress: initialData.clientData.address,
    vat: vat?.id,
    clientVat: initialData.clientData.vat,
    ...(type === 'Invoice'
      ? {
          invoiceNumber: initialData.invoiceNumber,
          paymentDeadline: new Date(initialData.paymentDeadline),
        }
      : { validUntil: new Date(initialData.validUntil) }),
  };
}

export const submitFormOffer = (id: string) => (
  values: any,
  selectedClient: React.MutableRefObject<string | undefined>,
  selectedProfile: React.MutableRefObject<string | undefined>,
  data: Query,
  createOffer: any,
) => {
  const errors = { [ARRAY_ERROR]: [] as string[] };
  if (!values.invoiceDate) {
    errors[ARRAY_ERROR].push('Invoice date is required');
  }
  if (!values.vat) {
    errors[ARRAY_ERROR].push('Vat value is required');
  }

  if (
    (!values.clientLastName || !values.clientFirstName) &&
    !values.clientCompany
  ) {
    errors[ARRAY_ERROR].push(
      'Please provide a fullname or a company name for the client',
    );
  }
  if (!values.clientAddress) {
    errors[ARRAY_ERROR].push('Please provide an address for the client');
  }
  if (
    (!values.profileLastName || !values.profileFirstName) &&
    !values.profileCompany
  ) {
    errors[ARRAY_ERROR].push(
      'Please provide a fullname or a company name for your profile',
    );
  }
  if (!values.profileVat) {
    errors[ARRAY_ERROR].push('Please add a VAT number for your profile');
  }

  if (!values.validUntil) {
    errors[ARRAY_ERROR].push('Please add a validity date');
  }

  if (errors[ARRAY_ERROR].length) {
    return errors;
  }
  const vat = data.vatRules.find((rule) => rule.id === (values as any).vat);
  const offerData = {
    invoiceDate: values.invoiceDate,
    items: JSON.stringify(values.items),
    vat: parseFloat(calculateVat(values.items, vat!.percentage).toString()),
    vatRuleName: vat?.name ?? vat?.percentage,
    amount: parseFloat(calculateNet(values.items).toString()),
    validUntil: values.validUntil,
  };
  const client = {
    clientId: selectedClient.current,
    clientData: JSON.stringify({
      firstName: values.clientFirstName,
      lastName: values.clientLastName,
      company: values.clientCompany,
      address: values.clientAddress,
      vat: values.clientVat,
    }),
  };
  const profile = {
    profileId: selectedProfile.current,
    profileData: JSON.stringify({
      firstName: values.profileFirstName,
      lastName: values.profileLastName,
      company: values.profileCompany,
      address: values.profileAddress,
      vat: values.profileVat,
      phone: values.profilePhone,
      email: values.profileEmail,
      bankAccount: values.profileBankAccount,
    }),
  };
  createOffer({
    variables: { data: { id, ...profile, ...client, ...offerData } },
  });
};

export function setInitialValuesExpense(initialData: Expense) {
  return {
    invoiceDate: new Date(initialData.invoiceDate),
    clientName: initialData.clientName,
    amount: initialData.amount,
    vat: initialData.vat,
    invoiceNumber: initialData.invoiceNumber,
    description: initialData.description,
    id: initialData.id,
    client: initialData.client,
  };
}
