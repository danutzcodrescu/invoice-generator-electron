import { Delete, Visibility } from '@material-ui/icons';
import MaterialTable from 'material-table';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Client } from '../../generated/graphql';
import { tableIcons } from '../invoices/icons';
import { useDeleteItem } from '../toolbox/delete.hook';
import { DeleteModal } from '../toolbox/DeleteModal.component';

interface Props {
  clients: Client[];
  deleteClient: Function;
}

export const ClientTable = (props: Props) => {
  const { clients, deleteClient } = props;
  const history = useHistory();
  const { obj, setObj, close } = useDeleteItem();
  return (
    <>
      <MaterialTable
        title="Clients"
        icons={tableIcons}
        columns={[
          {
            title: 'Client name',
            render: (rowData) =>
              rowData.company
                ? rowData.company
                : `${rowData.firstName} ${rowData.lastName}`,
            customFilterAndSearch: (filter, rowData) =>
              rowData.company
                ? rowData.company.includes(filter)
                : `${rowData.firstName} ${rowData.lastName}`.includes(filter),
          },
          { title: 'Address', field: 'address' },
          { title: 'Email', field: 'email' },
          {
            title: 'Vat number',
            field: 'vat',
          },
        ]}
        options={{
          actionsColumnIndex: 4,
          pageSize: 20,
        }}
        actions={[
          {
            // eslint-disable-next-line react/display-name
            icon: () => <Visibility />,
            tooltip: 'View Client',
            onClick: (_, rowData) =>
              history.push(`/clients/${(rowData as Client).id}`),
          },
          {
            // eslint-disable-next-line react/display-name
            icon: () => <Delete />,
            tooltip: 'Delete client',
            onClick: (_, rowData: any) =>
              setObj({
                id: (rowData as Client).id,
                name: rowData.company
                  ? rowData.company
                  : `${rowData.firstName} ${rowData.lastName}`,
              }),
          },
        ]}
        data={clients}
      ></MaterialTable>
      <DeleteModal
        isOpen={Boolean(obj)}
        obj={obj}
        onPrimary={(id: string) =>
          deleteClient({
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
