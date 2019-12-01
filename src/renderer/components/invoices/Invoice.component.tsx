import { Grid, Typography } from '@material-ui/core';
import { format } from 'date-fns';
import * as React from 'react';
import { ClientData, Item, ProfileData } from '../../generated/graphql';
import { Container, GridContainer, Heading, MarginTop } from './Invoice.styles';

interface Props {
  items: Item[];
  client: ClientData;
  profile: ProfileData;
  vat: number;
  amount: number;
  invoiceDate: string;
  invoiceNumber: string;
}

export function Invoice(props: Props) {
  const {
    items,
    client,
    vat,
    profile,
    amount,
    invoiceDate,
    invoiceNumber,
  } = props;
  return (
    <Container>
      <Grid container justify="space-between">
        <Grid item xs={4}>
          <Typography variant="h1">
            {profile.company
              ? profile.company
              : `${profile.firstName} ${profile.lastName}`}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h1" align="right">
            Facture
          </Typography>
        </Grid>
      </Grid>
      <MarginTop>
        <Grid container justify="space-between">
          <Grid item xs={4}>
            <Typography>{profile.address}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography align="right">
              <b>Date</b>: {format(new Date(invoiceDate), 'dd/MM/yyyy')}
            </Typography>
          </Grid>
        </Grid>
        <Grid container justify="space-between">
          <Grid item xs={4}>
            {profile.vat ? <Typography>TVA: {profile.vat}</Typography> : null}
          </Grid>
          <Grid item xs={4}>
            <Typography align="right">{invoiceNumber}</Typography>
          </Grid>
        </Grid>
        <Grid>
          <Grid item xs={4}>
            {profile.bankAccount ? (
              <Typography>{profile.bankAccount}</Typography>
            ) : null}
          </Grid>
        </Grid>
      </MarginTop>
      <MarginTop>
        <Grid container justify="flex-end">
          <Grid item xs={4}>
            <Typography variant="h4" align="right">
              {client.company
                ? client.company
                : `${client.firstName} ${client.lastName}`}
            </Typography>
          </Grid>
        </Grid>
        <Grid container justify="flex-end">
          <Grid item xs={4}>
            <Typography align="right">{client.address}</Typography>
          </Grid>
        </Grid>
        <Grid container justify="flex-end">
          {client.vat ? (
            <Grid item xs={4}>
              <Typography align="right">TVA: {client.vat}</Typography>
            </Grid>
          ) : null}
        </Grid>
      </MarginTop>
      <MarginTop
        style={{
          border: '1px solid black',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            height: '100px',
            borderBottom: '1px solid black',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h3">Payment cash</Typography>
        </div>
        <GridContainer>
          <Heading>Description</Heading>
          <Heading>Montant</Heading>
          <div>
            {items.map((item, index) => (
              <Typography gutterBottom key={index}>
                {item.name}
              </Typography>
            ))}
          </div>
          <div>
            {items.map((item, index) => (
              <Grid container justify="space-between" key={index}>
                <Grid item>$</Grid>
                <Grid item>{parseFloat(item.value)}</Grid>
              </Grid>
            ))}
          </div>
          <div>TVA</div>
          <div>
            <Grid container justify="space-between">
              <Grid item>$</Grid>
              <Grid item>{vat}</Grid>
            </Grid>
          </div>
          <Grid
            container
            justify="space-between"
            style={{ borderTop: '1px solid black' }}
          >
            <Grid item>
              {profile.email ? `E-mail:${profile.email};` : null}{' '}
              {profile.phone ? (
                <span>
                  Mobile:<b>{profile.phone}</b>
                </span>
              ) : null}
            </Grid>
            <Grid item>
              <b>Total</b>
            </Grid>
          </Grid>
          <Grid
            container
            justify="space-between"
            style={{ borderTop: '1px solid black' }}
          >
            <Grid item>$</Grid>
            <Grid item>{vat + amount}</Grid>
          </Grid>
        </GridContainer>
      </MarginTop>
    </Container>
  );
}
