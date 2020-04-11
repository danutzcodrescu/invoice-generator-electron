import { Delete, Edit } from '@material-ui/icons';
import MaterialTable from 'material-table';
import * as React from 'react';
import { VatRule } from '../../generated/graphql';
import { tableIcons } from '../invoices/icons';
import { useDeleteItem } from '../toolbox/delete.hook';
import { DeleteModal } from '../toolbox/DeleteModal.component';

interface Props {
  vats: VatRule[];
  openEdit: React.Dispatch<VatRule | undefined>;
  deleteVat: Function;
}

export function VatTable(props: Props) {
  const { vats, openEdit, deleteVat } = props;
  const { obj, setObj, close } = useDeleteItem();
  return (
    <>
      <MaterialTable
        title="Vat rules"
        icons={tableIcons}
        columns={[
          {
            title: 'Rule name',
            field: 'name',
          },
          { title: 'Percentage', field: 'percentage' },
        ]}
        options={{
          actionsColumnIndex: 3,
          pageSize: 20,
        }}
        actions={[
          {
            // eslint-disable-next-line react/display-name
            icon: () => <Edit />,
            tooltip: 'Edit VAT rule',
            onClick: (_, rowData) => openEdit(rowData as VatRule),
          },
          {
            // eslint-disable-next-line react/display-name
            icon: () => <Delete />,
            tooltip: 'Delete VAT rule',
            onClick: (_, rowData) =>
              setObj({
                id: (rowData as VatRule).id,
                name:
                  (rowData as VatRule).name ??
                  `${(rowData as VatRule).percentage}%`,
              }),
          },
        ]}
        data={vats}
      ></MaterialTable>
      <DeleteModal
        isOpen={Boolean(obj)}
        obj={obj}
        onPrimary={(id: string) =>
          deleteVat({
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
