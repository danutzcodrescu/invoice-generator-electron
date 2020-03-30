/* eslint-disable react/display-name */
import { Visibility } from '@material-ui/icons';
import { format } from 'date-fns';
import MaterialTable from 'material-table';
import * as React from 'react';
import { Invoice } from '../../generated/graphql';
import { renderClientName } from '../utils/client';
import { openInvoice } from '../utils/invoices';
import { filterClientName, filterInvoiceDate } from './helpers';
import { tableIcons } from './icons';

interface Props {
  data: Invoice[];
  title?: string;
  isLoading: boolean;
  clientTable: boolean;
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
        !clientTable
          ? ({
              title: 'Customer',
              field: 'clientData',
              render: renderClientName,
              customFilterAndSearch: filterClientName,
            } as any)
          : {},

        {
          title: 'Invoice date',
          field: 'invoiceDate',
          type: 'date',
          render: (rowData) =>
            format(new Date(rowData.invoiceDate), 'yyyy-MM-dd'),
          customFilterAndSearch: filterInvoiceDate,
        },

        {
          title: 'Amount',
          field: 'amount',
          type: 'numeric',
          render: (rowData) =>
            rowData.amount.toLocaleString('nl-BE', {
              minimumFractionDigits: 2,
            }),
        },
        {
          title: 'VAT',
          field: 'vat',
          type: 'numeric',
          render: (rowData) =>
            rowData.vat.toLocaleString('nl-BE', { minimumFractionDigits: 2 }),
        },
      ]}
      data={data}
      options={{
        toolbar: !clientTable,
        pageSize: !clientTable ? 20 : 10,
        actionsColumnIndex: 5,
      }}
      actions={[
        {
          // eslint-disable-next-line react/display-name
          icon: () => <Visibility />,
          tooltip: 'View invoice',
          onClick: openInvoice,
        },
      ]}
    ></MaterialTable>
  );
};

InvoiceTable.defaultProps = {
  clientTable: false,
};
