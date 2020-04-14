/* eslint-disable react/display-name */
import {
  Create,
  Delete,
  Visibility,
  CheckCircleOutline,
  Close,
  AccountBalance,
} from '@material-ui/icons';
import { format } from 'date-fns';
import MaterialTable from 'material-table';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Invoice } from '../../generated/graphql';
import { useDeleteItem } from '../toolbox/delete.hook';
import { DeleteModal } from '../toolbox/DeleteModal.component';
import { renderClientName } from '../utils/client';
import { openInvoice } from '../utils/invoices';
import { filterClientName, filterInvoiceDate } from './helpers';
import { tableIcons } from './icons';

interface Props {
  data: Invoice[];
  title?: string;
  isLoading: boolean;
  clientTable: boolean;
  deleteInvoice: Function;
  toggleStatus: Function;
}

export const InvoiceTable = (props: Props) => {
  const {
    data,
    title,
    isLoading,
    clientTable,
    deleteInvoice,
    toggleStatus,
  } = props;
  const { obj, setObj, close } = useDeleteItem();
  const { push } = useHistory();
  return (
    <>
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
            title: 'Due date',
            field: 'paymentDeadline',
            type: 'date',
            render: (rowData) =>
              format(new Date(rowData.paymentDeadline), 'yyyy-MM-dd'),
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
          {
            title: 'Paid',
            field: 'paid',
            type: 'boolean',
            render: (rowData) =>
              rowData.paid ? <CheckCircleOutline /> : <Close />,
          },
        ]}
        data={data}
        options={{
          toolbar: !clientTable,
          pageSize: !clientTable ? 20 : 10,
          actionsColumnIndex: 7,
        }}
        actions={[
          {
            // eslint-disable-next-line react/display-name
            icon: () => <Visibility />,
            tooltip: 'View invoice',
            onClick: openInvoice,
          },
          {
            // eslint-disable-next-line react/display-name
            icon: () => <AccountBalance />,
            tooltip: 'Toggle invoice status',
            onClick: (_, rowData) =>
              toggleStatus({
                variables: {
                  id: (rowData as Invoice).id,
                  status: !(rowData as Invoice).paid,
                },
              }),
          },
          {
            // eslint-disable-next-line react/display-name
            icon: () => <Create />,
            tooltip: 'Edit invoice',
            onClick: (_, rowData) =>
              push(`/invoices/${(rowData as Invoice).id}`),
          },
          {
            // eslint-disable-next-line react/display-name
            icon: () => <Delete />,
            tooltip: 'Delete invoice',
            onClick: (_, rowData) =>
              setObj({
                id: (rowData as Invoice).id,
                name: `invoice number ${(rowData as Invoice).invoiceNumber}`,
              }),
          },
        ]}
      ></MaterialTable>
      <DeleteModal
        isOpen={Boolean(obj)}
        obj={obj}
        onPrimary={(id: string) =>
          deleteInvoice({
            variables: {
              id,
            },
          })
        }
        close={close}
      ></DeleteModal>
    </>
  );
};

InvoiceTable.defaultProps = {
  clientTable: false,
};
