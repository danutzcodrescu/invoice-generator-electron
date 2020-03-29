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
    title: null,
    validUntil: null,
    id: null,
  });

  function setData(_: Event, data: any) {
    setInvoice(data);
  }

  React.useEffect(() => {
    ipcRenderer.on(LOAD_PDF_DATA, setData);
    return () => {
      ipcRenderer.off(LOAD_PDF_DATA, setData);
    };
  }, []);

  React.useEffect(() => {
    if (invoice.invoiceDate) {
      ipcRenderer.send(LOAD_PDF_DATA, {
        invoiceDate: invoice.invoiceDate,
        ...((invoice as any).invoiceNumber
          ? { invoiceNumber: invoice.invoiceNumber }
          : {
              id: invoice.id,
            }),
      });
    }
  }, [invoice]);
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
      title={invoice.title as any}
      validUntil={invoice.validUntil as any}
      invoiceNumber={invoice.invoiceNumber}
      vatRuleName={invoice.vatRuleName}
    />
  );
}
