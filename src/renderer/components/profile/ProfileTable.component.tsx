import { Delete, Visibility } from '@material-ui/icons';
import MaterialTable from 'material-table';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Profile } from '../../generated/graphql';
import { tableIcons } from '../invoices/icons';
import { useDeleteItem } from '../toolbox/delete.hook';
import { DeleteModal } from '../toolbox/DeleteModal.component';
import { clientName } from '../utils/client';

interface Props {
  profiles: Profile[];
  deleteProfile: Function;
}

export const ProfileTable = (props: Props) => {
  const { profiles, deleteProfile } = props;
  const history = useHistory();
  const { obj, setObj, close } = useDeleteItem();
  return (
    <>
      <MaterialTable
        title="Profiles"
        icons={tableIcons}
        columns={[
          {
            title: 'Profile name',
            render: (rowData) => clientName(rowData),
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
          pageSize: 20,
        }}
        actions={[
          {
            // eslint-disable-next-line react/display-name
            icon: () => <Visibility />,
            tooltip: 'View profile',
            onClick: (_, rowData) =>
              history.push(`/profiles/${(rowData as Profile).id}`),
          },
          {
            // eslint-disable-next-line react/display-name
            icon: () => <Delete />,
            tooltip: 'Delete profile',
            onClick: (_, rowData) =>
              setObj({
                id: (rowData as Profile).id,
                name: clientName(rowData as Profile),
              }),
          },
        ]}
        data={profiles}
      ></MaterialTable>
      <DeleteModal
        isOpen={Boolean(obj)}
        obj={obj}
        onPrimary={(id: string) =>
          deleteProfile({
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
