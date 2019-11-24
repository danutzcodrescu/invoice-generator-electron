import { format } from 'date-fns';
import MaterialTable from 'material-table';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Expense } from '../../generated/graphql';
import { filterInvoiceDate } from '../invoices/helpers';
import { tableIcons } from '../invoices/icons';

interface Props {
  expenses: Expense[];
  clientTable: boolean;
}

export function ExpenseTable(props: Props) {
  const { expenses, clientTable } = props;
  return (
    <MaterialTable
      title="Expenses"
      icons={tableIcons}
      options={{
        filtering: true,
      }}
      localization={{
        body: {
          emptyDataSourceMessage: 'No expenses to display',
        },
      }}
      columns={[
        { title: 'Invoice number', field: 'invoiceNumber', filtering: false },
        {
          title: 'Invoice date',
          field: 'invoiceDate',
          render: rowData =>
            format(new Date(rowData.invoiceDate), 'yyyy-MM-dd'),
          customFilterAndSearch: filterInvoiceDate,
          // defaultFilter: 'last 3 months',
          lookup: {
            'last week': 'last week',
            'last 3 months': 'last 3 months',
          },
        },
        !clientTable
          ? {
              title: 'Client',
              field: 'clientName',
              filtering: false,
              // eslint-disable-next-line react/display-name
              render: rowData =>
                rowData.client ? (
                  <Link to={`/clients/${rowData.client.id}`}>
                    {rowData.clientName}
                  </Link>
                ) : (
                  rowData.clientName
                ),
            }
          : {},
        {
          title: 'Amount',
          field: 'amount',
          type: 'numeric',
          filtering: false,
          render: rowData =>
            rowData.amount.toLocaleString('nl-BE', {
              minimumFractionDigits: 2,
            }),
        },
        {
          title: 'VAT',
          field: 'vat',
          filtering: false,
          type: 'numeric',
          render: rowData =>
            rowData.vat.toLocaleString('nl-BE', { minimumFractionDigits: 2 }),
        },
        { title: 'Description', field: 'description', filtering: false },
      ]}
      data={expenses}
    ></MaterialTable>
  );
}

ExpenseTable.defaultProps = {
  clientTable: false,
};
