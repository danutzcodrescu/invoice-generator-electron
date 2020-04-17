import * as React from 'react';
import { ClientData, Item, ProfileData } from '../../generated/graphql';
import { OfferSignature } from '../offer/OfferSignature';
import { Container } from './Invoice.styles';
import { InvoiceHeader } from './InvoiceHeader.component';
import { InvoiceItemTable } from './InvoiceItemTable.component';

interface BaseProps {
  items: Item[];
  client: ClientData;
  profile: ProfileData;
  vat: number;
  amount: number;
  invoiceDate: string;
  vatRuleName: string;
  discount: number;
}

interface InvoiceProps extends BaseProps {
  title: 'Facture';
  invoiceNumber: string;
  deadline: string;
}

interface OfferProps extends BaseProps {
  title: 'Devis';
  validUntil: string;
}

type Props = InvoiceProps | OfferProps;

export function Invoice(props: Props) {
  const {
    items,
    client,
    vat,
    profile,
    amount,
    invoiceDate,
    vatRuleName,
    title,
    discount,
    ...other
  } = props;
  return (
    <Container>
      <InvoiceHeader
        invoiceDate={invoiceDate}
        invoiceNumber={(other as InvoiceProps).invoiceNumber}
        profile={profile}
        client={client}
        title={title}
        deadline={(other as InvoiceProps).deadline}
      />
      <InvoiceItemTable
        profile={profile}
        items={items}
        vatRuleName={vatRuleName}
        amount={amount}
        vat={vat}
        discount={discount}
      />
      {(other as OfferProps).validUntil ? (
        <OfferSignature validUntil={(other as OfferProps).validUntil} />
      ) : null}
    </Container>
  );
}
