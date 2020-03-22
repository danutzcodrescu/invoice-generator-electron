import { MutationFunction } from '@apollo/react-common';
import { useQuery } from '@apollo/react-hooks';
import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { KeyboardDatePicker } from '@material-ui/pickers';
import * as React from 'react';
import { Field, Form } from 'react-final-form';
import { Client, Query } from '../../generated/graphql';
import { GET_CLIENTS } from '../../graphql/queries';
import { DividerMargin } from '../invoices/InvoiceForm.styles';
import { FormField } from '../toolbox/FormField.component';
import { clientName } from '../utils/client';

interface Props {
  createExpense: MutationFunction;
}

export function ExpenseForm(props: Props) {
  const { createExpense } = props;
  const { data } = useQuery<Query>(GET_CLIENTS);
  const inputRef = React.useRef<Client | null>(null);
  function submitForm(values: any) {
    let clientId: string | null = null;
    if (
      inputRef.current &&
      values.clientName === clientName(inputRef.current)
    ) {
      clientId = inputRef.current.id;
    }
    createExpense({
      variables: {
        expense: Object.assign(
          {
            ...values,
            amount: parseFloat(values.amount),
            vat: parseFloat(values.vat),
          },
          clientId ? { clientId } : {},
        ),
      },
    });
  }
  return (
    <Paper>
      <Typography gutterBottom variant="h1">
        New expense
      </Typography>
      <Form
        onSubmit={submitForm}
        initialValues={{
          invoiceDate: new Date(),
        }}
        render={({ handleSubmit, submitting, pristine, submitErrors }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid xs={3} item>
                <Field name="invoiceDate">
                  {({ input }) => (
                    <KeyboardDatePicker
                      disableToolbar={true}
                      variant="inline"
                      format="dd/MM/yyyy"
                      margin="normal"
                      id="invoiceDate"
                      label="Invoice date"
                      style={{ width: '100%' }}
                      required
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                      {...input}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={3} style={{ position: 'relative', top: '15px' }}>
                <FormField
                  name="invoiceNumber"
                  required
                  placeholder="Invoice number"
                  label="Invoice number"
                  fullWidth
                />
              </Grid>
            </Grid>
            <DividerMargin />
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Field name="clientName">
                  {({ input }) => (
                    <Autocomplete
                      freeSolo
                      getOptionLabel={(option: Client) => clientName(option)}
                      options={data ? data.clients : []}
                      onChange={(_: Event, val: any) =>
                        (inputRef.current = val)
                      }
                      onInputChange={(_, val) => input.onChange(val)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          {...input}
                          label="Client name"
                          placeholder="Client name"
                          fullWidth
                        />
                      )}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={3}>
                <FormField
                  name="amount"
                  label="Amount"
                  type="number"
                  placeholder="Amount"
                  required
                  fullWidth
                ></FormField>
              </Grid>
              <Grid item xs={3}>
                <FormField
                  name="vat"
                  label="VAT"
                  type="number"
                  placeholder="VAT"
                  required
                  fullWidth
                ></FormField>
              </Grid>
              <Grid item xs={3}>
                <FormField
                  name="description"
                  label="Description"
                  placeholder="Description"
                  fullWidth
                  multiline
                ></FormField>
              </Grid>
            </Grid>
            <DividerMargin />
            <Button
              color="primary"
              type="submit"
              disabled={pristine || submitting}
            >
              Create invoice
            </Button>
          </form>
        )}
      />
    </Paper>
  );
}
