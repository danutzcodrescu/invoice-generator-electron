import * as React from 'react';
import { Profile } from '../../generated/graphql';
import { Editable } from '../client/Editable.component';
import { ReadOnly } from '../client/ReadOnly.component';

interface Props {
  profile: Profile;
}

export function ProfileData(props: Props) {
  const { profile } = props;
  const [isReadOnly, setReadOnly] = React.useState<boolean>(true);
  if (isReadOnly) {
    return (
      <ReadOnly
        type="profile"
        client={profile}
        setEditable={() => setReadOnly(false)}
      />
    );
  }
  return (
    <Editable
      type="profile"
      client={profile}
      setReadOnly={() => setReadOnly(true)}
    />
  );
}
