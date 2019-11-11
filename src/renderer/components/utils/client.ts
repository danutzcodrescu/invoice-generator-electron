import { Client, Profile } from '../../generated/graphql';

export function clientName(client: Client | Profile) {
  return client.company
    ? client.company
    : `${client.firstName} ${client.lastName}`;
}
