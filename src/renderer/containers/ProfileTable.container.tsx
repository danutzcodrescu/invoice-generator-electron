import { useMutation, useQuery } from '@apollo/react-hooks';
import * as React from 'react';
import { ProfileTable } from '../components/profile/ProfileTable.component';
import { Loading } from '../components/toolbox/Loading.component';
import { useNotification } from '../context/notification.context';
import { Query } from '../generated/graphql';
import { DELETE_PROFILE } from '../graphql/mutations';
import { GET_PROFILES } from '../graphql/queries';

export function ProfileTableContainer() {
  const { data, loading } = useQuery<Query>(GET_PROFILES);
  const { showNotificationFor } = useNotification();
  const [deleteProfile] = useMutation(DELETE_PROFILE, {
    onCompleted: () => {
      showNotificationFor(5000, 'Profile succesfully deleted');
    },
    refetchQueries: [{ query: GET_PROFILES }],
  });
  if (!data || loading) {
    return <Loading />;
  }
  return (
    <ProfileTable profiles={data!.profiles} deleteProfile={deleteProfile} />
  );
}
