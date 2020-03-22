import { ipcRenderer } from 'electron';
import * as React from 'react';
import { LOAD_PDF_DATA } from '../../main/events';
import { Invoice } from '../components/invoices/Invoice.component';

export function InvoiceContainer() {
  const [invoice, setInvoice] = React.useState({
    invoiceDate: '',
    items: [],
    vat: 0,
    amount: 0,
    client: null,
    profile: null,
    invoiceNumber: '',
    vatRuleName: '',
  });
  React.useEffect(() => {
    ipcRenderer.on(LOAD_PDF_DATA, (_, data: any) => {
      setInvoice(data);
    });
  }, []);
  return !invoice.profile ? (
    <p>No data loaded</p>
  ) : (
    <Invoice
      invoiceDate={invoice.invoiceDate}
      items={invoice.items}
      vat={invoice.vat}
      amount={invoice.amount}
      client={invoice.client!}
      profile={invoice.profile!}
      invoiceNumber={invoice.invoiceNumber}
      vatRuleName={invoice.vatRuleName}
    />
  );
}
