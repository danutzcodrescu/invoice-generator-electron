import {
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
} from '@material-ui/core';
import { Create, EmailOutlined, Receipt, Room } from '@material-ui/icons';
import * as React from 'react';
import { Client } from '../../generated/graphql';
import { clientName } from '../utils/client';
import { NoPaddingGrid, PaddingCard, PaddingGrid } from './ClientForm.styles';

interface ReadOnlyProps {
  client: Client;
  setEditable: () => void;
}
export function ReadOnly(props: ReadOnlyProps) {
  const { client, setEditable } = props;
  return (
    <PaddingGrid container>
      <Grid item xs={10}>
        <Typography color="textPrimary" variant="h1">
          {clientName(client)}
        </Typography>
      </Grid>
      <Grid item container xs={2} alignItems="center" justify="space-around">
        <Grid item xs={2}>
          <Button color="primary" fullWidth onClick={setEditable}>
            <Create />
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
  );
}
