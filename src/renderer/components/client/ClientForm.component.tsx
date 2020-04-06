import { MutationFunction } from '@apollo/react-common';
import {
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import { EmailOutlined, Receipt, Room } from '@material-ui/icons';
import * as React from 'react';
import { Field, Form } from 'react-final-form';
import { MutationAddClientArgs } from '../../generated/graphql';
import { NoPaddingGrid, PaddingCard, PaddingGrid } from './ClientForm.styles';

interface Props {
  createClient: MutationFunction;
  title: string;
}

export function ClientForm(props: Props) {
  const { createClient, title } = props;
  const submit = React.useCallback(
    function onSubmit(values: MutationAddClientArgs) {
      createClient({ variables: { ...values, vat: (values as any).vatnb } });
    },
    [createClient],
  );
  return (
    <Form
      onSubmit={submit}
      render={({ handleSubmit, submitting, pristine }) => (
        <form onSubmit={handleSubmit}>
          <PaddingGrid container>
            <Grid item xs={6}>
              <Typography color="textPrimary" variant="h1">
                {title}
              </Typography>
            </Grid>
            <Grid
              item
              container
              xs={6}
              alignItems="center"
              justify="space-around"
            >
              <Grid item xs={5}>
                <Button color="secondary" fullWidth>
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={5}>
                <Button
                  color="primary"
                  fullWidth
                  type="submit"
                  disabled={submitting || pristine}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
            <PaddingCard>
              <Grid container>
                <Grid item xs={4}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image="https://leechanggroup.com/wp-content/uploads/2016/03/logo-placeholder.png"
                      alt="Logo placeholder"
                      title="Logo placeholder"
                    ></CardMedia>
                  </CardActionArea>
                </Grid>
                <Grid
                  item
                  container
                  xs={8}
                  justify="space-around"
                  direction="column"
                  spacing={2}
                >
                  <NoPaddingGrid item container spacing={1}>
                    <Grid item xs={6}>
                      <Field name="firstName">
                        {({ input }) => (
                          <TextField
                            placeholder="First Name"
                            label="First name"
                            fullWidth
                            {...input}
                          />
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={6}>
                      <Field name="lastName">
                        {({ input }) => (
                          <TextField
                            placeholder="Last Name"
                            label="Last Name"
                            fullWidth
                            {...input}
                          />
                        )}
                      </Field>
                    </Grid>
                  </NoPaddingGrid>
                  <Field name="company">
                    {({ input }) => (
                      <TextField
                        placeholder="Company"
                        fullWidth
                        label="Company"
                        {...input}
                      />
                    )}
                  </Field>
                  <Grid container>
                    <Grid item xs={2} md={1} alignItems="center" container>
                      <EmailOutlined
                        style={{ marginTop: '15px' }}
                        fontSize="default"
                      ></EmailOutlined>
                    </Grid>
                    <Grid item xs={10} md={11} alignItems="center" container>
                      <Field name="email">
                        {({ input }) => (
                          <TextField
                            placeholder="Email address"
                            fullWidth
                            label="Email address"
                            type="email"
                            {...input}
                          ></TextField>
                        )}
                      </Field>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={2} md={1} alignItems="center" container>
                      <Room
                        fontSize="default"
                        style={{ marginTop: '15px' }}
                      ></Room>
                    </Grid>
                    <Grid item xs={10} md={11}>
                      <Field name="address">
                        {({ input }) => (
                          <TextField
                            placeholder="Address"
                            fullWidth
                            label="Address"
                            {...input}
                          />
                        )}
                      </Field>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={2} md={1} container>
                      <Receipt
                        fontSize="default"
                        style={{ marginTop: '19px' }}
                      ></Receipt>
                    </Grid>
                    <Grid item xs={10} md={11}>
                      <Field name="vatnb">
                        {({ input }) => (
                          <TextField
                            placeholder="VAT number"
                            fullWidth
                            label="Tax number"
                            {...input}
                          />
                        )}
                      </Field>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </PaddingCard>
          </PaddingGrid>
        </form>
      )}
    ></Form>
  );
}
