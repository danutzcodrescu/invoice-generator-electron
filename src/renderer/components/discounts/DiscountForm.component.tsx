import {
  Button,
  DialogActions,
  Grid,
  Typography,
  InputAdornment,
} from '@material-ui/core';
import * as React from 'react';
import { Form } from 'react-final-form';
import { FormField } from '../toolbox/FormField.component';

interface Props {
  submit: (values: { name: string; percentage: number }, form: any) => void;
  close: () => void;
  title: string;
  values?: { name?: string; percentage?: number };
}

export function DiscountForm(props: Props) {
  const { submit, close, title, values } = props;
  function formSubmit(values: { name: string; percentage: string }, form: any) {
    submit({ ...values, percentage: parseFloat(values.percentage) }, form);
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
              placeholder="Name"
              label="Service name"
              fullWidth
            />
            <FormField
              name="percentage"
              required
              placeholder="Percentage"
              label="Percentage"
              fullWidth
              inputProps={{ min: 1 }}
              endAdornment={<InputAdornment position="end">%</InputAdornment>}
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
              {values ? 'Update discount' : 'Create discount'}
            </Button>
          </DialogActions>
        </form>
      )}
    />
  );
}
