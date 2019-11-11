import { Paper, Typography } from '@material-ui/core';
import * as React from 'react';
import { Client } from '../../generated/graphql';
import { InvoiceTable } from '../invoices/InvoiceTable.component';
import { Editable } from './Editable.component';
import { ReadOnly } from './ReadOnly.component';

interface Props {
  client: Client;
}

export function ClientData(props: Props) {
  const { client } = props;
  const [isReadOnly, setReadOnly] = React.useState<boolean>(true);
  const invoices = client.invoices.map(invoice => {
    return { ...invoice, clientData: JSON.parse(invoice.clientData) };
  });
  return (
    <Paper>
      {isReadOnly ? (
        <ReadOnly
          client={client}
          setEditable={() => setReadOnly(false)}
        ></ReadOnly>
      ) : (
        <Editable client={client} setReadOnly={() => setReadOnly(true)} />
      )}

      <Typography variant="h2">Invoices</Typography>
      <InvoiceTable data={invoices} />
    </Paper>
  );
}
