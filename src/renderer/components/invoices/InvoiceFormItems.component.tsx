import { Button, Grid, Typography } from '@material-ui/core';
import { DeleteForever, ShoppingCartOutlined } from '@material-ui/icons';
import * as React from 'react';
import { FieldArray } from 'react-final-form-arrays';
import { FormField } from '../toolbox/FormField.component';
import { ButtonIcon, ButtonMargin } from './InvoiceForm.styles';

interface Props {
  remove: Function;
  push: Function;
}

export function InvoiceFormItems(props: Props) {
  const { remove, push } = props;
  return (
    <>
      <Typography>
        Services/items <ShoppingCartOutlined />
      </Typography>
      <FieldArray name="items">
        {({ fields }) =>
          fields.map((item, index) => (
            <Grid container justify="space-between" spacing={1} key={item}>
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
    </>
  );
}
