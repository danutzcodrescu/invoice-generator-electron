import AdmZip from 'adm-zip';
import { format } from 'date-fns';
import { app, ipcMain } from 'electron';
import * as Excel from 'exceljs';
import fs from 'fs';
import path from 'path';
import { ClientData, Expense, Invoice } from '../../renderer/generated/graphql';
import { EXPORT_DATA } from '../events';
import { getPaths, loadInvoiceData, pdfInvoice } from '../invoices/index';

interface Data {
  invoices: Invoice[];
  expenses: Expense[];
}

function clientName(client: ClientData) {
  return client.company
    ? client.company
    : `${client.firstName} ${client.lastName}`;
}

export function exportData() {
  ipcMain.on(EXPORT_DATA, async (event, data: Data) => {
    if (
      !fs.existsSync(path.resolve(app.getPath('documents'), 'invoices/exports'))
    ) {
      await fs.promises.mkdir(
        path.resolve(app.getPath('documents'), 'invoices/exports'),
      );
    }
    const workbook = new Excel.Workbook();
    const invoicesSheet = workbook.addWorksheet('Factures');
    const expensesSheet = workbook.addWorksheet('Depenses');
    invoicesSheet.addTable({
      name: 'Factures',
      ref: 'C4',
      style: {
        theme: 'TableStyleMedium14',
      },
      columns: [
        { name: 'Date', filterButton: true },
        { name: 'Numero', filterButton: true },
        { name: 'Client', filterButton: true },
        { name: 'Montant hors TVA' },
        { name: 'TVA' },
      ],
      rows: data.invoices.map((invoice) => [
        invoice.invoiceDate,
        invoice.invoiceNumber,
        clientName(invoice.clientData),
        invoice.amount,
        invoice.vat,
      ]),
    });
    expensesSheet.addTable({
      name: 'Depenses',
      ref: 'C4',
      style: {
        theme: 'TableStyleMedium14',
      },
      columns: [
        { name: 'Date', filterButton: true },
        { name: 'Numero', filterButton: true },
        { name: 'Client', filterButton: true },
        { name: 'Montant hors TVA' },
        { name: 'TVA' },
      ],
      rows: data.expenses.map((expense) => [
        expense.invoiceDate,
        expense.invoiceNumber,
        expense.amount,
        expense.vat,
      ]),
    });
    const excelPath = path.resolve(
      app.getPath('documents'),
      'invoices/exports',
      'export.xlsx',
    );
    await workbook.xlsx.writeFile(excelPath);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    createInvoice(data.invoices, 0, [], event, excelPath);
  });
}

function checkIfInvoiceExists(invoice: Invoice) {
  const { documentPath, dirPath } = getPaths(invoice);
  if (fs.existsSync(path.resolve(dirPath, documentPath))) {
    return path.resolve(dirPath, documentPath);
  }
  return undefined;
}

function archiveExcelAndInvoices(
  paths: string[],
  event: Electron.IpcMainEvent,
) {
  const zip = new AdmZip();
  paths.forEach((path) => {
    zip.addLocalFile(path);
  });
  const zipPath = path.resolve(
    app.getPath('documents'),
    'invoices/exports',
    `${format(new Date(), 'yyyy-MM-dd')}-export.zip`,
  );
  zip.writeZip(zipPath, () => {
    fs.promises.unlink(paths[paths.length - 1]);
    event.reply(
      EXPORT_DATA,
      path.resolve(app.getPath('documents'), 'invoices/exports'),
    );
  });
}

function createInvoice(
  invoices: Invoice[],
  index: number,
  arr: string[],
  event: Electron.IpcMainEvent,
  excelPath: string,
): any {
  if (invoices.length !== arr.length) {
    const path = checkIfInvoiceExists(invoices[index]);
    if (path) {
      arr.push(path);
      return createInvoice(invoices, index + 1, arr, event, excelPath);
    } else {
      loadInvoiceData(invoices[index]);
      return pdfInvoice((path: string) => {
        arr.push(path);
        createInvoice(invoices, index + 1, arr, event, excelPath);
      });
    }
  }
  arr.push(excelPath);
  archiveExcelAndInvoices(arr, event);
}
