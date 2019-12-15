import { Button, Grid, TextField, Typography } from '@material-ui/core';
import * as React from 'react';
import { Field, Form } from 'react-final-form';

interface Props {
  submit: (values: { name: string; vat: string }) => void;
  close: () => void;
  title: string;
}

export function VatRuleForm(props: Props) {
  const { submit, close, title } = props;

  function vatValue(value: number) {
    return isNaN(value) || (value >= 0 && value <= 100)
      ? undefined
      : 'Should be between 0 and 100';
  }
  return (
    <Form
      onSubmit={submit}
      render={({ handleSubmit, submitting, pristine }) => (
        <form onSubmit={handleSubmit}>
          <Typography>{title}</Typography>

          <Grid container direction="column">
            <Field name="name">
              {({ input }) => (
                <TextField placeholder="Name" label="Name" {...input} />
              )}
            </Field>
            <Field name="vat" validate={vatValue}>
              {({ input, meta }) => (
                <TextField
                  error={meta.dirty && meta.invalid}
                  style={{ marginTop: '0.8rem' }}
                  placeholder="VAT value"
                  label="VAT value"
                  required
                  inputProps={{ min: 0, max: 100 }}
                  InputProps={{ endAdornment: '%' }}
                  helperText={meta.error}
                  {...input}
                />
              )}
            </Field>
          </Grid>

          <Button onClick={close} color="secondary">
            Cancel
          </Button>
          <Button
            type="submit"
            color="primary"
            disabled={pristine || submitting}
          >
            Create VAT rule
          </Button>
        </form>
      )}
    />
  );
}
