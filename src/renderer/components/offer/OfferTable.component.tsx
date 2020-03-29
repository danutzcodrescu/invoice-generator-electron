/* eslint-disable react/display-name */
import { Visibility } from '@material-ui/icons';
import { format } from 'date-fns';
import { ipcRenderer } from 'electron';
import MaterialTable from 'material-table';
import * as React from 'react';
import { CREATE_PDF_EVENT } from '../../../main/events';
import { Offer } from '../../generated/graphql';
import { filterClientName, filterInvoiceDate } from '../invoices/helpers';
import { tableIcons } from '../invoices/icons';
import { renderClientName } from '../utils/client';
import { openInvoice, openItem } from '../utils/invoices';

interface Props {
  data: Offer[];
  title?: string;
  isLoading: boolean;
  clientTable: boolean;
}

export function OffersTable(props: Props) {
  const { data, title, isLoading, clientTable } = props;
  React.useEffect(() => {
    ipcRenderer.on(CREATE_PDF_EVENT, openItem);
    return () => {
      ipcRenderer.off(CREATE_PDF_EVENT, openItem);
    };
  }, []);
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
          title: 'Invoice date',
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
      ]}
    ></MaterialTable>
  );
}

OffersTable.defaultProps = {
  clientTable: false,
};
