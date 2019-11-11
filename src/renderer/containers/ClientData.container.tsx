import { useQuery } from '@apollo/react-hooks';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { ClientData } from '../components/client/ClientData.components';
import { Query } from '../generated/graphql';
import { GET_CLIENT } from '../graphql/queries';

interface Props extends RouteComponentProps<{ clientId: string }> {}

export function ClientDataContainer(props: Props) {
  const { data, loading } = useQuery<Query>(GET_CLIENT, {
    variables: { clientId: props.match.params.clientId },
  });
  if (loading || !data) {
    return <h1>Loading</h1>;
  }
  return <ClientData client={data!.client} />;
}
