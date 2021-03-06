import { TextField } from '@material-ui/core';
import * as React from 'react';
import { Field } from 'react-final-form';

interface Props {
  name: string;
  type: 'email' | 'number' | 'text';
  label: string;
  placeholder?: string;
  fullWidth?: boolean;
  inputProps?: any;
  select?: boolean;
  margin?: 'normal';
  helperText?: string;
  children?: any;
  required?: boolean;
  multiline?: boolean;
  parse?: (value: string) => string;
  defaultValue?: string;
  endAdornment?: any;
}

export function FormField(props: Props) {
  const { name, children, parse, endAdornment, ...rest } = props;
  return (
    <Field name={name} parse={parse}>
      {({ input, meta }) => (
        <TextField
          {...input}
          {...rest}
          error={meta.dirty && meta.invalid}
          helperText={meta.error}
          {...(endAdornment
            ? {
                InputProps: {
                  endAdornment,
                },
              }
            : {})}
        >
          {children ? children : null}
        </TextField>
      )}
    </Field>
  );
}

FormField.defaultProps = {
  type: 'text',
};
