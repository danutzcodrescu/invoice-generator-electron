import { ApolloProvider } from '@apollo/react-hooks';
import DateFnsUtils from '@date-io/date-fns';
import { NoSsr } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider as MaterialUIThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import 'typeface-roboto';
import { ClientDataContainer } from '../containers/ClientData.container';
import { ClientFormContainer } from '../containers/ClientForm.container';
import { ClientTableContainer } from '../containers/ClientTable.container';
import { ExpenseFormContainer } from '../containers/ExpenseForm.container';
import { ExpenseTableContainer } from '../containers/ExpenseTable.container';
import { InvoiceContainer } from '../containers/Invoice.container';
import { InvoiceTableContainer } from '../containers/InvoiceTable.container';
import { ProfileDataContainer } from '../containers/ProfileData.container';
import { ProfileTableContainer } from '../containers/ProfileTable.container';
import { client } from '../graphql/client';
import { theme } from '../theme/theme';
import { InvoiceForm } from './invoices/InvoiceForm.component';
import { Menu } from './utils/Menu.component';

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
                  <Menu>
                    <Switch>
                      <Route exact path="/invoiceForm">
                        <InvoiceForm />
                      </Route>
                      <Route exact path="/newExpense">
                        <ExpenseFormContainer />
                      </Route>
                      <Route exact path="/newClient">
                        <ClientFormContainer />
                      </Route>
                      <Route exact path="/invoice">
                        <InvoiceContainer />
                      </Route>
                      <Route exact path="/invoices">
                        <InvoiceTableContainer />
                      </Route>
                      <Route exact path="/clients">
                        <ClientTableContainer />
                      </Route>
                      <Route
                        exact
                        path="/clients/:clientId"
                        component={ClientDataContainer}
                      ></Route>
                      <Route
                        exact
                        path="/profiles/:profileId"
                        component={ProfileDataContainer}
                      ></Route>
                      <Route
                        exact
                        path="/profiles"
                        component={ProfileTableContainer}
                      />
                      <Route
                        exact
                        path="/expenses"
                        component={ExpenseTableContainer}
                      ></Route>
                    </Switch>
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
