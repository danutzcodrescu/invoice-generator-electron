import { Button, Grid, Typography } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { addBusinessDays } from 'date-fns';
import arrayMutators from 'final-form-arrays';
import * as React from 'react';
import { Field, Form } from 'react-final-form';
import { Client, Profile, Query } from '../../generated/graphql';
import { setBulkValue } from '../../utils/react-final-form';
import { FormField } from '../toolbox/FormField.component';
import { defaultInvoiceNumber } from '../utils/invoices';
import { DividerMargin } from './InvoiceForm.styles';
import { InvoiceFormClient } from './InvoiceFormClient.component';
import { InvoiceFormErrors } from './InvoiceFormErrors.component';
import { InvoiceFormItems } from './InvoiceFormItems.component';
import { InvoiceFormProfile } from './InvoiceFormProfile.component';
import { InvoiceFormVat } from './InvoiceFormVat.component';

interface Props {
  title: string;
  vat: Query | undefined;
  createInvoice: Function;
  submitButtonText: string;
  type: 'Invoice' | 'Offer';
  submitForm: Function;
  lastInvoiceNumber?: string;
}

export function itemToString(item: Profile | Client) {
  if (!item) {
    return '';
  }
  if (typeof item === 'object') {
    return item.company ? item.company : `${item.firstName} ${item.lastName}`;
  }
  return item;
}

// TODO use state machines to show a completed checkmark

export function InvoiceForm({
  vat: data,
  createInvoice,
  title,
  type,
  submitButtonText,
  submitForm,
  lastInvoiceNumber,
}: Props) {
  const selectedClient = React.useRef<string>();
  const selectedProfile = React.useRef<string>();
  return (
    <>
      <Typography gutterBottom variant="h1">
        {title}
      </Typography>
      <Form
        onSubmit={(values) =>
          submitForm(
            values,
            selectedClient,
            selectedProfile,
            data!,
            createInvoice,
          )
        }
        initialValues={{
          invoiceDate: new Date(),
          invoiceNumber: defaultInvoiceNumber(lastInvoiceNumber),
          items: [{ name: '', value: '0', quantity: '1', measurement: '' }],
          ...(type === 'Offer'
            ? { validUntil: addBusinessDays(new Date(), 30) }
            : {}),
        }}
        mutators={{
          ...arrayMutators,
          setBulkValue,
        }}
        render={({
          handleSubmit,
          submitting,
          pristine,
          values,
          submitErrors,
          form: {
            mutators: { push, setBulkValue: set },
          },
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid xs={3} item>
                <Field name="invoiceDate">
                  {({ input }) => (
                    <KeyboardDatePicker
                      autoOk
                      disableToolbar
                      variant="inline"
                      format="dd/MM/yyyy"
                      margin="normal"
                      id="invoiceDate"
                      label={`${type} date`}
                      required
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                      {...input}
                    />
                  )}
                </Field>
              </Grid>
              {/* TODO Maybe extract in separate component */}
              {type === 'Invoice' ? (
                <Grid item xs={3} style={{ position: 'relative', top: '15px' }}>
                  <FormField
                    name="invoiceNumber"
                    required
                    placeholder="Invoice number"
                    label="Invoice number"
                    fullWidth
                  />
                </Grid>
              ) : (
                <Grid item xs={3}>
                  <Field name="validUntil">
                    {({ input }) => (
                      <KeyboardDatePicker
                        disableToolbar={true}
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="validUntil"
                        label="Valid until"
                        required
                        KeyboardButtonProps={{
                          'aria-label': 'offer validity',
                        }}
                        {...input}
                      />
                    )}
                  </Field>
                </Grid>
              )}
            </Grid>
            <InvoiceFormProfile set={set} selectedProfile={selectedProfile} />
            <DividerMargin />
            <InvoiceFormClient set={set} selectedClient={selectedClient} />
            <DividerMargin />
            <InvoiceFormItems push={push} />
            <InvoiceFormVat values={values} data={data} />
            <InvoiceFormErrors submitErrors={submitErrors} />
            <Button
              color="primary"
              type="submit"
              disabled={pristine || submitting}
            >
              {submitButtonText}
            </Button>
          </form>
        )}
      />
    </>
  );
}
