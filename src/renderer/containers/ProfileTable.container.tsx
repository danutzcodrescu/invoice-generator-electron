import { useQuery } from '@apollo/react-hooks';
import * as React from 'react';
import { ProfileTable } from '../components/profile/ProfileTable.component';
import { Loading } from '../components/utils/Loading.component';
import { Query } from '../generated/graphql';
import { GET_PROFILES } from '../graphql/queries';

export function ProfileTableContainer() {
  const { data, loading } = useQuery<Query>(GET_PROFILES);
  if (!data || loading) {
    return <Loading />;
  }
  return <ProfileTable profiles={data!.profiles} />;
}
