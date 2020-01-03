import { Edit } from '@material-ui/icons';
import MaterialTable from 'material-table';
import * as React from 'react';
import { VatRule } from '../../generated/graphql';
import { tableIcons } from '../invoices/icons';

interface Props {
  vats: VatRule[];
  openEdit: React.Dispatch<VatRule | undefined>;
}

export function VatTable(props: Props) {
  const { vats, openEdit } = props;

  return (
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
      }}
      actions={[
        {
          // eslint-disable-next-line react/display-name
          icon: () => <Edit />,
          tooltip: 'Edit VAT rule',
          onClick: (_, rowData) => openEdit(rowData as VatRule),
        },
      ]}
      data={vats}
    ></MaterialTable>
  );
}
