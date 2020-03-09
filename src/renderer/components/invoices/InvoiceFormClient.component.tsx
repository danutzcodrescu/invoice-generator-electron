import { Grid, Typography } from '@material-ui/core';
import { DescriptionOutlined } from '@material-ui/icons';
import * as React from 'react';
import { Field } from 'react-final-form';
import { Client, Query } from '../../generated/graphql';
import { FormField } from '../toolbox/FormField.component';
import { Autocomplete } from '../utils/Autocomplete.component';
import { itemToString } from './InvoiceForm.component';
import { DividerMargin } from './InvoiceForm.styles';

interface Props {
  clientData: Query | undefined;
  set: Function;
  selectedClient: React.MutableRefObject<string | undefined>;
}

export function InvoiceFormClient(props: Props) {
  const { clientData, set, selectedClient } = props;
  return (
    <>
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
    </>
  );
}
