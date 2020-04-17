import DateFnsUtils from '@date-io/date-fns';
import { Paper } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import StoryRouter from 'storybook-react-router';
import { Invoice } from '../src/renderer/components/invoices/Invoice.component';
import { InvoiceFormContainer } from '../src/renderer/containers/InvoiceForm.container';
import { InvoiceTableContainer } from '../src/renderer/containers/InvoiceTable.container';
import { Wrapper } from './Client.stories';
import { invoiceWithoutQuantity, invoiceWithQuantity } from './invoice.mocks';

storiesOf('Components/invoices', module)
  .addDecorator(StoryRouter())
  .add('InvoiceForm', () => (
    <Wrapper>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Paper>
          <InvoiceFormContainer />
        </Paper>
      </MuiPickersUtilsProvider>
    </Wrapper>
  ))
  .add('Invoice with quantity', () => (
    <Wrapper>
      <Invoice
        invoiceDate={invoiceWithQuantity.invoiceDate}
        items={invoiceWithQuantity.items}
        vat={invoiceWithQuantity.vat}
        amount={invoiceWithQuantity.amount}
        client={invoiceWithQuantity.clientData}
        profile={invoiceWithQuantity.profileData}
        invoiceNumber={invoiceWithQuantity.invoiceNumber}
        vatRuleName={invoiceWithQuantity.vatRuleName}
        title="Facture"
        deadline={invoiceWithQuantity.paymentDeadline}
        discount={invoiceWithQuantity.discount}
      />
    </Wrapper>
  ))
  .add('Invoice with no quantity', () => (
    <Wrapper>
      <Invoice
        invoiceDate={invoiceWithoutQuantity.invoiceDate}
        items={invoiceWithoutQuantity.items}
        vat={invoiceWithoutQuantity.vat}
        amount={invoiceWithoutQuantity.amount}
        client={invoiceWithoutQuantity.clientData}
        profile={invoiceWithoutQuantity.profileData}
        invoiceNumber={invoiceWithoutQuantity.invoiceNumber}
        vatRuleName={invoiceWithoutQuantity.vatRuleName}
        title="Facture"
        deadline={invoiceWithoutQuantity.paymentDeadline}
        discount={0}
      />
    </Wrapper>
  ))
  .add('InvoiceTable', () => (
    <Wrapper>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Paper>
          <InvoiceTableContainer />
        </Paper>
      </MuiPickersUtilsProvider>
    </Wrapper>
  ));
