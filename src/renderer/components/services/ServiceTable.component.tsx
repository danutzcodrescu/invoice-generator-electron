import { Delete, Edit } from '@material-ui/icons';
import MaterialTable from 'material-table';
import * as React from 'react';
import { Service } from '../../generated/graphql';
import { tableIcons } from '../invoices/icons';
import { useDeleteItem } from '../toolbox/delete.hook';
import { DeleteModal } from '../toolbox/DeleteModal.component';

interface Props {
  services: Service[];
  openEdit: React.Dispatch<Service | undefined>;
  deleteService: Function;
}

export function ServiceTable(props: Props) {
  const { services, openEdit, deleteService } = props;
  const { obj, setObj, close } = useDeleteItem();
  return (
    <>
      <MaterialTable
        title="Services/items"
        icons={tableIcons}
        columns={[
          {
            title: 'Service name',
            field: 'name',
          },
          { title: 'Unit', field: 'measurement' },
          { title: 'Unit price', field: 'cost' },
        ]}
        options={{
          actionsColumnIndex: 4,
          pageSize: 20,
        }}
        actions={[
          {
            // eslint-disable-next-line react/display-name
            icon: () => <Edit />,
            tooltip: 'Edit service/item',
            onClick: (_, rowData) => openEdit(rowData as Service),
          },
          {
            // eslint-disable-next-line react/display-name
            icon: () => <Delete />,
            tooltip: 'Delete service',
            onClick: (_, rowData) =>
              setObj({
                id: (rowData as Service).id,
                name: (rowData as Service).name,
              }),
          },
        ]}
        data={services}
      ></MaterialTable>
      <DeleteModal
        isOpen={Boolean(obj)}
        obj={obj}
        onPrimary={(id: string) =>
          deleteService({
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
