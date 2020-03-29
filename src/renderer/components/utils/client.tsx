import { format, subMonths } from 'date-fns';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Client, Invoice, Offer, Profile } from '../../generated/graphql';

export function clientName(client: Client | Profile) {
  return client.company
    ? client.company
    : `${client.firstName} ${client.lastName}`;
}

export const defaultDate = format(subMonths(new Date(), 3), 'yyyy-MM-dd');

export function renderClientName(rowData: Invoice | Offer) {
  const name = rowData.clientData.company
    ? rowData.clientData.company
    : `${rowData.clientData.firstName} ${rowData.clientData.lastName}`;
  if (rowData.client) {
    return <Link to={`/clients/${rowData.client.id}`}>{name}</Link>;
  }
  return name;
}
