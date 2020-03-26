/* eslint-disable react/display-name */
import { Visibility } from '@material-ui/icons';
import { format } from 'date-fns/esm';
import MaterialTable from 'material-table';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { CREATE_PDF_EVENT, OPEN_INVOICE } from '../../../main/events';
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

async function openInvoice(_, rowData: Invoice | Invoice[]) {
  if (!process.env.STORYBOOK) {
    const { ipcRenderer } = require('electron');
    const resp = await ipcRenderer.invoke(OPEN_INVOICE, {
      invoiceDate: (rowData as Invoice).invoiceDate,
      invoiceNumber: (rowData as Invoice).invoiceNumber,
    });
    if (!resp) {
      ipcRenderer.send(CREATE_PDF_EVENT, rowData);
    }
  }
}

export const InvoiceTable = (props: Props) => {
  const { data, title, isLoading, clientTable } = props;
  function openItem(_, path: string) {
    if (!process.env.STORYBOOK) {
      const { shell } = require('electron');
      shell.openItem(path);
    }
  }
  React.useEffect(() => {
    if (!process.env.STORYBOOK) {
      const { ipcRenderer } = require('electron');
      ipcRenderer.on(CREATE_PDF_EVENT, openItem);
    }
    return () => {
      const { ipcRenderer } = require('electron');
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
          emptyDataSourceMessage: 'No invoices to display',
        },
      }}
      columns={[
        { title: 'Invoice number', field: 'invoiceNumber' },
        !clientTable
          ? {
              title: 'Customer',
              field: 'clientData',
              render: renderClientName,
              customFilterAndSearch: filterClientName,
            }
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
