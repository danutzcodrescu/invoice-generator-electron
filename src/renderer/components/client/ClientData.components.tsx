import { Typography } from '@material-ui/core';
import { ApolloQueryResult } from 'apollo-client';
import * as React from 'react';
import { Client, Offer, Query } from '../../generated/graphql';
import { refetchData } from '../../utils/refetchData';
import { ExpenseTable } from '../expenses/ExpenseTable.component';
import { InvoiceTable } from '../invoices/InvoiceTable.component';
import { OffersTable } from '../offer/OfferTable.component';
import { SelectDates } from '../toolbox/SelectDates.component';
import { defaultDate } from '../utils/client';
import { Editable } from './Editable.component';
import { ReadOnly } from './ReadOnly.component';

interface Props {
  client: Client;
  isLoading: boolean;
  refetch: (
    variables?: Record<string, any> | undefined,
  ) => Promise<ApolloQueryResult<Query>>;
  invoiceOffer: (event: any, data: Offer | Offer[]) => void;
}

export function ClientData(props: Props) {
  const { client, isLoading, refetch, invoiceOffer } = props;
  const [isReadOnly, setReadOnly] = React.useState<boolean>(true);
  return (
    <>
      {isReadOnly ? (
        <ReadOnly
          client={client}
          setEditable={() => setReadOnly(false)}
        ></ReadOnly>
      ) : (
        <Editable client={client} setReadOnly={() => setReadOnly(true)} />
      )}
      <div>
        <SelectDates
          defaultValue={defaultDate}
          onChange={refetchData(refetch)}
        />
      </div>

      <Typography variant="h2">Invoices</Typography>
      <InvoiceTable data={client.invoices} isLoading={isLoading} clientTable />
      <Typography variant="h2">Expenses</Typography>
      <ExpenseTable expenses={client.expenses} clientTable />
      <Typography variant="h2">Offers</Typography>
      <OffersTable
        data={client.offers}
        clientTable
        isLoading={isLoading}
        invoiceOffer={invoiceOffer}
      />
    </>
  );
}
