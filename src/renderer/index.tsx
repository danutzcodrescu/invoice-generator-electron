import { ApolloProvider } from '@apollo/react-hooks';
import DateFnsUtils from '@date-io/date-fns';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider as MaterialUIThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { ThemeProvider } from 'styled-components';
import 'typeface-roboto';
import { Application } from './components/Application';
import { client } from './graphql/client';
import { theme } from './theme/theme';

const render = (Component: () => JSX.Element) => {
  ReactDOM.render(
    <AppContainer>
      <>
        <CssBaseline />
        <ApolloProvider client={client}>
          <MaterialUIThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <ThemeProvider theme={theme}>
                <Component />
              </ThemeProvider>
            </MuiPickersUtilsProvider>
          </MaterialUIThemeProvider>
        </ApolloProvider>
      </>
    </AppContainer>,
    document.querySelector('#app'),
  );
};

render(Application);
