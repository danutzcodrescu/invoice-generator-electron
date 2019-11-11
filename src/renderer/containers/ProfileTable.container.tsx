import { useQuery } from '@apollo/react-hooks';
import * as React from 'react';
import { ProfileTable } from '../components/profile/ProfileTable.component';
import { Query } from '../generated/graphql';
import { GET_PROFILES } from '../graphql/queries';

export function ProfileTableContainer() {
  const { data, loading } = useQuery<Query>(GET_PROFILES);
  if (!data || loading) {
    return <h1>Loading</h1>;
  }
  return <ProfileTable profiles={data!.profiles} />;
}
