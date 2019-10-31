import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { VATFormContainer } from '../src/renderer/containers/VatRuleForm.container';
import { Wrapper } from './ClientForm.stories';

storiesOf('Components/VatRuleForm', module).add('VatRuleForm', () => (
  <Wrapper>
    <VATFormContainer />
  </Wrapper>
));
