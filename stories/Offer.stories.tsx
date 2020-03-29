import DateFnsUtils from '@date-io/date-fns';
import { Paper } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Invoice } from '../src/renderer/components/invoices/Invoice.component';
import { OfferFormContainer } from '../src/renderer/containers/OfferForm.container';
import { OfferTableContainer } from '../src/renderer/containers/OfferTable.container';
import { Wrapper } from './Client.stories';
import { offer } from './invoice.mocks';

storiesOf('Components/offers', module)
  .addDecorator((story) => (
    <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
  ))
  .add('OfferForm', () => (
    <Wrapper>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Paper>
          <OfferFormContainer />
        </Paper>
      </MuiPickersUtilsProvider>
    </Wrapper>
  ))
  .add('Offer template', () => (
    <Wrapper>
      <Invoice
        invoiceDate={offer.invoiceDate}
        items={offer.items}
        vat={offer.vat}
        amount={offer.amount}
        client={offer.clientData}
        profile={offer.profileData}
        validUntil={offer.validUntil}
        vatRuleName={offer.vatRuleName}
        title="Devis"
      />
    </Wrapper>
  ))
  .add('OffersTable', () => (
    <Wrapper>
      <Paper>
        <OfferTableContainer />
      </Paper>
    </Wrapper>
  ));
