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
}

export function FormField(props: Props) {
  const { name, children, ...rest } = props;
  return (
    <Field name={name}>
      {({ input, meta }) => (
        <TextField
          {...rest}
          {...input}
          error={meta.dirty && meta.invalid}
          helperText={meta.error}
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
