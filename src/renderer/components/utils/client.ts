import { Client } from '../../generated/graphql';

export function clientName(client: Client) {
  return client.company
    ? client.company
    : `${client.firstName} ${client.lastName}`;
}
