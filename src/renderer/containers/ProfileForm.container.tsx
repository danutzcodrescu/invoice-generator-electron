import { useMutation } from '@apollo/react-hooks';
import * as React from 'react';
import { ClientForm } from '../components/client/ClientForm.component';
import { CREATE_PROFILE } from '../graphql/mutations';

export function ProfileFormContainer() {
  const [createProfile] = useMutation(CREATE_PROFILE);
  return <ClientForm createClient={createProfile} title="New profile" />;
}
