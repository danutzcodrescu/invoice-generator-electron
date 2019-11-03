import { ApolloProvider } from '@apollo/react-hooks';
import DateFnsUtils from '@date-io/date-fns';
import { NoSsr } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider as MaterialUIThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { HashRouter, Link, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import 'typeface-roboto';
import { InvoiceContainer } from '../containers/Invoice.container';
import { client } from '../graphql/client';
import { theme } from '../theme/theme';
import { InvoiceForm } from './invoices/InvoiceForm.component';

export const Application = () => {
  return (
    <>
      <CssBaseline />
      <NoSsr>
        <ApolloProvider client={client}>
          <ThemeProvider theme={theme}>
            <MaterialUIThemeProvider theme={theme}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <HashRouter>
                  <Switch>
                    <Route exact path="/invoiceForm">
                      <InvoiceForm />
                    </Route>
                    <Route exact path="/invoice">
                      <InvoiceContainer />
                    </Route>
                    <Route>
                      <button>
                        <Link to="/invoiceForm">New invoice</Link>
                      </button>
                    </Route>
                  </Switch>
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
