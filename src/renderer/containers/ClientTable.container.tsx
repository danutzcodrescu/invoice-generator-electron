import { useMutation, useQuery } from '@apollo/react-hooks';
import * as React from 'react';
import { ClientTable } from '../components/client/ClientTable.component';
import { Loading } from '../components/toolbox/Loading.component';
import { useNotification } from '../context/notification.context';
import { Query } from '../generated/graphql';
import { DELETE_CLIENT } from '../graphql/mutations';
import { GET_CLIENTS } from '../graphql/queries';

export function ClientTableContainer() {
  const { data, loading, error } = useQuery<Query>(GET_CLIENTS);
  const { showNotificationFor } = useNotification();
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    onCompleted: () => {
      showNotificationFor(5000, 'Client deleted succesfully');
    },
    refetchQueries: [
      {
        query: GET_CLIENTS,
      },
    ],
  });
  if (loading) {
    return <Loading />;
  }
  return (
    <ClientTable clients={data?.clients ?? []} deleteClient={deleteClient} />
  );
}
