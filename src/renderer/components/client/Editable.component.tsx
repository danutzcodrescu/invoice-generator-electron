import { useMutation } from '@apollo/react-hooks';
import {
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
} from '@material-ui/core';
import {
  AccountBalance,
  EmailOutlined,
  Phone,
  Receipt,
  Room,
} from '@material-ui/icons';
import * as React from 'react';
import { Form } from 'react-final-form';
import { Client, Mutation, Profile } from '../../generated/graphql';
import { UPDATE_CLIENT, UPDATE_PROFILE } from '../../graphql/mutations';
import { GET_CLIENT, GET_PROFILE } from '../../graphql/queries';
import { FormField } from '../toolbox/FormField.component';
import { clientName } from '../utils/client';
import { NoPaddingGrid, PaddingCard, PaddingGrid } from './ClientForm.styles';

interface Props {
  client: Client | Profile;
  setReadOnly: () => void;
  type: 'client' | 'profile';
}

export function Editable(props: Props) {
  const { client, setReadOnly, type } = props;
  const [updateClient] = useMutation<Mutation>(
    type === 'client' ? UPDATE_CLIENT : UPDATE_PROFILE,
    {
      onCompleted: () => setReadOnly(),
      refetchQueries: [
        {
          query: type === 'client' ? GET_CLIENT : GET_PROFILE,
          variables: {
            [type === 'client' ? 'clientId' : 'profileId']: client.id,
          },
        },
      ],
    },
  );
  return (
    <Form
      initialValues={Object.assign(
        {
          firstName: client.firstName,
          lastName: client.lastName,
          company: client.company,
          email: client.email,
          vat: client.vat,
          address: client.address,
        },
        type === 'profile'
          ? {
              phone: (client as Profile).phone,
              bankAccount: (client as Profile).bankAccount,
            }
          : {},
      )}
      onSubmit={(values) => {
        updateClient({
          variables: {
            [type === 'client' ? 'clientId' : 'profileId']: client.id,
            [type === 'client' ? 'clientData' : 'profileData']: values,
          },
        });
      }}
      render={({ handleSubmit, submitting, pristine }) => (
        <form onSubmit={handleSubmit}>
          <PaddingGrid container>
            <Grid item xs={6}>
              <Typography color="textPrimary" variant="h1">
                Edit {clientName(client)}
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
                <Button color="secondary" fullWidth onClick={setReadOnly}>
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
                      <FormField
                        name="firstName"
                        placeholder="First Name"
                        label="First name"
                        fullWidth
                        parse={(value) => value}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormField
                        name="lastName"
                        placeholder="Last Name"
                        label="Last name"
                        fullWidth
                        parse={(value) => value}
                      />
                    </Grid>
                  </NoPaddingGrid>
                  <FormField
                    name="company"
                    placeholder="Company"
                    label="Company"
                    fullWidth
                    parse={(value) => value}
                  />
                  <Grid container>
                    <Grid item xs={2} md={1} alignItems="center" container>
                      <EmailOutlined
                        style={{ marginTop: '15px' }}
                        fontSize="default"
                      ></EmailOutlined>
                    </Grid>
                    <Grid item xs={10} md={11} alignItems="center" container>
                      <FormField
                        name="email"
                        placeholder="Email address"
                        label="Email address"
                        type="email"
                        fullWidth
                        parse={(value) => value}
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
                      <FormField
                        name="address"
                        placeholder="Address"
                        label="Address"
                        fullWidth
                        parse={(value) => value}
                      />
                    </Grid>
                  </Grid>
                  {type === 'profile' ? (
                    <>
                      <Grid container>
                        <Grid item xs={2} md={1} container>
                          <Phone fontSize="default"></Phone>
                        </Grid>
                        <Grid item xs={10} md={11}>
                          <FormField
                            name="phone"
                            placeholder="Phone"
                            label="Phone"
                            fullWidth
                            parse={(value) => value}
                          />
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid item xs={2} md={1} container>
                          <AccountBalance fontSize="default"></AccountBalance>
                        </Grid>
                        <Grid item xs={10} md={11}>
                          <FormField
                            name="bankAccount"
                            placeholder="Bank account"
                            label="Bank account"
                            fullWidth
                            parse={(value) => value}
                          />
                        </Grid>
                      </Grid>
                    </>
                  ) : null}
                  <Grid container>
                    <Grid item xs={2} md={1} container>
                      <Receipt
                        fontSize="default"
                        style={{ marginTop: '19px' }}
                      ></Receipt>
                    </Grid>
                    <Grid item xs={10} md={11}>
                      <FormField
                        name="vat"
                        placeholder="Vat number"
                        label="Tax number"
                        fullWidth
                        parse={(value) => value}
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

Editable.defaultProps = {
  type: 'client',
};
