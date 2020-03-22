import { ApolloProvider } from '@apollo/react-hooks';
import DateFnsUtils from '@date-io/date-fns';
import { NoSsr } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider as MaterialUIThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import 'typeface-roboto';
import { client } from '../graphql/client';
import { theme } from '../theme/theme';
import { Routes } from './Routes';
import { Menu } from './toolbox/Menu.component';

export const Application = () => {
  if (window.location.hash.endsWith('invoice')) {
    return (
      <>
        <CssBaseline />
        <NoSsr>
          <ThemeProvider theme={theme}>
            <HashRouter>
              <Routes />
            </HashRouter>
          </ThemeProvider>
        </NoSsr>
      </>
    );
  }
  return (
    <>
      <CssBaseline />
      <NoSsr>
        <ApolloProvider client={client}>
          <ThemeProvider theme={theme}>
            <MaterialUIThemeProvider theme={theme}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <HashRouter>
                  <Menu>
                    <Routes />
                  </Menu>
                </HashRouter>
              </MuiPickersUtilsProvider>
            </MaterialUIThemeProvider>
          </ThemeProvider>
        </ApolloProvider>
      </NoSsr>
    </>
  );
};

export default hot(Application);
