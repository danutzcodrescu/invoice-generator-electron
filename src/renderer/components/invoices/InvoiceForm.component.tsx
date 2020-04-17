import { Button, Grid, Typography } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { addBusinessDays, addDays } from 'date-fns';
import arrayMutators from 'final-form-arrays';
import * as React from 'react';
import { Field, Form } from 'react-final-form';
import { Client, Profile, Query } from '../../generated/graphql';
import { setBulkValue } from '../../utils/react-final-form';
import { FormField } from '../toolbox/FormField.component';
import { setInitialValues } from '../utils/editForm';
import { defaultInvoiceNumber } from '../utils/invoices';
import { InvoiceFormDiscounts } from './InvoiceDiscounts.component';
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
  values?: any;
  discounts: Query | undefined;
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
  values: initialData,
  discounts,
}: Props) {
  const selectedClient = React.useRef<string>(initialData?.client?.id);
  const selectedProfile = React.useRef<string>(initialData?.profile?.id);
  let initialValues = {
    invoiceDate: new Date(),
    invoiceNumber: defaultInvoiceNumber(lastInvoiceNumber),
    items: [{ name: '', value: '0', quantity: '1', measurement: '' }],
    ...(type === 'Offer'
      ? { validUntil: addBusinessDays(new Date(), 30) }
      : { paymentDeadline: addDays(new Date(), 15) }),
  };
  if (initialData) {
    // suboptimal since it relies on names
    // need to look into a migration posibility
    const vat = data?.vatRules.find(
      (rule) =>
        rule.name === initialData.vatRuleName ||
        rule.percentage == initialData.vatRuleName.replace('%', ''),
    );
    initialValues = setInitialValues(initialData, type, vat) as any;
  }
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
        initialValues={initialValues}
        mutators={{
          ...arrayMutators,
          setBulkValue,
        }}
        render={({
          handleSubmit,
          submitting,
          submitSucceeded,
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
                <>
                  <Grid item xs={3}>
                    <Field name="paymentDeadline">
                      {({ input }) => (
                        <KeyboardDatePicker
                          autoOk
                          disableToolbar
                          variant="inline"
                          margin="normal"
                          format="dd/MM/yyyy"
                          label={`Due date`}
                          required
                          KeyboardButtonProps={{
                            'aria-label': 'change due date date',
                          }}
                          {...input}
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid
                    item
                    xs={3}
                    style={{ position: 'relative', top: '15px' }}
                  >
                    <FormField
                      name="invoiceNumber"
                      required
                      placeholder="Invoice number"
                      label="Invoice number"
                      fullWidth
                    />
                  </Grid>
                </>
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
            <InvoiceFormItems
              push={push}
              submitted={submitSucceeded && pristine}
            />
            <InvoiceFormDiscounts discounts={discounts} />
            <InvoiceFormVat values={values} data={data} />
            <InvoiceFormErrors submitErrors={submitErrors} />
            <Button
              color="primary"
              type="submit"
              disabled={(!initialData && pristine) || submitting}
            >
              {submitButtonText}
            </Button>
          </form>
        )}
      />
    </>
  );
}
