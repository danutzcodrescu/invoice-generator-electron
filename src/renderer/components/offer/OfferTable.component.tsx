/* eslint-disable react/display-name */
import { Create, Delete, Receipt, Visibility } from '@material-ui/icons';
import { format } from 'date-fns';
import MaterialTable from 'material-table';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Offer } from '../../generated/graphql';
import { filterClientName, filterInvoiceDate } from '../invoices/helpers';
import { tableIcons } from '../invoices/icons';
import { useDeleteItem } from '../toolbox/delete.hook';
import { DeleteModal } from '../toolbox/DeleteModal.component';
import { renderClientName } from '../utils/client';
import { openInvoice } from '../utils/invoices';

interface Props {
  data: Offer[];
  title?: string;
  isLoading: boolean;
  clientTable: boolean;
  invoiceOffer: (event: any, data: Offer | Offer[]) => void;
  deleteOffer: Function;
}

export function OffersTable(props: Props) {
  const {
    data,
    title,
    isLoading,
    clientTable,
    invoiceOffer,
    deleteOffer,
  } = props;
  const { obj, setObj, close } = useDeleteItem();
  const history = useHistory();
  return (
    <>
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
            title: 'Discount value',
            field: 'discount',
            type: 'numeric',
            render: (rowData) =>
              rowData.discount.toLocaleString('nl-BE', {
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
          actionsColumnIndex: 6,
        }}
        actions={[
          {
            // eslint-disable-next-line react/display-name
            icon: () => <Visibility />,
            tooltip: 'View offer',
            onClick: openInvoice,
          },
          {
            // eslint-disable-next-line react/display-name
            icon: () => <Create />,
            tooltip: 'Edit offer',
            onClick: (_, rowData) =>
              history.push(`/offers/${(rowData as Offer).id}`),
          },
          {
            icon: () => <Receipt />,
            tooltip: 'Turn into invoice',
            onClick: invoiceOffer,
          },
          {
            // eslint-disable-next-line react/display-name
            icon: () => <Delete />,
            tooltip: 'Delete offer',
            onClick: (_, rowData) =>
              setObj({
                id: (rowData as Offer).id,
                name: `offer number ${(rowData as Offer).id}`,
              }),
          },
        ]}
      ></MaterialTable>
      <DeleteModal
        isOpen={Boolean(obj)}
        obj={obj}
        onPrimary={(id: string) =>
          deleteOffer({
            variables: {
              id,
            },
          })
        }
        close={close}
      ></DeleteModal>
    </>
  );
}

OffersTable.defaultProps = {
  clientTable: false,
};
