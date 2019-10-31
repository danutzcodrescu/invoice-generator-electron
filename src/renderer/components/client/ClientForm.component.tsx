import { MutationFunction } from '@apollo/react-common';
import {
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
} from '@material-ui/core';
import { EmailOutlined, Receipt, Room } from '@material-ui/icons';
import { TextField } from 'final-form-material-ui';
import * as React from 'react';
import { Field, Form } from 'react-final-form';
import { MutationAddClientArgs } from '../../generated/graphql';
import { NoPaddingGrid, PaddingCard, PaddingGrid } from './ClientForm.styles';

interface Props {
  createClient: MutationFunction;
}

export function ClientForm(props: Props) {
  const { createClient } = props;
  const submit = React.useCallback(
    function onSubmit(values: MutationAddClientArgs) {
      createClient({ variables: values });
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
                New client
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
                      <Field
                        component={TextField}
                        name="firstName"
                        placeholder="First Name"
                        label="First name"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        name="lastName"
                        placeholder="Last Name"
                        label="Last Name"
                        fullWidth
                        component={TextField}
                      />
                    </Grid>
                  </NoPaddingGrid>
                  <Field
                    name="company"
                    placeholder="Company"
                    fullWidth
                    label="Company"
                    component={TextField}
                  />
                  <Grid container>
                    <Grid item xs={2} md={1} alignItems="center" container>
                      <EmailOutlined
                        style={{ marginTop: '15px' }}
                        fontSize="default"
                      ></EmailOutlined>
                    </Grid>
                    <Grid item xs={10} md={11} alignItems="center" container>
                      <Field
                        name="email"
                        placeholder="Email address"
                        fullWidth
                        label="Email address"
                        component={TextField}
                        type="email"
                      />
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
                      <Field
                        name="address"
                        placeholder="Address"
                        fullWidth
                        label="Address"
                        component={TextField}
                      />
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
                      <Field
                        name="vatnb"
                        placeholder="VAT number"
                        fullWidth
                        label="Tax number"
                        component={TextField}
                      />
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
