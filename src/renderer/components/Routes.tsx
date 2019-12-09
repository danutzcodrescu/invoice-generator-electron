import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ClientDataContainer } from '../containers/ClientData.container';
import { ClientFormContainer } from '../containers/ClientForm.container';
import { ClientTableContainer } from '../containers/ClientTable.container';
import { ExpenseFormContainer } from '../containers/ExpenseForm.container';
import { ExpenseTableContainer } from '../containers/ExpenseTable.container';
import { InvoiceContainer } from '../containers/Invoice.container';
import { InvoiceTableContainer } from '../containers/InvoiceTable.container';
import { ProfileDataContainer } from '../containers/ProfileData.container';
import { ProfileFormContainer } from '../containers/ProfileForm.container';
import { ProfileTableContainer } from '../containers/ProfileTable.container';
import { InvoiceForm } from './invoices/InvoiceForm.component';

export function Routes() {
  return (
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
      <Route exact path="/newProfile">
        <ProfileFormContainer />
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
      <Route exact path="/profiles" component={ProfileTableContainer} />
      <Route exact path="/expenses" component={ExpenseTableContainer}></Route>
    </Switch>
  );
}
