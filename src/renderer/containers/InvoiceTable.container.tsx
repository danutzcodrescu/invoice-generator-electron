import { useQuery } from '@apollo/react-hooks';
import * as React from 'react';
import {
  InvoiceParsed,
  InvoiceTable,
} from '../components/invoices/InvoiceTable.component';
import { SelectDates } from '../components/toolbox/SelectDates.component';
import { defaultDate } from '../components/utils/client';
import { Query } from '../generated/graphql';
import { GET_INVOICES } from '../graphql/queries';

export function InvoiceTableContainer() {
  const { data, loading, refetch } = useQuery<Query>(GET_INVOICES, {
    variables: { startDate: defaultDate },
  });
  let invoices: InvoiceParsed[];
  if (data) {
    invoices = data.invoices.map(elem => {
      return {
        ...elem,
        clientData: JSON.parse(elem.clientData),
      };
    });
  }
  return (
    <>
      <SelectDates
        onChange={e => refetch({ startDate: e.target.value })}
        defaultValue={defaultDate}
      />
      <InvoiceTable data={invoices!} isLoading={loading || !data} />
    </>
  );
}
