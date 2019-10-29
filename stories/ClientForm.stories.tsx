import CssBaseline from '@material-ui/core/CssBaseline';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import 'typeface-roboto';
import { ClientForm } from '../src/renderer/components/client/ClientForm.component';
import { theme } from '../src/renderer/theme/theme';

const Wrapper = (props: { children: React.ReactElement }) => (
  <>
    <CssBaseline />
    <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
  </>
);

storiesOf('Components/ClientForm', module).add('ClientForm', () => (
  <Wrapper>
    <ClientForm></ClientForm>
  </Wrapper>
));
