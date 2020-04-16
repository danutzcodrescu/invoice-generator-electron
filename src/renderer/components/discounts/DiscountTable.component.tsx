import { useDeleteItem } from '../toolbox/delete.hook';
import { Delete, Edit } from '@material-ui/icons';
import MaterialTable from 'material-table';
import * as React from 'react';
import { tableIcons } from '../invoices/icons';
import { Discount } from '../../generated/graphql';
import { DeleteModal } from '../toolbox/DeleteModal.component';

interface Props {
  discounts: Discount[];
  openEdit: React.Dispatch<Discount | undefined>;
  deleteDiscount: Function;
}

export function DiscountTable(props: Props) {
  const { discounts, openEdit, deleteDiscount } = props;
  const { obj, setObj, close } = useDeleteItem();
  return (
    <>
      <MaterialTable
        title="Discounts"
        icons={tableIcons}
        columns={[
          {
            title: 'Discount name',
            field: 'name',
          },
          { title: '%', field: 'percentage', type: 'numeric' },
        ]}
        options={{
          actionsColumnIndex: 3,
          pageSize: 20,
        }}
        actions={[
          {
            // eslint-disable-next-line react/display-name
            icon: () => <Edit />,
            tooltip: 'Edit discount',
            onClick: (_, rowData) => openEdit(rowData as Discount),
          },
          {
            // eslint-disable-next-line react/display-name
            icon: () => <Delete />,
            tooltip: 'Delete discount',
            onClick: (_, rowData) =>
              setObj({
                id: (rowData as Discount).id,
                name: (rowData as Discount).name,
              }),
          },
        ]}
        data={discounts}
      ></MaterialTable>
      <DeleteModal
        isOpen={Boolean(obj)}
        obj={obj}
        onPrimary={(id: string) =>
          deleteDiscount({
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
