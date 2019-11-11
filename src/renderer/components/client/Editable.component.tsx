import { useMutation } from '@apollo/react-hooks';
import {
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
} from '@material-ui/core';
import { EmailOutlined, Receipt, Room } from '@material-ui/icons';
import * as React from 'react';
import { Form } from 'react-final-form';
import { Client, Mutation } from '../../generated/graphql';
import { UPDATE_CLIENT } from '../../graphql/mutations';
import { GET_CLIENT } from '../../graphql/queries';
import { clientName } from '../utils/client';
import { FormField } from '../utils/FormField.component';
import { NoPaddingGrid, PaddingCard, PaddingGrid } from './ClientForm.styles';

interface Props {
  client: Client;
  setReadOnly: () => void;
  // submitChanges: (values: Partial<Client>) => void;
}

export function Editable(props: Props) {
  const { client, setReadOnly } = props;
  const [updateClient] = useMutation<Mutation>(UPDATE_CLIENT, {
    onCompleted: () => setReadOnly(),
    refetchQueries: [{ query: GET_CLIENT, variables: { clientId: client.id } }],
  });
  return (
    <Form
      initialValues={{
        firstName: client.firstName,
        lastName: client.lastName,
        company: client.company,
        email: client.email,
        vat: client.vat,
        address: client.address,
      }}
      onSubmit={values => {
        console.log(values);
        updateClient({
          variables: {
            clientId: client.id,
            clientData: values,
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
                        parse={value => value}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <FormField
                        name="lastName"
                        placeholder="Last Name"
                        label="Last name"
                        fullWidth
                        parse={value => value}
                      />
                    </Grid>
                  </NoPaddingGrid>
                  <FormField
                    name="company"
                    placeholder="Company"
                    label="Company"
                    fullWidth
                    parse={value => value}
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
                        parse={value => value}
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
                        parse={value => value}
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
                      <FormField
                        name="vat"
                        placeholder="Vat number"
                        label="Tax number"
                        fullWidth
                        parse={value => value}
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
