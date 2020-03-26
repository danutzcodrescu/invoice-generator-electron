import { app, BrowserWindow, ipcMain, shell } from 'electron';
import isDev from 'electron-is-dev';
import fs from 'fs';
import path from 'path';
import url from 'url';
import { Invoice } from '../../renderer/generated/graphql';
import { CREATE_PDF_EVENT, LOAD_PDF_DATA, OPEN_INVOICE } from '../events';

let pdfWindow: BrowserWindow | null;

export const invoicesPath = path.resolve(
  app.getPath('documents'),
  'invoices/invoices',
);

export function createInvoice(win: BrowserWindow) {
  ipcMain.on(CREATE_PDF_EVENT, (_, invoice: Invoice) => {
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
        invoiceNumber: invoice.invoiceNumber,
        client: invoice.clientData,
        profile: invoice.profileData,
      });
    });
  });

  ipcMain.on(
    LOAD_PDF_DATA,
    (_, data: Pick<Invoice, 'invoiceDate' | 'invoiceNumber'>) => {
      pdfWindow!.webContents
        .printToPDF({ pageSize: 'A4' })
        .then(async (resp) => {
          if (!fs.existsSync(invoicesPath)) {
            await fs.promises.mkdir(invoicesPath);
          }
          const documentPath = path.resolve(
            `${invoicesPath}/${data.invoiceNumber}-${data.invoiceDate}-invoice.pdf`,
          );
          try {
            await fs.promises.writeFile(documentPath, resp);
          } catch (e) {
            console.log(e);
          }
          pdfWindow!.close();
          pdfWindow = null;
          win.webContents.send(CREATE_PDF_EVENT, documentPath);
        });
    },
  );
}

export function openInvoice() {
  ipcMain.handle(
    OPEN_INVOICE,
    async (_, data: Pick<Invoice, 'invoiceDate' | 'invoiceNumber'>) => {
      const invoicePath = path.resolve(
        `${invoicesPath}/${data.invoiceNumber}-${data.invoiceDate}-invoice.pdf`,
      );
      if (fs.existsSync(invoicePath)) {
        shell.openItem(invoicePath);
        return true;
      }
      return false;
    },
  );
}
