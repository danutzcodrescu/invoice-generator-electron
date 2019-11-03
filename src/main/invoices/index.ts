export function createInvoice() {
  let pdfWindow: BrowserWindow | null = new BrowserWindow({
    width: 1000,
    height: 660,
    webPreferences: {
      nodeIntegration: true,
    },
    show: false,
  });
  if (isDev) {
    pdfWindow.loadURL(`http://localhost:2003/invoice`);
  } else {
    pdfWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true,
      }),
    );
  }
  pdfWindow.webContents.once('did-finish-load', () => {
    if (!isDev) {
      pdfWindow!.webContents.send(INVOICE_ROUTE);
    }
    pdfWindow!.webContents.send(LOAD_PDF_DATA, {
      invoiceDate: invoice.invoiceDate,
      items: JSON.parse(invoice.items),
      vat: invoice.vat,
      amount: invoice.amount,
      invoiceNumber: invoice.invoiceNumber,
      client: JSON.parse(invoice.clientData),
      profile: JSON.parse(invoice.profileData),
    });
    pdfWindow!.webContents.printToPDF({ pageSize: 'A4' }).then(resp => {
      if (
        !fs.existsSync(
          path.resolve(app.getPath('documents'), 'invoices/invoices'),
        )
      ) {
        fs.mkdirSync(
          path.resolve(app.getPath('documents'), 'invoices/invoices'),
        );
      }

      fs.writeFile(
        path.resolve(
          app.getPath('documents'),
          `invoices/invoices/${invoice.invoiceNumber}-${format(
            new Date(invoice.invoiceDate),
            'yyyy-MM-dd',
          )}-invoice.pdf`,
        ),
        resp,
        err => {
          if (err) {
            console.log(err);
          } else {
            console.log('created');
            pdfWindow!.close();
            pdfWindow = null;
          }
        },
      );
    });
  });
}
