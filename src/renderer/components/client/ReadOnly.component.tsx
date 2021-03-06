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
  Create,
  Delete,
  EmailOutlined,
  Phone,
  Receipt,
  Room,
} from '@material-ui/icons';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { useNotification } from '../../context/notification.context';
import { Client, Profile } from '../../generated/graphql';
import { DELETE_CLIENT, DELETE_PROFILE } from '../../graphql/mutations';
import { useDeleteItem } from '../toolbox/delete.hook';
import { DeleteModal } from '../toolbox/DeleteModal.component';
import { clientName } from '../utils/client';
import { NoPaddingGrid, PaddingCard, PaddingGrid } from './ClientForm.styles';

interface ReadOnlyProps {
  client: Client | Profile;
  setEditable: () => void;
  type: 'client' | 'profile';
}
export function ReadOnly(props: ReadOnlyProps) {
  const { client, setEditable, type } = props;
  const history = useHistory();
  const { obj, setObj, close } = useDeleteItem();
  const { showNotificationFor } = useNotification();
  const [deleteClient] = useMutation(
    type === 'client' ? DELETE_CLIENT : DELETE_PROFILE,
    {
      onCompleted: () => {
        history.goBack();
        showNotificationFor(
          5000,
          `${type === 'client' ? 'Client' : 'Profile'} deleted succesfully`,
        );
      },
    },
  );
  return (
    <>
      <PaddingGrid container>
        <Grid item xs={8}>
          <Typography color="textPrimary" variant="h1">
            {clientName(client)}
          </Typography>
        </Grid>
        <Grid
          item
          container
          xs={4}
          alignItems="center"
          justify="flex-end"
          spacing={1}
        >
          <Grid item xs={2}>
            <Button color="primary" fullWidth onClick={setEditable}>
              <Create />
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button
              color="secondary"
              fullWidth
              onClick={() =>
                setObj({ id: client.id, name: clientName(client) })
              }
            >
              <Delete />
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
                <Grid item xs={12}>
                  <Typography align="center">
                    <b>{clientName(client)}</b>
                  </Typography>
                </Grid>
              </NoPaddingGrid>
              <Grid container>
                <Grid item xs={2} md={1} alignItems="center" container>
                  <EmailOutlined fontSize="default"></EmailOutlined>
                </Grid>
                <Grid item xs={10} md={11} alignItems="center" container>
                  <Typography>{client.email}</Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={2} md={1} alignItems="center" container>
                  <Room fontSize="default"></Room>
                </Grid>
                <Grid item xs={10} md={11}>
                  <Typography>{client.address}</Typography>
                </Grid>
              </Grid>
              {type === 'profile' ? (
                <>
                  <Grid container>
                    <Grid item xs={2} md={1} container>
                      <Phone fontSize="default"></Phone>
                    </Grid>
                    <Grid item xs={10} md={11}>
                      <Typography>{(client as Profile).phone}</Typography>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={2} md={1} container>
                      <AccountBalance fontSize="default"></AccountBalance>
                    </Grid>
                    <Grid item xs={10} md={11}>
                      <Typography>{(client as Profile).bankAccount}</Typography>
                    </Grid>
                  </Grid>
                </>
              ) : null}
              <Grid container>
                <Grid item xs={2} md={1} container>
                  <Receipt fontSize="default"></Receipt>
                </Grid>
                <Grid item xs={10} md={11}>
                  <Typography>{client.vat}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </PaddingCard>
      </PaddingGrid>
      <DeleteModal
        isOpen={Boolean(obj)}
        obj={obj}
        onPrimary={(id: string) =>
          deleteClient({
            variables: {
              id,
            },
          })
        }
        close={close}
      ></DeleteModal>
    </>
  );
}

ReadOnly.defaultProps = {
  type: 'client',
};
