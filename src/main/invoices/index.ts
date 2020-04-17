import { app, BrowserWindow, ipcMain, shell } from 'electron';
import isDev from 'electron-is-dev';
import fs from 'fs';
import path from 'path';
import url from 'url';
import { Invoice, Offer } from '../../renderer/generated/graphql';
import { CREATE_PDF_EVENT, LOAD_PDF_DATA, OPEN_INVOICE } from '../events';

let pdfWindow: BrowserWindow | null;

type ItemDetails =
  | Pick<Invoice, 'invoiceDate' | 'invoiceNumber'>
  | Pick<Offer, 'invoiceDate' | 'id'>;

export const invoicesPath = path.resolve(
  app.getPath('documents'),
  'invoices/invoices',
);

export const offersPath = path.resolve(
  app.getPath('documents'),
  'invoices/offers',
);

export function getPaths(data: ItemDetails) {
  const dirPath = (data as Invoice).invoiceNumber ? invoicesPath : offersPath;
  const title = (data as Invoice).invoiceNumber
    ? `${(data as Invoice).invoiceNumber.replace('/', '-')}-${
        data.invoiceDate
      }-invoice.pdf`
    : `${data.invoiceDate}-${(data as Offer).id}-offer.pdf`;
  const documentPath = path.resolve(`${dirPath}/${title}`);
  return { dirPath, documentPath };
}

export function loadInvoiceData(invoice: Invoice | Offer) {
  pdfWindow = new BrowserWindow({
    width: 1000,
    height: 660,
    webPreferences: {
      nodeIntegration: true,
    },
    show: false,
  });
  if (isDev) {
    pdfWindow.loadURL(`http://localhost:2003/#/invoice`);
  } else {
    pdfWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        hash: '#/invoice',
        slashes: true,
      }),
    );
  }
  pdfWindow.webContents.once('did-finish-load', () => {
    pdfWindow!.webContents.send(LOAD_PDF_DATA, {
      invoiceDate: invoice.invoiceDate,
      items: invoice.items,
      vat: invoice.vat,
      vatRuleName: invoice.vatRuleName,
      amount: invoice.amount,
      client: invoice.clientData,
      discount: invoice.discount,
      profile: invoice.profileData,
      ...((invoice as Invoice).invoiceNumber
        ? {
            invoiceNumber: (invoice as Invoice).invoiceNumber,
            title: 'Facture',
            paymentDeadline: (invoice as Invoice).paymentDeadline,
          }
        : {
            title: 'Devis',
            validUntil: (invoice as Offer).validUntil,
            id: invoice.id,
          }),
    });
  });
}

export function pdfInvoice(callback: Function) {
  ipcMain.once(LOAD_PDF_DATA, (_, data: ItemDetails) => {
    pdfWindow!.webContents.printToPDF({ pageSize: 'A4' }).then(async (resp) => {
      const { dirPath, documentPath } = getPaths(data);
      if (!fs.existsSync(dirPath)) {
        await fs.promises.mkdir(dirPath);
      }
      try {
        await fs.promises.writeFile(documentPath, resp);
      } catch (e) {
        console.log(e);
      }
      pdfWindow!.close();
      pdfWindow = null;
      callback(documentPath);
    });
  });
}

export function createInvoice(win: BrowserWindow) {
  ipcMain.on(CREATE_PDF_EVENT, (_, invoice: Invoice | Offer) => {
    loadInvoiceData(invoice);
    pdfInvoice((path: string) => win.webContents.send(CREATE_PDF_EVENT, path));
  });
}

export function openInvoice() {
  ipcMain.handle(OPEN_INVOICE, async (_, data: ItemDetails) => {
    const { documentPath } = getPaths(data);
    if (fs.existsSync(documentPath)) {
      shell.openItem(documentPath);
      return true;
    }
    return false;
  });
}
