import { Edit } from '@material-ui/icons';
import MaterialTable from 'material-table';
import * as React from 'react';
import { Service } from '../../generated/graphql';
import { tableIcons } from '../invoices/icons';

interface Props {
  services: Service[];
  openEdit: React.Dispatch<Service | undefined>;
}

export function ServiceTable(props: Props) {
  const { services, openEdit } = props;

  return (
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
      ]}
      data={services}
    ></MaterialTable>
  );
}
