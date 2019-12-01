import { Visibility } from '@material-ui/icons';
import MaterialTable from 'material-table';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Profile } from '../../generated/graphql';
import { tableIcons } from '../invoices/icons';
import { clientName } from '../utils/client';

interface Props extends RouteComponentProps {
  profiles: Profile[];
}

export const ProfileTable = withRouter((props: Props) => {
  const { profiles, history } = props;
  return (
    <MaterialTable
      title="Profiles"
      icons={tableIcons}
      columns={[
        {
          title: 'Profile name',
          render: rowData => clientName(rowData),
          customFilterAndSearch: (filter, rowData) =>
            clientName(rowData).includes(filter),
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
          tooltip: 'ViewProfile',
          onClick: (_, rowData) =>
            history.push(`/profiles/${(rowData as Profile).id}`),
        },
      ]}
      data={profiles}
    ></MaterialTable>
  );
});
