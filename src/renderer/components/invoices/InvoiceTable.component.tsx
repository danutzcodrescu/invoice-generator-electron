/* eslint-disable react/display-name */
import { format } from 'date-fns/esm';
import MaterialTable from 'material-table';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Invoice } from '../../generated/graphql';
import { filterClientName, filterInvoiceDate } from './helpers';
import { tableIcons } from './icons';

interface Props {
  data: Invoice[];
  title?: string;
  isLoading: boolean;
  clientTable: boolean;
}

function renderClientName(rowData: Invoice) {
  const name = rowData.clientData.company
    ? rowData.clientData.company
    : `${rowData.clientData.firstName} ${rowData.clientData.lastName}`;
  if (rowData.client) {
    return <Link to={`/clients/${rowData.client.id}`}>{name}</Link>;
  }
  return name;
}

export const InvoiceTable = (props: Props) => {
  const { data, title, isLoading, clientTable } = props;
  return (
    <MaterialTable
      isLoading={isLoading}
      title={title ? title : ''}
      icons={tableIcons}
      localization={{
        body: {
          emptyDataSourceMessage: 'No invoices to display',
        },
      }}
      columns={[
        { title: 'Invoice number', field: 'invoiceNumber' },
        {
          title: 'Customer',
          field: 'clientData',
          render: renderClientName,
          customFilterAndSearch: filterClientName,
        },
        {
          title: 'Invoice date',
          field: 'invoiceDate',
          type: 'date',
          render: rowData =>
            format(new Date(rowData.invoiceDate), 'yyyy-MM-dd'),
          customFilterAndSearch: filterInvoiceDate,
        },
        {
          title: 'Amount',
          field: 'amount',
          type: 'numeric',
          render: rowData =>
            rowData.amount.toLocaleString('nl-BE', {
              minimumFractionDigits: 2,
            }),
        },
        {
          title: 'VAT',
          field: 'vat',
          type: 'numeric',
          render: rowData =>
            rowData.vat.toLocaleString('nl-BE', { minimumFractionDigits: 2 }),
        },
      ]}
      data={data}
      options={{ toolbar: !clientTable, pageSize: 20 }}
    ></MaterialTable>
  );
};

InvoiceTable.defaultProps = {
  clientTable: false,
};
