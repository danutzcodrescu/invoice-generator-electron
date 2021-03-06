import { ApolloProvider } from '@apollo/react-hooks';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider as MaterialUIProvider } from '@material-ui/core/styles';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import StoryRouter from 'storybook-react-router';
import { ThemeProvider } from 'styled-components';
import 'typeface-roboto';
import { ClientFormContainer } from '../src/renderer/containers/ClientForm.container';
import { ClientTableContainer } from '../src/renderer/containers/ClientTable.container';
import { client } from '../src/renderer/graphql/client';
import { theme } from '../src/renderer/theme/theme';

export const Wrapper = (props: { children: React.ReactElement }) => (
  <>
    <CssBaseline />
    <ApolloProvider client={client}>
      <MaterialUIProvider theme={theme}>
        <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
      </MaterialUIProvider>
    </ApolloProvider>
  </>
);

storiesOf('Components/Client', module)
  .addDecorator(StoryRouter())
  .add('ClientForm', () => (
    <Wrapper>
      <ClientFormContainer></ClientFormContainer>
    </Wrapper>
  ))
  .add('ClientTable', () => (
    <Wrapper>
      <ClientTableContainer />
    </Wrapper>
  ));
