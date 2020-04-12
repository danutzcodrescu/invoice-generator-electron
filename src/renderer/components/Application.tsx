import { ApolloProvider } from '@apollo/react-hooks';
import DateFnsUtils from '@date-io/date-fns';
import { NoSsr } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider as MaterialUIThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import en from 'date-fns/locale/en-GB';
import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import 'typeface-roboto';
import { NotificationProvider } from '../context/notification.context';
import { client } from '../graphql/client';
import { theme } from '../theme/theme';
import { Notification } from './notification/Notification.component';
import { Routes } from './Routes';
import { Menu } from './toolbox/Menu.component';
export const Application = () => {
  if (window.location.hash.endsWith('invoice')) {
    return (
      <>
        <CssBaseline />
        <NoSsr>
          <ThemeProvider theme={theme}>
            <MaterialUIThemeProvider theme={theme}>
              <HashRouter>
                <Routes />
              </HashRouter>
            </MaterialUIThemeProvider>
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
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={en}>
                <NotificationProvider>
                  <Notification />
                  <HashRouter>
                    <Menu>
                      <Routes />
                    </Menu>
                  </HashRouter>
                </NotificationProvider>
              </MuiPickersUtilsProvider>
            </MaterialUIThemeProvider>
          </ThemeProvider>
        </ApolloProvider>
      </NoSsr>
    </>
  );
};

export default hot(Application);
