import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { ProfileFormContainer } from '../src/renderer/containers/ProfileForm.container';
import { Wrapper } from './Client.stories';

storiesOf('Components/ProfileForm', module).add('ProfileForm', () => (
  <Wrapper>
    <ProfileFormContainer />
  </Wrapper>
));
