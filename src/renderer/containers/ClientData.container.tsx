import { useQuery } from '@apollo/react-hooks';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { ClientData } from '../components/client/ClientData.components';
import { defaultDate } from '../components/utils/client';
import { Query } from '../generated/graphql';
import { GET_CLIENT } from '../graphql/queries';

interface Props extends RouteComponentProps<{ clientId: string }> {}

export function ClientDataContainer(props: Props) {
  const { data, loading, refetch } = useQuery<Query>(GET_CLIENT, {
    variables: {
      clientId: props.match.params.clientId,
      startDate: defaultDate,
    },
  });
  if (!data) {
    return <h1>Loading</h1>;
  }
  return (
    <ClientData
      client={data!.client}
      isLoading={loading || !data}
      refetch={refetch}
    ></ClientData>
  );
}
