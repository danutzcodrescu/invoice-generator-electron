import { ipcRenderer, shell } from 'electron';
import { CREATE_PDF_EVENT, OPEN_INVOICE } from '../../../main/events';
import { Invoice, Offer } from '../../generated/graphql';

export async function openInvoice(_: any, rowData: any) {
  const data = {
    invoiceDate: (rowData as Invoice).invoiceDate,
    ...((rowData as Invoice).invoiceNumber
      ? { invoiceNumber: (rowData as Invoice).invoiceNumber }
      : { id: (rowData as Offer).id }),
  };
  const resp = await ipcRenderer.invoke(OPEN_INVOICE, data);
  if (!resp) {
    ipcRenderer.send(CREATE_PDF_EVENT, rowData);
  }
}

export function openItem(_: any, path: string) {
  shell.openItem(path);
}
