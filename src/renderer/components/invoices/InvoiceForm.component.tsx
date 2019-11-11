import { useMutation, useQuery } from '@apollo/react-hooks';
import { Button, Grid, MenuItem, Paper, Typography } from '@material-ui/core';
import {
  AccountBoxOutlined,
  DeleteForever,
  DescriptionOutlined,
  ShoppingCartOutlined,
} from '@material-ui/icons';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { ipcRenderer } from 'electron';
import { ARRAY_ERROR } from 'final-form';
import arrayMutators from 'final-form-arrays';
import * as React from 'react';
import { Field, Form } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { CREATE_PDF_EVENT } from '../../../main/events';
import { Client, Profile, Query } from '../../generated/graphql';
import { CREATE_INVOICE } from '../../graphql/mutations';
import { GET_CLIENTS, GET_PROFILE, GET_VAT_RULES } from '../../graphql/queries';
import { setBulkValue } from '../../utils/react-final-form';
import { Autocomplete } from '../utils/Autocomplete.component';
import { FormField } from '../utils/FormField.component';
import { calculateNet, calculateTotal, calculateVat } from './helpers';
import { ButtonIcon, ButtonMargin, DividerMargin } from './InvoiceForm.styles';

function itemToString(item: Profile | Client) {
  if (!item) {
    return '';
  }
  if (typeof item === 'object') {
    return item.company ? item.company : `${item.firstName} ${item.lastName}`;
  }
  return item;
}

function createPDF(data: any) {
  ipcRenderer.send(CREATE_PDF_EVENT, data.createInvoice);
}

