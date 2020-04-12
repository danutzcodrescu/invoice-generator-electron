import { Create, Delete } from '@material-ui/icons';
import { format } from 'date-fns';
import MaterialTable from 'material-table';
import * as React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Expense } from '../../generated/graphql';
import { filterInvoiceDate } from '../invoices/helpers';
import { tableIcons } from '../invoices/icons';
import { useDeleteItem } from '../toolbox/delete.hook';
import { DeleteModal } from '../toolbox/DeleteModal.component';

interface Props {
  expenses: Expense[];
  clientTable: boolean;
  deleteExpense: Function;
}

export function ExpenseTable(props: Props) {
  const { expenses, clientTable, deleteExpense } = props;
  const { obj, setObj, close } = useDeleteItem();
  const history = useHistory();
  return (
    <>
      <MaterialTable
        title="Expenses"
        icons={tableIcons}
        localization={{
          body: {
            emptyDataSourceMessage: 'No expenses to display',
          },
        }}
        columns={[
          { title: 'Invoice number', field: 'invoiceNumber' },
          {
            title: 'Invoice date',
            field: 'invoiceDate',
            render: (rowData) =>
              format(new Date(rowData.invoiceDate), 'yyyy-MM-dd'),
            customFilterAndSearch: filterInvoiceDate,
          },
          !clientTable
            ? {
                title: 'Client',
                field: 'clientName',
                // eslint-disable-next-line react/display-name
                render: (rowData) =>
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
          { title: 'Description', field: 'description' },
        ]}
        data={expenses}
        options={{
          toolbar: !clientTable,
          pageSize: !clientTable ? 20 : 10,
          actionsColumnIndex: 6,
        }}
        actions={[
          {
            // eslint-disable-next-line react/display-name
            icon: () => <Create />,
            tooltip: 'Edit expense',
            onClick: (_, rowData) =>
              history.push(`/expenses/${(rowData as Expense).id}`),
          },

          {
            // eslint-disable-next-line react/display-name
            icon: () => <Delete />,
            tooltip: 'Delete expense',
            onClick: (_, rowData) =>
              setObj({
                id: (rowData as Expense).id,
                name: `expense number ${(rowData as Expense).invoiceNumber}`,
              }),
          },
        ]}
      ></MaterialTable>
      <DeleteModal
        isOpen={Boolean(obj)}
        obj={obj}
        onPrimary={(id: string) =>
          deleteExpense({
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

ExpenseTable.defaultProps = {
  clientTable: false,
};
