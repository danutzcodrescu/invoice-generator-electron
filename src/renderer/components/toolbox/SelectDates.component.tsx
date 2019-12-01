import { Select } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import {
  format,
  startOfToday,
  startOfYesterday,
  subMonths,
  subWeeks,
  subYears,
} from 'date-fns';
import * as React from 'react';
import { SelectInsideToolbar } from './SelectDates.styles';

interface Props {
  onChange: (e: any) => void;
  defaultValue: string;
  insideToolbar?: boolean;
}

export function SelectDates(props: Props) {
  const { onChange, defaultValue, insideToolbar } = props;
  const items = (
    <>
      {' '}
      <MenuItem value={format(startOfToday(), 'yyyy-MM-dd')}>Today</MenuItem>
      <MenuItem value={format(startOfYesterday(), 'yyyy-MM-dd')}>
        Yesterday
      </MenuItem>
      <MenuItem value={format(subWeeks(new Date(), 1), 'yyyy-MM-dd')}>
        Last week
      </MenuItem>
      <MenuItem value={defaultValue}>Last 3 months</MenuItem>
      <MenuItem value={format(subMonths(new Date(), 6), 'yyyy-MM-dd')}>
        Last 6 months
      </MenuItem>
      <MenuItem value={format(subYears(new Date(), 1), 'yyyy-MM-dd')}>
        Last year
      </MenuItem>
    </>
  );
  if (!insideToolbar) {
    return (
      <Select defaultValue={defaultValue} onChange={onChange}>
        <MenuItem value={format(startOfToday(), 'yyyy-MM-dd')}>Today</MenuItem>
        <MenuItem value={format(startOfYesterday(), 'yyyy-MM-dd')}>
          Yesterday
        </MenuItem>
        <MenuItem value={format(subWeeks(new Date(), 1), 'yyyy-MM-dd')}>
          Last week
        </MenuItem>
        <MenuItem value={defaultValue}>Last 3 months</MenuItem>
        <MenuItem value={format(subMonths(new Date(), 6), 'yyyy-MM-dd')}>
          Last 6 months
        </MenuItem>
        <MenuItem value={format(subYears(new Date(), 1), 'yyyy-MM-dd')}>
          Last year
        </MenuItem>
      </Select>
    );
  }
  return (
    <SelectInsideToolbar
      defaultValue={defaultValue}
      onChange={onChange}
      color="primary"
    >
      {items}
    </SelectInsideToolbar>
  );
}
