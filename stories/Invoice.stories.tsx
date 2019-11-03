import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Invoice } from '../src/renderer/components/invoices/Invoice.component';
import { InvoiceForm } from '../src/renderer/components/invoices/InvoiceForm.component';
import { Wrapper } from './ClientForm.stories';

const invoice = {
  id: 'f362c0c5-2ef9-444c-ba15-bfc266a8e5c5',
  invoiceDate: 'Sat, 02 Nov 2019 17:26:46 GMT',
  clientData:
    '{"firstName":"Danut","lastName":"Codrescu","company":"my comp","address":"test address","vat":"BE123456"}',
  profileData:
    '{"firstName":"Danut","lastName":"Codrescu","company":"saxzxz","address":"Rue Calvin 23, Box 1.1","vat":"212121"}',
  items: '[{"name":"xxxx","value":"11111"}]',
  vat: 2333.31,
  amount: 11111,
};

storiesOf('Components/InvoiceForm', module)
  .add('InvoiceForm', () => (
    <Wrapper>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <InvoiceForm />
      </MuiPickersUtilsProvider>
    </Wrapper>
  ))
  .add('Invoice', () => (
    <Wrapper>
      <Invoice
        invoiceDate={invoice.invoiceDate}
        items={JSON.parse(invoice.items)}
        vat={invoice.vat}
        amount={invoice.amount}
        client={JSON.parse(invoice.clientData)}
        profile={JSON.parse(invoice.profileData)}
        invoiceNumber={'12356'}
      />
    </Wrapper>
  ));
