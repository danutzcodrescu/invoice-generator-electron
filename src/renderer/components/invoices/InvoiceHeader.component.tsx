import { Grid, Typography } from '@material-ui/core';
import { format } from 'date-fns';
import * as React from 'react';
import { ClientData, ProfileData } from '../../generated/graphql';
import { MarginTop } from './Invoice.styles';

interface Props {
  profile: ProfileData;
  client: ClientData;
  invoiceDate: string;
  title: string;
  invoiceNumber?: string;
}

export function InvoiceHeader({
  profile,
  client,
  invoiceDate,
  invoiceNumber,
  title,
}: Props) {
  return (
    <>
      <Grid container justify="space-between">
        <Grid item xs={4}>
          <Typography variant="h1" style={{ fontSize: '1.3rem' }}>
            {profile.company
              ? profile.company
              : `${profile.firstName} ${profile.lastName}`}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h1" align="right" style={{ fontSize: '1.3rem' }}>
            {title}
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
          {invoiceNumber ? (
            <Grid item xs={4}>
              <Typography align="right">{invoiceNumber}</Typography>
            </Grid>
          ) : null}
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
            <Typography
              variant="h4"
              align="right"
              style={{ fontSize: '1rem', fontWeight: 'bold' }}
            >
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
    </>
  );
}
