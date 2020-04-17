import { MenuItem, Typography } from '@material-ui/core';
import * as React from 'react';
import styled from 'styled-components';
import { Query } from '../../generated/graphql';
import { FormField } from '../toolbox/FormField.component';

const Container = styled.div`
  margin: ${(props) => props.theme.spacing(3)}px 0;
`;

interface Props {
  discounts: Query | undefined;
}

export function InvoiceFormDiscounts({ discounts: data }: Props) {
  return (
    <Container>
      <Typography>Discount</Typography>
      <FormField
        name="discount"
        label="Discount"
        select
        margin="normal"
        helperText="Discount percentage"
        required
        fullWidth
      >
        <MenuItem value="">No discount</MenuItem>
        {data
          ? data.discounts.map((option) => (
              <MenuItem key={option.id} value={option.percentage}>
                {option.name
                  ? `${option.name} - ${option.percentage}%`
                  : `${option.percentage}%`}
              </MenuItem>
            ))
          : null}
      </FormField>
    </Container>
  );
}
