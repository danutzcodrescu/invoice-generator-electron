import { Button, DialogActions, Grid, Typography } from '@material-ui/core';
import * as React from 'react';
import { Form } from 'react-final-form';
import { FormField } from '../toolbox/FormField.component';

interface Props {
  submit: (values: { name: string; measurement: string; cost: number }) => void;
  close: () => void;
  title: string;
  values?: { name?: string; cost?: string; measurement?: string | null };
}

export function ServiceForm(props: Props) {
  const { submit, close, title, values } = props;
  function formSubmit(values: {
    name: string;
    measurement: string;
    cost: string;
  }) {
    submit({ ...values, cost: parseFloat(values.cost) });
  }
  return (
    <Form
      onSubmit={formSubmit}
      initialValues={values as any}
      render={({ handleSubmit, submitting, pristine }) => (
        <form onSubmit={handleSubmit}>
          <Typography>{title}</Typography>

          <Grid container direction="column">
            <FormField
              name="name"
              required
              placeholder="Name"
              label="Service name"
              fullWidth
            />
            <FormField
              name="measurement"
              placeholder="Measurement unit"
              label="Measurement unit"
              fullWidth
            />
            <FormField
              name="cost"
              placeholder="Unit price"
              label="Unit price"
              fullWidth
              inputProps={{ min: 0 }}
            />
          </Grid>
          <DialogActions>
            <Button onClick={close} color="secondary">
              Cancel
            </Button>
            <Button
              type="submit"
              color="primary"
              disabled={pristine || submitting}
            >
              {values ? 'Update service/item' : 'Create service/item'}
            </Button>
          </DialogActions>
        </form>
      )}
    />
  );
}
