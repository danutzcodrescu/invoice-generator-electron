import { Visibility } from '@material-ui/icons';
import MaterialTable from 'material-table';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Client } from '../../generated/graphql';
import { tableIcons } from '../invoices/icons';

interface Props extends RouteComponentProps {
  clients: Client[];
}

export const ClientTable = withRouter((props: Props) => {
  const { clients, history } = props;
  return (
    <MaterialTable
      title="Clients"
      icons={tableIcons}
      columns={[
        {
          title: 'Client name',
          render: rowData =>
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
      }}
      actions={[
        {
          // eslint-disable-next-line react/display-name
          icon: () => <Visibility />,
          tooltip: 'View Client',
          onClick: (_, rowData) =>
            history.push(`/clients/${(rowData as Client).id}`),
        },
      ]}
      data={clients}
    ></MaterialTable>
  );
});
