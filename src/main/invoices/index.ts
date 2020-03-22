import { format } from 'date-fns';
import { app, BrowserWindow } from 'electron';
import isDev from 'electron-is-dev';
import fs from 'fs';
import path from 'path';
import url from 'url';
import { Invoice } from '../../renderer/generated/graphql';
import { LOAD_PDF_DATA } from '../events';

export function createInvoice(invoice: Invoice) {
  let pdfWindow: BrowserWindow | null = new BrowserWindow({
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
      amount: invoice.amount,
      invoiceNumber: invoice.invoiceNumber,
      client: invoice.clientData,
      profile: invoice.profileData,
    });
    pdfWindow!.webContents.printToPDF({ pageSize: 'A4' }).then(async (resp) => {
      if (
        !fs.existsSync(
          path.resolve(app.getPath('documents'), 'invoices/invoices'),
        )
      ) {
        await fs.promises.mkdir(
          path.resolve(app.getPath('documents'), 'invoices/invoices'),
        );
      }
      const documentPath = path.resolve(
        app.getPath('documents'),
        `invoices/invoices/${invoice.invoiceNumber}-${format(
          new Date(invoice.invoiceDate),
          'yyyy-MM-dd',
        )}-invoice.pdf`,
      );
      try {
        await fs.promises.writeFile(documentPath, resp);
      } catch (e) {
        console.log(e);
      }
      pdfWindow!.close();
      pdfWindow = null;
      console.log(documentPath);
      return documentPath;
    });
  });
}
