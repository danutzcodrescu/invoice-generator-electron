import { useMutation, useQuery } from '@apollo/react-hooks';
import { Button, Grid, Typography } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import arrayMutators from 'final-form-arrays';
import * as React from 'react';
import { Field, Form } from 'react-final-form';
import { CREATE_PDF_EVENT } from '../../../main/events';
import { Client, Profile, Query } from '../../generated/graphql';
import { CREATE_INVOICE } from '../../graphql/mutations';
import { GET_VAT_RULES } from '../../graphql/queries';
import { setBulkValue } from '../../utils/react-final-form';
import { FormField } from '../toolbox/FormField.component';
import { submitForm } from './helpers';
import { DividerMargin } from './InvoiceForm.styles';
import { InvoiceFormClient } from './InvoiceFormClient.component';
import { InvoiceFormErrors } from './InvoiceFormErrors.component';
import { InvoiceFormItems } from './InvoiceFormItems.component';
import { InvoiceFormProfile } from './InvoiceFormProfile.component';
import { InvoiceFormVat } from './InvoiceFormVat.component';

export function itemToString(item: Profile | Client) {
  if (!item) {
    return '';
  }
  if (typeof item === 'object') {
    return item.company ? item.company : `${item.firstName} ${item.lastName}`;
  }
  return item;
}

function createPDF(data: any) {
  if (!process.env.STORYBOOK) {
    //eslint-disable-next-line @typescript-eslint/no-var-requires
    const { ipcRenderer } = require('electron');
    ipcRenderer.send(CREATE_PDF_EVENT, data.createInvoice);
  }
}

export function InvoiceForm() {
  const { data } = useQuery<Query>(GET_VAT_RULES);
  const selectedClient = React.useRef<string>();
  const selectedProfile = React.useRef<string>();
  const [createInvoice] = useMutation(CREATE_INVOICE, {
    onCompleted: createPDF,
  });

  return (
    <>
      <Typography gutterBottom variant="h1">
        New invoice
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
          items: [{ name: '', value: '0', quantity: '1', measurement: '' }],
        }}
        mutators={{
          ...arrayMutators,
          setBulkValue,
        }}
        validate={(values: any) => {
          const errors: any = {};
          if (!values.invoiceDate) {
            errors.invoiceDate = 'Required';
          }
          if (!values.invoiceNumber) {
            errors.invoiceNumber = 'Required';
          }
          if (!values.profileVat) {
            errors.profileVat = 'Required';
          }
          if (!values.vat) {
            errors.vat = 'Required';
          }
          return errors;
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
                      disableToolbar={true}
                      variant="inline"
                      format="dd/MM/yyyy"
                      margin="normal"
                      id="invoiceDate"
                      label="Invoice date"
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
              Create invoice
            </Button>
          </form>
        )}
      />
    </>
  );
}
