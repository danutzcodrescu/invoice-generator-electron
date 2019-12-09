import { useQuery } from '@apollo/react-hooks';
import * as React from 'react';
import { ClientTable } from '../components/client/ClientTable.component';
import { Loading } from '../components/toolbox/Loading.component';
import { Query } from '../generated/graphql';
import { GET_CLIENTS } from '../graphql/queries';

export function ClientTableContainer() {
  const { data, loading, error } = useQuery<Query>(GET_CLIENTS);
  if (loading) {
    return <Loading />;
  }
  return <ClientTable clients={data!.clients} />;
}
