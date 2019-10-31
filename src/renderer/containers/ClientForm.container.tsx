import { useMutation } from '@apollo/react-hooks';
import * as React from 'react';
import { ClientForm } from '../components/client/ClientForm.component';
import { CREATE_CLIENT } from '../graphql/mutations';

export function ClientFormContainer() {
  const [createClient] = useMutation(CREATE_CLIENT);
  return <ClientForm createClient={createClient} title="New client" />;
}
