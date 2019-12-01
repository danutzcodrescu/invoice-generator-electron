import { useQuery } from '@apollo/react-hooks';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { ProfileData } from '../components/profile/ProfileData.component';
import { Loading } from '../components/utils/Loading.component';
import { Query } from '../generated/graphql';
import { GET_PROFILE } from '../graphql/queries';

interface Props extends RouteComponentProps<{ profileId: string }> {}

export function ProfileDataContainer(props: Props) {
  const { match } = props;
  const { data, loading } = useQuery<Query>(GET_PROFILE, {
    variables: { profileId: match.params.profileId },
  });
  if (!data || loading) {
    return <Loading />;
  }
  return <ProfileData profile={data!.profile}></ProfileData>;
}
