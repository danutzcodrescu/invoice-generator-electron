/* eslint-disable react/display-name */
import { Receipt, Visibility } from '@material-ui/icons';
import { format } from 'date-fns';
import MaterialTable from 'material-table';
import * as React from 'react';
import { Offer } from '../../generated/graphql';
import { filterClientName, filterInvoiceDate } from '../invoices/helpers';
import { tableIcons } from '../invoices/icons';
import { renderClientName } from '../utils/client';
import { openInvoice } from '../utils/invoices';

interface Props {
  data: Offer[];
  title?: string;
  isLoading: boolean;
  clientTable: boolean;
  invoiceOffer: (event: any, data: Offer | Offer[]) => void;
}

export function OffersTable(props: Props) {
  const { data, title, isLoading, clientTable, invoiceOffer } = props;
  return (
    <MaterialTable
      isLoading={isLoading}
      title={title ? title : ''}
      icons={tableIcons}
      localization={{
        body: {
          emptyDataSourceMessage: 'No offers to display',
        },
      }}
      columns={[
        {
          title: 'Offer date',
          field: 'invoiceDate',
          type: 'date',
          render: (rowData) =>
            format(new Date(rowData.invoiceDate), 'yyyy-MM-dd'),
          customFilterAndSearch: filterInvoiceDate,
        },
        !clientTable
          ? ({
              title: 'Customer',
              field: 'clientData',
              render: renderClientName,
              customFilterAndSearch: filterClientName,
            } as any)
          : {},
        {
          title: 'Validity',
          field: 'validUntil',
          type: 'date',
          render: (rowData) =>
            format(new Date(rowData.validUntil), 'yyyy-MM-dd'),
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
          tooltip: 'View offer',
          onClick: openInvoice,
        },
        {
          icon: () => <Receipt />,
          tooltip: 'Turn into invoice',
          onClick: invoiceOffer,
        },
      ]}
    ></MaterialTable>
  );
}

OffersTable.defaultProps = {
  clientTable: false,
};
