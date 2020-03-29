import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ClientDataContainer } from '../containers/ClientData.container';
import { ClientFormContainer } from '../containers/ClientForm.container';
import { ClientTableContainer } from '../containers/ClientTable.container';
import { ExpenseFormContainer } from '../containers/ExpenseForm.container';
import { ExpenseTableContainer } from '../containers/ExpenseTable.container';
import { InvoiceContainer } from '../containers/Invoice.container';
import { InvoiceFormContainer } from '../containers/InvoiceForm.container';
import { InvoiceTableContainer } from '../containers/InvoiceTable.container';
import { OfferFormContainer } from '../containers/OfferForm.container';
import { OfferTableContainer } from '../containers/OfferTable.container';
import { ProfileDataContainer } from '../containers/ProfileData.container';
import { ProfileFormContainer } from '../containers/ProfileForm.container';
import { ProfileTableContainer } from '../containers/ProfileTable.container';
import { ServiceFormContainer } from '../containers/ServiceForm.container';
import { ServicesTableContainer } from '../containers/ServiceTable.container';
import { VATFormContainer } from '../containers/VatRuleForm.container';
import { VatTableContainer } from '../containers/VatTable.container';

export function Routes() {
  return (
    <Switch>
      <Route exact path="/invoiceForm">
        <InvoiceFormContainer />
      </Route>
      <Route exact path="/newOffer">
        <OfferFormContainer />
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
      <Route exact path="/offers">
        <OfferTableContainer />
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
      <Route exact path="/vatrules" component={VatTableContainer}></Route>
      <Route exact path="/newVat" component={VATFormContainer}></Route>
      <Route exact path="/newService" component={ServiceFormContainer}></Route>
      <Route exact path="/services" component={ServicesTableContainer}></Route>
    </Switch>
  );
}
