import { useQuery } from '@apollo/react-hooks';
import { Grid, Typography } from '@material-ui/core';
import { AccountBoxOutlined } from '@material-ui/icons';
import * as React from 'react';
import { Field } from 'react-final-form';
import { Profile, Query } from '../../generated/graphql';
import { GET_PROFILES } from '../../graphql/queries';
import { FormField } from '../toolbox/FormField.component';
import { Autocomplete } from '../utils/Autocomplete.component';
import { itemToString } from './InvoiceForm.component';
import { DividerMargin } from './InvoiceForm.styles';

interface Props {
  set: Function;
  selectedProfile: React.MutableRefObject<string | undefined>;
}

export function InvoiceFormProfile(props: Props) {
  const { set, selectedProfile } = props;
  const { data: profileData } = useQuery<Query>(GET_PROFILES);
  return (
    <>
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
    </>
  );
}
