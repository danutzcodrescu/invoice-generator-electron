import {
  format,
  isAfter,
  isBefore,
  subDays,
  subMonths,
  subWeeks,
  subYears,
} from 'date-fns';
import { ARRAY_ERROR } from 'final-form';
import { Column } from 'material-table';
import { Expense, Invoice, Offer, Query } from '../../generated/graphql';

interface Items {
  name: string;
  value: string;
  measurement: string;
  quantity: string;
}
export function calculateNet(items: Items[]) {
  return (
    items.reduce(
      (acc, val) => acc + parseFloat(val.value) * parseInt(val.quantity),
      0,
    ) || 0
  );
}

export function calculateVat(items: Items[], vat: number, discount: string) {
  let total = items.reduce(
    (acc, val) => acc + parseFloat(val.value) * parseInt(val.quantity),
    0,
  );
  if (discount) {
    total *= (100 - parseFloat(discount)) / 100;
  }
  return ((total * vat) / 100).toFixed(2) || 0;
}

export function calculateTotal(items: Items[], vat: number, discount: string) {
  let total = items.reduce(
    (acc, val) => acc + parseFloat(val.value) * parseInt(val.quantity),
    0,
  );
  if (discount) {
    total *= (100 - parseFloat(discount)) / 100;
  }
  total *= (100 + vat) / 100;
  return total.toFixed(2) || 0;
}

export function filterClientName(
  filter: any,
  rowData: Invoice | Offer,
  columnDef: Column<Invoice | Offer>,
): boolean {
  return rowData.clientData.company
    ? rowData.clientData.company.includes(filter)
    : `${rowData.clientData.firstName} ${rowData.clientData.lastName}`.includes(
        filter,
      );
}

export function filterInvoiceDate(
  filter: any,
  rowData: Invoice | Expense | Offer,
) {
  if (format(new Date(rowData.invoiceDate), 'yyyy-MM-dd').includes(filter)) {
    return true;
  }
  const dateRegex = new RegExp(
    /^(>|<)\s{0,}?(20[0-9][0-9]-[0-1][0-9]-[0-3][0-9])$/,
    'i',
  );
  const filterMatched = filter.match(dateRegex);
  if (filterMatched) {
    if (filterMatched[1] === '>') {
      return isAfter(new Date(rowData.invoiceDate), new Date(filterMatched[2]));
    } else {
      return isBefore(
        new Date(rowData.invoiceDate),
        new Date(filterMatched[2]),
      );
    }
  }
  const semanticRegex = new RegExp(
    /^last (\d{1,})\s{0,}(days?|months?|years?|weeks?)$/,
    'i',
  );
  const isSemanticMatched = filter.match(semanticRegex);
  if (isSemanticMatched) {
    let result: Date;
    if (isSemanticMatched[2].toLowerCase().startsWith('day')) {
      result = subDays(new Date(), isSemanticMatched[1]);
    } else if (isSemanticMatched[2].toLowerCase().startsWith('month')) {
      result = subMonths(new Date(), isSemanticMatched[1]);
    } else if (isSemanticMatched[2].toLowerCase().startsWith('week')) {
      result = subWeeks(new Date(), isSemanticMatched[1]);
    } else {
      result = subYears(new Date(), isSemanticMatched[1]);
    }
    return isAfter(new Date(rowData.invoiceDate), result);
  }
  return false;
}

export function checkForErrors(errors: any, values: any) {
  if (!values.invoiceDate) {
    errors[ARRAY_ERROR].push('Invoice date is required');
  }
  if (!values.paymentDeadline) {
    errors[ARRAY_ERROR].push('Due date is required');
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

  if (!values.invoiceNumber) {
    errors[ARRAY_ERROR].push('Please add an invoice number');
  }
  return errors;
}

export function submitForm(
  values: any,
  selectedClient: React.MutableRefObject<string | undefined>,
  selectedProfile: React.MutableRefObject<string | undefined>,
  data: Query,
  createInvoice: any,
) {
  const errors = { [ARRAY_ERROR]: [] as string[] };

  if (checkForErrors(errors, values)[ARRAY_ERROR].length) {
    return errors;
  }
  const vat = data.vatRules.find((rule) => rule.id === (values as any).vat);
  const invoiceData = {
    invoiceDate: values.invoiceDate,
    items: JSON.stringify(values.items),
    vat: parseFloat(
      calculateVat(values.items, vat!.percentage, values.discount).toString(),
    ),
    vatRuleName: vat?.name ?? vat?.percentage,
    amount: parseFloat(calculateNet(values.items).toString()),
    invoiceNumber: values.invoiceNumber,
    paymentDeadline: values.paymentDeadline,
    discount: values.discount
      ? (calculateNet((values as any).items) * parseFloat(values.discount)) /
        100
      : 0,
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
    variables: { profileData: profile, clientData: client, invoiceData },
  });
}
