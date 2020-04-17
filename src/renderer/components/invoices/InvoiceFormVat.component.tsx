import { Grid, MenuItem, Typography } from '@material-ui/core';
import * as React from 'react';
import { Query } from '../../generated/graphql';
import { FormField } from '../toolbox/FormField.component';
import { calculateNet, calculateTotal, calculateVat } from './helpers';
import { DividerMargin } from './InvoiceForm.styles';

interface Props {
  data: Query | undefined;
  values: any;
}

export function InvoiceFormVat(props: Props) {
  const { data, values } = props;
  return (
    <>
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
          data.vatRules.map((option) => (
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
          {calculateNet((values as any).items)}
        </Grid>
      </Grid>
      {values.discount ? (
        <Grid container>
          <Grid item xs={3}>
            Discount:
          </Grid>
          <Grid item xs={2} style={{ textAlign: 'right' }}>
            -
            {(calculateNet((values as any).items) *
              parseFloat(values.discount)) /
              100}
          </Grid>
        </Grid>
      ) : null}

      <Grid container>
        <Grid item xs={3}>
          VAT:
        </Grid>
        <Grid item xs={2} style={{ textAlign: 'right' }}>
          {data && (values as any).vat
            ? calculateVat(
                (values as any).items,
                data!.vatRules.find((rule) => rule.id === (values as any).vat)!
                  .percentage,
                values.discount,
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
                (values as any).items,
                data!.vatRules.find((rule) => rule.id === (values as any).vat)!
                  .percentage,
                values.discount,
              )
            : 0}
        </Grid>
      </Grid>
    </>
  );
}
