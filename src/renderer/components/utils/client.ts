import { format, subMonths } from 'date-fns';
import { Client, Profile } from '../../generated/graphql';

export function clientName(client: Client | Profile) {
  return client.company
    ? client.company
    : `${client.firstName} ${client.lastName}`;
}

export const defaultDate = format(subMonths(new Date(), 3), 'yyyy-MM-dd');
