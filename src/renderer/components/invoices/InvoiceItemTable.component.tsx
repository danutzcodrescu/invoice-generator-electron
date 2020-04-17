import { Grid, Typography } from '@material-ui/core';
import * as React from 'react';
import { Item, ProfileData } from '../../generated/graphql';
import {
  GridContainer,
  Heading,
  Item as ItemDiv,
  MarginTop,
} from './Invoice.styles';

interface Props {
  items: Item[];
  vatRuleName: string;
  vat: number;
  amount: number;
  profile: ProfileData;
  discount: number;
}

export function InvoiceItemTable({
  items,
  amount,
  vat,
  vatRuleName,
  profile,
  discount,
}: Props) {
  return (
    <MarginTop
      style={{
        border: '1px solid black',
        boxSizing: 'border-box',
      }}
    >
      <GridContainer discount={Boolean(discount)}>
        <Heading>
          <span>Description</span>
          {items.some((item) => item?.quantity > 1) ? (
            <>
              <span>Qt&eacute;</span>
              <span>Prix</span>
            </>
          ) : null}
        </Heading>
        <Heading>Montant</Heading>
        <div>
          {items.map((item, index) => (
            <ItemDiv key={item.name}>
              <Typography gutterBottom key={index}>
                {item.name}
              </Typography>
              {items.some((item) => item?.quantity > 1) ? (
                <>
                  <span>{item.quantity}</span>
                  <span>
                    {item.value}€
                    {item.measurement ? `/${item.measurement}` : ''}
                  </span>
                </>
              ) : null}
            </ItemDiv>
          ))}
        </div>
        <div>
          {items.map((item, index) => (
            <Grid container justify="space-between" key={index}>
              <Grid item>
                <span>€</span>
              </Grid>
              <Grid item>
                <Typography gutterBottom>
                  {item.value * item.quantity}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </div>
        {discount ? (
          <>
            <div></div>
            <div>
              <Grid container justify="space-between">
                <Grid item>€</Grid>
                <Grid item>-{discount}</Grid>
              </Grid>
            </div>
          </>
        ) : null}
        <Grid container justify="space-between">
          <span>TVA</span>
          <span>{vatRuleName}</span>
        </Grid>
        <div>
          <Grid container justify="space-between">
            <Grid item>€</Grid>
            <Grid item>{vat}</Grid>
          </Grid>
        </div>
        <Grid
          container
          justify="space-between"
          style={{ borderTop: '1px solid black' }}
        >
          <Grid item>
            {profile.email ? `E-mail:${profile.email}` : null}{' '}
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
          <Grid item>€</Grid>
          <Grid item>{(vat + amount - discount).toFixed(2)}</Grid>
        </Grid>
      </GridContainer>
    </MarginTop>
  );
}
