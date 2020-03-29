import { Typography } from '@material-ui/core';
import * as React from 'react';
import { MarginTop } from '../invoices/Invoice.styles';
import { Signature } from './OfferSignature.styles';

interface Props {
  validUntil: string;
}

export function OfferSignature({ validUntil }: Props) {
  return (
    <MarginTop>
      <Typography gutterBottom>
        Nous restons à votre disposition pour toute information complémentaire.
      </Typography>
      <Typography>
        Si ce devis vous convient, veuillez nous le retourner signé précédé de
        la mention: <em>BON POUR ACCORD ET EXECUTION DU DEVIS</em>
      </Typography>
      <MarginTop>
        <Signature>Date:</Signature>
        <Signature>Signature</Signature>
      </MarginTop>
      <MarginTop style={{ marginTop: '100px' }}>
        <Typography>
          Validité du devis jusqua: <strong>{validUntil}</strong>.
        </Typography>
        <Typography>
          <em>
            Conditions de règlement: 40% à la commande, le solde à la livraison
          </em>
        </Typography>
      </MarginTop>
    </MarginTop>
  );
}
