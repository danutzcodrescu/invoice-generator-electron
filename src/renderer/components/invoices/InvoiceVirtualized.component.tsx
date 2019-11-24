import { MenuItem, Paper, TextField } from '@material-ui/core';
import { isAfter, subMonths, subWeeks } from 'date-fns';
import * as React from 'react';
import { VirtualizedTable } from '../utils/VirtualizedTable.component';
import { InvoiceParsed } from './InvoiceTable.component';

// eslint-disable-next-line @typescript-eslint/no-use-before-define
interface Props {
  invoices: InvoiceParsed[];
}

export const InvoiceVirtualized = (props: Props) => {
  const [invoices, filterInvoices] = React.useState(props.invoices);
  function filter(event: React.ChangeEvent<HTMLInputElement>) {
    const filters: any = {
      all: () => filterInvoices(props.invoices),
      '3months': () =>
        filterInvoices(
          props.invoices.filter(invoice =>
            isAfter(new Date(invoice.invoiceDate), subMonths(new Date(), 3)),
          ),
        ),
      week: () =>
        filterInvoices(
          props.invoices.filter(invoice =>
            isAfter(new Date(invoice.invoiceDate), subWeeks(new Date(), 1)),
          ),
        ),
      '1months': () =>
        filterInvoices(
          props.invoices.filter(invoice =>
            isAfter(new Date(invoice.invoiceDate), subMonths(new Date(), 1)),
          ),
        ),
      '6months': () =>
        filterInvoices(
          props.invoices.filter(invoice =>
            isAfter(new Date(invoice.invoiceDate), subMonths(new Date(), 6)),
          ),
        ),
    };
    filters[event.target.value]();
  }

  return (
    <>
      <TextField
        select
        label="Period"
        defaultValue="all"
        onChange={filter}
        margin="normal"
      >
        {[
          { label: 'all', value: 'all' },
          { label: 'last 3 months', value: '3months' },
          { label: 'last week', value: 'week' },
          { label: 'last month', value: '1months' },
          { label: 'last 6 months', value: '6months' },
        ].map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <Paper style={{ height: 400, width: '80%' }}>
        <VirtualizedTable
          columns={[
            { label: 'Invoice number', dataKey: 'invoiceNumber' },
            { label: 'Invoice date', dataKey: 'invoiceDate', type: 'date' },
            {
              label: 'Client',
              dataKey: 'clientData',
              customValue: cellData =>
                cellData.clientData.company
                  ? cellData.clientData.company
                  : `${cellData.clientData.firstName} ${cellData.clientData.lastName}`,
            },
            { label: 'Amount (€)', dataKey: 'amount', type: 'currency' },
            { label: 'VAT (€)', dataKey: 'vat', type: 'currency' },
            {
              label: '',
              dataKey: 'amount',
              // eslint-disable-next-line react/display-name
              customValue: cellData => <p>test</p>,
            },
          ]}
          data={invoices}
        />
      </Paper>
    </>
  );
};
