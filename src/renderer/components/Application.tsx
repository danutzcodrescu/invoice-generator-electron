import { ApolloProvider } from '@apollo/react-hooks';
import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { ClientFormContainer } from '../containers/ClientForm.container';
import { client } from '../graphql/client';

export const Application = () => {
  return (
    <ApolloProvider client={client}>
      <ClientFormContainer></ClientFormContainer>
    </ApolloProvider>
  );
};

export default hot(Application);
