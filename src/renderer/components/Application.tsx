import { ipcRenderer } from 'electron';
import { createBrowserHistory } from 'history';
import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { Route, Router, Switch } from 'react-router-dom';
import { INVOICE_ROUTE } from '../../main/events';
import { InvoiceContainer } from '../containers/Invoice.container';
import { InvoiceForm } from './invoices/InvoiceForm.component';

const history = createBrowserHistory();

export const Application = () => {
  React.useEffect(() => {
    // for production use case when the page is loaded as html
    ipcRenderer.on(INVOICE_ROUTE, () => {
      history.push('/invoice');
    }),
      [];
  });
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/">
          <InvoiceForm />
        </Route>
        <Route exact path="/invoice">
          <InvoiceContainer />
        </Route>
      </Switch>
    </Router>
  );
};

export default hot(Application);
