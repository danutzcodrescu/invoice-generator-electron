import {
  format,
  isAfter,
  isBefore,
  subDays,
  subMonths,
  subWeeks,
  subYears,
} from 'date-fns';
import { Column } from 'material-table';
import { Expense } from '../../generated/graphql';
import { InvoiceParsed } from './InvoiceTable.component';

interface Items {
  name: string;
  value: string;
}
export function calculateNet(items: Items[]) {
  return items.reduce((acc, val) => acc + parseFloat(val.value), 0) || 0;
}

export function calculateVat(items: Items[], vat: number) {
  return (
    (
      (items.reduce((acc, val) => acc + parseFloat(val.value), 0) * vat) /
      100
    ).toFixed(2) || 0
  );
}

export function calculateTotal(items: Items[], vat: number) {
  return (
    (
      (items.reduce((acc, val) => acc + parseFloat(val.value), 0) *
        (100 + vat)) /
      100
    ).toFixed(2) || 0
  );
}

export function filterClientName(
  filter: any,
  rowData: InvoiceParsed,
  columnDef: Column<InvoiceParsed>,
): boolean {
  return rowData.clientData.company
    ? rowData.clientData.company.includes(filter)
    : `${rowData.clientData.firstName} ${rowData.clientData.lastName}`.includes(
        filter,
      );
}

export function filterInvoiceDate(
  filter: any,
  rowData: InvoiceParsed | Expense,
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
