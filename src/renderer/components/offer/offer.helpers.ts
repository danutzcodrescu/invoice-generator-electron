import { ARRAY_ERROR } from 'final-form';
import { Query } from '../../generated/graphql';
import { calculateNet, calculateVat } from '../invoices/helpers';

export function submitOffer(
  values: any,
  selectedClient: React.MutableRefObject<string | undefined>,
  selectedProfile: React.MutableRefObject<string | undefined>,
  data: Query,
  createOffer: any,
) {
  console.log(values);
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
    variables: { object: { ...profile, ...client, ...offerData } },
  });
}
