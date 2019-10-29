import {
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
} from '@material-ui/core';
import { EmailOutlined, Receipt, Room } from '@material-ui/icons';
import { Input, TextField } from 'final-form-material-ui';
import * as React from 'react';
import { Field, Form } from 'react-final-form';
import { PaddingCard, PaddingGrid } from './ClientForm.styles';

interface Props {}

export function ClientForm(props: Props) {
  function onSubmit(values: any) {
    console.log(values);
  }
  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <PaddingGrid container xs={12}>
            <Grid item xs={6}>
              <Typography color="textPrimary" variant="h1">
                New client
                {JSON.stringify(values)}
              </Typography>
            </Grid>
            <Grid
              item
              container
              xs={6}
              alignItems="center"
              justify="space-between"
            >
              <Grid xs={4}>
                <Button color="secondary" variant="contained" fullWidth>
                  Cancel
                </Button>
              </Grid>
              <Grid xs={4}>
                <Button
                  color="primary"
                  variant="contained"
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
                    <Field component={Input} type="file" name="logo"></Field>
                    <CardMedia
                      component="img"
                      height="140"
                      image="https://leechanggroup.com/wp-content/uploads/2016/03/logo-placeholder.png"
                      alt="Logo placeholder"
                      title="Logo placeholder"
                    ></CardMedia>
                  </CardActionArea>
                </Grid>
                <Grid item container xs={8} justify="space-around">
                  <Grid item container spacing={1}>
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
                  </Grid>
                  <Field
                    name="company"
                    placeholder="Company"
                    fullWidth
                    label="Company"
                    component={TextField}
                  />
                  <Grid container>
                    <Grid item xs={1} alignItems="center" container>
                      <EmailOutlined
                        style={{ marginTop: '15px' }}
                        fontSize="default"
                      ></EmailOutlined>
                    </Grid>
                    <Grid item xs={11} alignItems="center">
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
                    <Grid item xs={1} alignItems="center" container>
                      <Room
                        fontSize="default"
                        style={{ marginTop: '15px' }}
                      ></Room>
                    </Grid>
                    <Grid item xs={11}>
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
                    <Grid item xs={1} container>
                      <Receipt
                        fontSize="default"
                        style={{ marginTop: '19px' }}
                      ></Receipt>
                    </Grid>
                    <Grid item xs={11}>
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
