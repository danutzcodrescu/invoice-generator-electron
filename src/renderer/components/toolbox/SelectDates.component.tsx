import { Button, Select } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { KeyboardDatePicker } from '@material-ui/pickers';
import {
  format,
  isAfter,
  isBefore,
  startOfYesterday,
  subMonths,
  subWeeks,
  subYears,
} from 'date-fns';
import * as React from 'react';
import { Field, Form } from 'react-final-form';
import { DatePickersContainer, StyledForm } from './SelectDates.styles';

interface Props {
  onChange: (e: any) => void;
  defaultValue: string;
  refetchCustom: (startDate: string, endDate: string) => void;
}

export function SelectDates(props: Props) {
  const { onChange, defaultValue, refetchCustom } = props;
  const items = [
    <MenuItem key="today" value={format(new Date(), 'yyyy-MM-dd')}>
      Today
    </MenuItem>,
    <MenuItem key="yesterday" value={format(startOfYesterday(), 'yyyy-MM-dd')}>
      Yesterday
    </MenuItem>,
    <MenuItem key="week" value={format(subWeeks(new Date(), 1), 'yyyy-MM-dd')}>
      Last week
    </MenuItem>,
    <MenuItem key="3months" value={defaultValue}>
      Last 3 months
    </MenuItem>,
    <MenuItem
      key="6months"
      value={format(subMonths(new Date(), 6), 'yyyy-MM-dd')}
    >
      Last 6 months
    </MenuItem>,
    <MenuItem key="year" value={format(subYears(new Date(), 1), 'yyyy-MM-dd')}>
      Last year
    </MenuItem>,
    <MenuItem key="custom" value="custom">
      Custom
    </MenuItem>,
  ];

  function change(e: any) {
    if (e.target.value !== 'custom') onChange(e.target.value);
  }

  return (
    <Form
      initialValues={{
        selection: defaultValue,
        startDate: null,
        endDate: null,
      }}
      onSubmit={(values) => {
        if (isAfter(values.startDate!, values.endDate!)) {
          return { startDate: 'Start date cannot be after start date' };
        }
        if (isBefore(values.endDate!, values.startDate!)) {
          return { startDate: 'End date cannot be before start date' };
        }
        refetchCustom(values.startDate!, values.endDate!);
      }}
      render={({ handleSubmit, values, submitting }) => (
        <StyledForm onSubmit={handleSubmit} autoComplete="off">
          <Field name="selection">
            {({ input }) => (
              <Select inputProps={{ ...input }} onChange={change}>
                {items}
              </Select>
            )}
          </Field>
          <DatePickersContainer hidden={values.selection !== 'custom'}>
            <Field name="startDate">
              {({ input, meta }) => (
                <KeyboardDatePicker
                  autoOk
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  label="Start date"
                  KeyboardButtonProps={{
                    'aria-label': 'change start date',
                  }}
                  {...input}
                  value={input.value || null}
                  {...(meta.submitError
                    ? { error: true, helperText: meta.submitError }
                    : {})}
                />
              )}
            </Field>
            <Field name="endDate">
              {({ input, meta }) => (
                <KeyboardDatePicker
                  autoOk
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  label="End date"
                  KeyboardButtonProps={{
                    'aria-label': 'change start date',
                  }}
                  {...input}
                  value={input.value || null}
                  {...(meta.submitError
                    ? { error: true, helperText: meta.submitError }
                    : {})}
                />
              )}
            </Field>
            <Button
              color="primary"
              type="submit"
              disabled={submitting || !values.endDate || !values.startDate}
            >
              Select dates
            </Button>
          </DatePickersContainer>
        </StyledForm>
      )}
    />
  );
}
