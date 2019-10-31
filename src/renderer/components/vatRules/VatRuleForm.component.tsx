import { MutationFunction } from '@apollo/react-common';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
} from '@material-ui/core';
import * as React from 'react';
import { Field, Form } from 'react-final-form';

interface Props {
  createVatRule: MutationFunction;
  isOpen: boolean;
  handleClose: () => void;
}

export function VatRuleForm(props: Props) {
  const { isOpen, handleClose, createVatRule } = props;
  function submit(values: { name: string; vat: string }) {
    createVatRule({
      variables: {
        ...values,
        vat: parseFloat(values.vat),
      },
    }).then(() => {
      handleClose();
    });
  }

  function vatValue(value: number) {
    return isNaN(value) || (value >= 0 && value <= 100)
      ? undefined
      : 'Should be between 0 and 100';
  }
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="vat-form-title"
    >
      <Form
        onSubmit={submit}
        render={({ handleSubmit, submitting, pristine }) => (
          <form onSubmit={handleSubmit}>
            <DialogTitle id="vat-form-title">New VAT rule</DialogTitle>
            <DialogContent>
              <DialogContentText>Add a new VAT rule</DialogContentText>

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
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button
                type="submit"
                onClick={handleClose}
                color="primary"
                disabled={pristine || submitting}
              >
                Create VAT rule
              </Button>
            </DialogActions>
          </form>
        )}
      />
    </Dialog>
  );
}
