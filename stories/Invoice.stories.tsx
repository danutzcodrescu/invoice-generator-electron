import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { InvoiceForm } from '../src/renderer/components/invoices/InvoiceForm.component';
import { Wrapper } from './ClientForm.stories';

storiesOf('Components/InvoiceForm', module).add('InvoiceForm', () => (
  <Wrapper>
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <InvoiceForm />
    </MuiPickersUtilsProvider>
  </Wrapper>
));
