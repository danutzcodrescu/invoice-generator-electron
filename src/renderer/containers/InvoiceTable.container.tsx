import { useQuery } from '@apollo/react-hooks';
import * as React from 'react';
import { InvoiceParsed } from '../components/invoices/InvoiceTable.component';
import { InvoiceVirtualized } from '../components/invoices/InvoiceVirtualized.component';
import { Query } from '../generated/graphql';
import { GET_INVOICES } from '../graphql/queries';

export function InvoiceTableContainer() {
  const { data, loading, error } = useQuery<Query>(GET_INVOICES);
  if (loading || !data) {
    return <h1>loading</h1>;
  }
  let invoices: InvoiceParsed[];
  if (data) {
    invoices = data.invoices.map(elem => {
      return {
        ...elem,
        clientData: JSON.parse(elem.clientData),
      };
    });
  }
  return <InvoiceVirtualized invoices={invoices!} />;
}
