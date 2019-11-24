import { TableCell } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { format } from 'date-fns/esm';
import * as React from 'react';
import {
  AutoSizer,
  Column,
  Table,
  TableCellDataGetterParams,
  TableCellProps,
  TableHeaderProps,
} from 'react-virtualized';

// eslint-disable-next-line @typescript-eslint/no-use-before-define
interface Props<T> {
  columns: {
    label: string;
    dataKey: Extract<keyof T, string>;
    type?: 'currency' | 'date';
    customValue?: (data: T) => string | React.ReactElement;
  }[];
  data: T[];
}

const useStyles = makeStyles({
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  tableRow: {
    cursor: 'pointer',
  },
  tableCell: {
    flex: 1,
  },
});

export const VirtualizedTable = <T extends object>(props: Props<T>) => {
  const { data, columns } = props;
  const classes = useStyles();
  const cellRenderer = ({
    cellData,
    columnType,
  }: TableCellProps & { columnType?: 'currency' | 'date' }) => {
    let value;
    if (columnType === 'currency') {
      value = `${cellData.toLocaleString('nl-BE', {
        minimumFractionDigits: 2,
      })}`;
    } else if (columnType === 'date') {
      value = format(new Date(cellData), 'yyyy-MM-dd');
    } else {
      value = cellData;
    }
    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer)}
        variant="body"
        style={{ height: 50 }}
        align={columnType === 'currency' ? 'right' : 'left'}
      >
        {value}
      </TableCell>
    );
  };

  const headerRenderer = (
    header: TableHeaderProps & {
      columnIndex: number;
      columnType?: 'currency';
    },
  ) => {
    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer)}
        variant="head"
        style={{ height: 50 }}
        align={header.columnType === 'currency' ? 'right' : 'left'}
      >
        <span>{header.label}</span>
      </TableCell>
    );
  };
  return (
    <AutoSizer>
      {({ height, width }) => (
        <Table
          width={width}
          height={height}
          headerHeight={50}
          rowHeight={50}
          rowCount={data.length}
          rowGetter={({ index }) => data[index]}
          rowClassName={clsx(classes.tableRow, classes.flexContainer)}
        >
          {columns.map((item, index, array) => {
            const other = Object.assign(
              { label: item.label, dataKey: item.dataKey },
              item.customValue
                ? {
                    cellDataGetter: (cellData: TableCellDataGetterParams) => {
                      return item.customValue!(cellData.rowData);
                    },
                  }
                : null,
            );
            return (
              <Column
                key={item.dataKey}
                headerRenderer={(headerProps: TableHeaderProps) =>
                  headerRenderer({
                    ...headerProps,
                    columnIndex: index,
                    columnType: item.type as any,
                  })
                }
                className={classes.flexContainer}
                cellRenderer={(cellProps: TableCellProps) =>
                  cellRenderer({
                    ...cellProps,
                    columnType: item.type as any,
                  })
                }
                width={width / array.length}
                {...other}
              />
            );
          })}
        </Table>
      )}
    </AutoSizer>
  );
};
