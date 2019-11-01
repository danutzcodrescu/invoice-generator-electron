import { useQuery } from '@apollo/react-hooks';
import { Button, Grid, MenuItem, Paper, Typography } from '@material-ui/core';
import {
  AccountBoxOutlined,
  DeleteForever,
  DescriptionOutlined,
  ShoppingCartOutlined,
} from '@material-ui/icons';
import { KeyboardDatePicker } from '@material-ui/pickers';
import arrayMutators from 'final-form-arrays';
import * as React from 'react';
import { Field, Form } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { Client, Profile, Query } from '../../generated/graphql';
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

export function InvoiceForm() {
  const { data } = useQuery<Query>(GET_VAT_RULES);
  const { data: profileData } = useQuery<Query>(GET_PROFILE);
  const { data: clientData } = useQuery<Query>(GET_CLIENTS);
  const selectedClient = React.useRef<string>();
  const selectedProfile = React.useRef<string>();
  function submitForm(values: any) {
    const invoiceData = {
      invoiceDate: values.invoiceDate,
      items: JSON.stringify(values.items),
      vat: calculateVat(
        values.items,
        data!.vatRules.find(rule => rule.id === (values as any).vat)!
          .percentage,
      ),
      amount: calculateNet(values.items),
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
      }),
    };
    console.log({ ...profile, ...client, invoiceData });
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
        render={({
          handleSubmit,
          submitting,
          pristine,
          values,
          form: {
            mutators: { push, remove, setBulkValue: set },
          },
          form,
        }) => (
          <form onSubmit={handleSubmit}>
            <Field name="invoiceDate">
              {({ input }) => (
                <KeyboardDatePicker
                  disableToolbar={true}
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  id="invoiceDate"
                  label="Invoice date"
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  {...input}
                />
              )}
            </Field>
            <Typography>
              Profile <AccountBoxOutlined />
            </Typography>
            <Field name="profile" placeholder="Profile">
              {({ input, meta }) => (
                <Autocomplete
                  input={input}
                  itemToString={itemToString}
                  data={profileData ? profileData.profiles : []}
                  searchKeys={['firstName', 'lastName', 'company']}
                  onSelect={(selected: Profile) => {
                    set(
                      ['profileFirstName', selected.firstName],
                      ['profileLastName', selected.lastName],
                      ['profileCompany', selected.company],
                      ['profileAddress', selected.address],
                      ['profileVat', selected.vat],
                    );
                    selectedProfile.current = selected.id;
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
                  onSelect={(selected: Client) => {
                    set(
                      ['clientFirstName', selected.firstName],
                      ['clientLastName', selected.lastName],
                      ['clientCompany', selected.company],
                      ['clientAddress', selected.address],
                      ['clientVat', selected.vat],
                    );
                    selectedClient.current = selected.id;
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
            <Button color="primary" type="submit">
              Create invoice
            </Button>
          </form>
        )}
      />
    </Paper>
  );
}
