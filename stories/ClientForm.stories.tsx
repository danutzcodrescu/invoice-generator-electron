import { ApolloProvider } from '@apollo/react-hooks';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider as MaterialUIProvider } from '@material-ui/core/styles';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import 'typeface-roboto';
import { ClientFormContainer } from '../src/renderer/containers/ClientForm.container';
import { client } from '../src/renderer/graphql/client';
import { theme } from '../src/renderer/theme/theme';

const Wrapper = (props: { children: React.ReactElement }) => (
  <>
    <CssBaseline />
    <MaterialUIProvider theme={theme}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </MaterialUIProvider>
  </>
);

storiesOf('Components/ClientForm', module).add('ClientForm', () => (
  <Wrapper>
    <ApolloProvider client={client}>
      <ClientFormContainer></ClientFormContainer>
    </ApolloProvider>
  </Wrapper>
));