export function InvoiceForm() {
  const { data } = useQuery<Query>(GET_VAT_RULES);
  const { data: profileData } = useQuery<Query>(GET_PROFILE);
  const { data: clientData } = useQuery<Query>(GET_CLIENTS);
  const selectedClient = React.useRef<string>();
  const selectedProfile = React.useRef<string>();
  const [createInvoice] = useMutation(CREATE_INVOICE, {
    onCompleted: createPDF,
  });
  function submitForm(values: any) {
    const errors = { [ARRAY_ERROR]: [] as string[] };
    if (!values.invoiceDate) {
      errors[ARRAY_ERROR].push('Invoice date is required');
    }
    if (!values.vat) {
      errors[ARRAY_ERROR].push('Vat value is required');
    }

    if (
      (!values.clientLastName || !values.clientFirstName) &&
      !values.clientCompany
    ) {
      errors[ARRAY_ERROR].push(
        'Please provide a fullname or a company name for the client',
      );
    }
    if (
      (!values.profileLastName || !values.profileFirstName) &&
      !values.profileCompany
    ) {
      errors[ARRAY_ERROR].push(
        'Please provide a fullname or a company name for your profile',
      );
    }
    if (!values.profileVat) {
      errors[ARRAY_ERROR].push('Please add a VAT number for your profile');
    }

    if (!values.invoiceNumber) {
      errors[ARRAY_ERROR].push('Please add an invoice number');
    }

    if (errors[ARRAY_ERROR].length) {
      return errors;
    }

    const invoiceData = {
      invoiceDate: values.invoiceDate,
      items: JSON.stringify(values.items),
      vat: parseFloat(
        calculateVat(
          values.items,
          data!.vatRules.find(rule => rule.id === (values as any).vat)!
            .percentage,
        ).toString(),
      ),
      amount: parseFloat(calculateNet(values.items).toString()),
      invoiceNumber: values.invoiceNumber,
    };
    const client = {
      clientId: selectedClient.current,
      clientData: JSON.stringify({
        firstName: values.clientFirstName,
        lastName: values.clientLastName,
        company: values.clientCompany,
        address: values.clientAddress,
        vat: values.clientVat,
      }),
    };
    const profile = {
      profileId: selectedProfile.current,
      profileData: JSON.stringify({
        firstName: values.profileFirstName,
        lastName: values.profileLastName,
        company: values.profileCompany,
        address: values.profileAddress,
        vat: values.profileVat,
        phone: values.profilePhone,
        email: values.profileEmail,
        bankAccount: values.profileBankAccount,
      }),
    };
    createInvoice({
      variables: { profileData: profile, clientData: client, invoiceData },
    });
  }
  return (
    <Paper>
      <Typography gutterBottom variant="h1">
        New invoice
      </Typography>
      <Form
        onSubmit={submitForm}
        initialValues={{
          invoiceDate: new Date(),
          items: [{ name: '', value: '0' }],
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
            mutators: { push, remove, setBulkValue: set },
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
            <Typography>
              Profile <AccountBoxOutlined />
            </Typography>
            <Field name="profile" placeholder="Profile">
              {({ input, meta }) => (
                <Autocomplete
                  input={input}
                  itemToString={itemToString}
                  data={profileData ? profileData.profiles : []}
                  placeholder="Profile"
                  searchKeys={['firstName', 'lastName', 'company']}
                  onSelect={(selected: Profile) => {
                    if (selected) {
                      set(
                        ['profileFirstName', selected.firstName],
                        ['profileLastName', selected.lastName],
                        ['profileCompany', selected.company],
                        ['profileAddress', selected.address],
                        ['profileVat', selected.vat],
                        ['profileBankAccount', selected.bankAccount],
                        ['profileEmail', selected.email],
                        ['profilePhone', selected.phone],
                      );
                      selectedProfile.current = selected.id;
                    }
                  }}
                />
              )}
            </Field>
            <DividerMargin />
            <Grid container spacing={1}>
              <Grid item xs={4} md={3}>
                <FormField
                  name="profileFirstName"
                  placeholder="Profile first name"
                  fullWidth
                  label="Profile first name"
                />
              </Grid>
              <Grid item xs={4} md={3}>
                <FormField
                  name="profileLastName"
                  placeholder="Profile last name"
                  fullWidth
                  label="Profile last name"
                />
              </Grid>
              <Grid item xs={4} md={3}>
                <FormField
                  name="profileCompany"
                  placeholder="Profile company"
                  fullWidth
                  label="Profile company"
                />
              </Grid>
              <Grid item xs={4} md={3}>
                <FormField
                  name="profileEmail"
                  placeholder="Profile email"
                  fullWidth
                  label="Profile email"
                />
              </Grid>
              <Grid item xs={4} md={3}>
                <FormField
                  name="profilePhone"
                  placeholder="Profile phone"
                  fullWidth
                  label="Profile phone"
                />
              </Grid>
              <Grid item xs={4} md={3}>
                <FormField
                  name="profileAddress"
                  placeholder="Profile address"
                  fullWidth
                  label="Profile address"
                />
              </Grid>
              <Grid item xs={4} md={3}>
                <FormField
                  name="profileVat"
                  placeholder="Profile VAT number"
                  fullWidth
                  label="Profile VAT number"
                  required
                />
              </Grid>
              <Grid item xs={4} md={3}>
                <FormField
                  name="profileBankAccount"
                  placeholder="Profile bank account"
                  fullWidth
                  label="Profile bank account"
                  required
                />
              </Grid>
            </Grid>
            <DividerMargin />
            <Typography>
              Client <DescriptionOutlined />
            </Typography>
            <Field name="client" placeholder="Client">
              {({ input, meta }) => (
                <Autocomplete
                  input={input}
                  itemToString={itemToString}
                  data={clientData ? clientData.clients : []}
                  searchKeys={['firstName', 'lastName', 'company']}
                  placeholder="Client"
                  onSelect={(selected: Client) => {
                    if (selected) {
                      set(
                        ['clientFirstName', selected.firstName],
                        ['clientLastName', selected.lastName],
                        ['clientCompany', selected.company],
                        ['clientAddress', selected.address],
                        ['clientVat', selected.vat],
                      );
                      selectedClient.current = selected.id;
                    }
                  }}
                />
              )}
            </Field>
            <DividerMargin />
            <Grid container spacing={1}>
              <Grid item xs={4} md={3}>
                <FormField
                  name="clientFirstName"
                  placeholder="Client first name"
                  fullWidth
                  label="Client first name"
                />
              </Grid>
              <Grid item xs={4} md={3}>
                <FormField
                  name="clientLastName"
                  placeholder="Client last name"
                  fullWidth
                  label="Client last name"
                />
              </Grid>
              <Grid item xs={4} md={3}>
                <FormField
                  name="clientCompany"
                  placeholder="Client company"
                  fullWidth
                  label="Client company"
                />
              </Grid>
              <Grid item xs={4} md={3}>
                <FormField
                  name="clientAddress"
                  placeholder="Client address"
                  fullWidth
                  label="Client address"
                />
              </Grid>
              <Grid item xs={4} md={3}>
                <FormField
                  name="clientVat"
                  placeholder="Client VAT number"
                  fullWidth
                  label="Client VAT number"
                />
              </Grid>
            </Grid>
            <DividerMargin />
            <Typography>
              Services/items <ShoppingCartOutlined />
            </Typography>
            <FieldArray name="items">
              {({ fields }) =>
                fields.map((item, index) => (
                  <Grid
                    container
                    justify="space-between"
                    spacing={1}
                    key={item}
                  >
                    <Grid item xs={5}>
                      <FormField
                        name={`${item}.name`}
                        placeholder={`Item ${index + 1} name`}
                        fullWidth
                        label={`Item ${index + 1} name`}
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <FormField
                        name={`${item}.value`}
                        placeholder={`Item ${index + 1} value`}
                        fullWidth
                        type="number"
                        inputProps={{ min: 0 }}
                        label={`Item ${index + 1} value`}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <Button
                        type="button"
                        variant="text"
                        onClick={() => remove('items', index)}
                      >
                        <DeleteForever />
                      </Button>
                    </Grid>
                  </Grid>
                ))
              }
            </FieldArray>
            <div>
              <ButtonMargin
                variant="text"
                type="button"
                onClick={() => push('items', { name: '', value: 0 })}
              >
                <ButtonIcon /> Add new item
              </ButtonMargin>
            </div>
            <Typography>Vat percentage</Typography>
            <FormField
              name="vat"
              label="Vat"
              select
              margin="normal"
              helperText="VAT percentage"
              required
              fullWidth
            >
              {data ? (
                data.vatRules.map(option => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name
                      ? `${option.name} - ${option.percentage}%`
                      : `${option.percentage}%`}
                  </MenuItem>
                ))
              ) : (
                <MenuItem></MenuItem>
              )}
            </FormField>
            <DividerMargin />
            <Grid container>
              <Grid item xs={3}>
                Total net:
              </Grid>
              <Grid item xs={2} style={{ textAlign: 'right' }}>
                {calculateNet(values.items)}
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={3}>
                VAT:
              </Grid>
              <Grid item xs={2} style={{ textAlign: 'right' }}>
                {data && (values as any).vat
                  ? calculateVat(
                      values.items,
                      data!.vatRules.find(
                        rule => rule.id === (values as any).vat,
                      )!.percentage,
                    )
                  : 0}
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={3}>
                Total:
              </Grid>
              <Grid item xs={2} style={{ textAlign: 'right' }}>
                {data && (values as any).vat
                  ? calculateTotal(
                      values.items,
                      data!.vatRules.find(
                        rule => rule.id === (values as any).vat,
                      )!.percentage,
                    )
                  : 0}
              </Grid>
            </Grid>
            {submitErrors ? (
              <>
                <Typography color="error">
                  <b>Errors</b>
                </Typography>
                <ul>
                  {submitErrors[ARRAY_ERROR].map(
                    (val: string, index: number) => (
                      <Typography color="error" key={index} component="li">
                        {val}
                      </Typography>
                    ),
                  )}
                </ul>
              </>
            ) : null}

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
