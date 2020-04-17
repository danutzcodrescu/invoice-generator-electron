import { useQuery } from '@apollo/react-hooks';
import {
  Button,
  Grid,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import { DeleteForever, ShoppingCartOutlined } from '@material-ui/icons';
import Autocomplete from '@material-ui/lab/Autocomplete';
import * as React from 'react';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { Query, Service } from '../../generated/graphql';
import { GET_SERVICES } from '../../graphql/queries';
import { FormField } from '../toolbox/FormField.component';
import { ButtonIcon, ButtonMargin } from './InvoiceForm.styles';

export const useAutocompleteStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
}));

interface Props {
  push: Function;
  submitted: boolean;
}

export function InvoiceFormItems({ push, submitted }: Props) {
  const { data } = useQuery<Query>(GET_SERVICES);
  const classes = useAutocompleteStyles();
  return (
    <>
      <Typography>
        Services/items <ShoppingCartOutlined />
      </Typography>
      <FieldArray name="items">
        {({ fields }) =>
          fields.map((item, index) => (
            <Grid container justify="space-between" spacing={1} key={item}>
              <Grid item xs={4}>
                <Field
                  name={`${item}.name`}
                  placeholder={`Item ${index + 1} name`}
                  label={`Item ${index + 1} name`}
                >
                  {({ input }) => (
                    <Autocomplete
                      freeSolo
                      clearOnEscape
                      key={submitted.toString()}
                      options={data?.services ?? []}
                      defaultValue={{ name: input.value } as any}
                      onChange={(_: any, obj: any) => {
                        fields.update(index, {
                          name: obj?.name ?? '',
                          measurement: obj?.measurement ?? '',
                          value: obj?.cost ?? 0,
                          quantity: fields.value[index].quantity,
                        });
                      }}
                      getOptionLabel={(service: Service) => service?.name ?? ''}
                      classes={{ root: classes.root }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          {...input}
                          fullWidth
                          InputProps={{
                            ...params.InputProps,
                            type: 'search',
                            endAdornment: null,
                          }}
                        />
                      )}
                    ></Autocomplete>
                  )}
                </Field>
              </Grid>
              <Grid item xs={2}>
                <FormField
                  name={`${item}.measurement`}
                  placeholder={`Item ${index + 1} measurement unit`}
                  fullWidth
                  label={`Item ${index + 1} measurement unit`}
                />
              </Grid>
              <Grid item xs={2}>
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
                <FormField
                  name={`${item}.quantity`}
                  placeholder={`Item ${index + 1} quantity`}
                  fullWidth
                  type="number"
                  inputProps={{ min: 1 }}
                  label={`Item ${index + 1} quantity`}
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  type="button"
                  variant="text"
                  onClick={() => fields.remove(index)}
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
          onClick={() =>
            push('items', { name: '', value: 0, measurement: '', quantity: 1 })
          }
        >
          <ButtonIcon /> Add new item
        </ButtonMargin>
      </div>
    </>
  );
}
