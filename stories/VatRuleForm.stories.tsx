import { storiesOf } from '@storybook/react';
import * as React from 'react';
import StoryRouter from 'storybook-react-router';
import { VATFormContainer } from '../src/renderer/containers/VatRuleForm.container';
import { Wrapper } from './Client.stories';

storiesOf('Components/VatRuleForm', module)
  .addDecorator(StoryRouter())
  .add('VatRuleForm', () => (
    <Wrapper>
      <VATFormContainer {...({ history: { goBack: () => null } } as any)} />
    </Wrapper>
  ));
