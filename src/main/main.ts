import { ChildProcess, fork } from 'child_process';
import { app, BrowserWindow, ipcMain } from 'electron';
import isDev from 'electron-is-dev';
import * as path from 'path';
import * as url from 'url';
import { Invoice } from '../renderer/generated/graphql';
import { CREATE_PDF_EVENT } from './events';
import { createInvoice } from './invoices';

let win: BrowserWindow | null;
let serverProcess: ChildProcess;

const installExtensions = async () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload)),
  ).catch(console.log);
};

function startBEforFE() {
  if (isDev) {
    const serverWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: { nodeIntegration: true },
    });
    serverWindow.loadURL('http://localhost:4000');
  } else {
    serverProcess = fork(path.resolve(__dirname, './server.js'), [
      `${app.getPath('documents')}/invoices/database`,
    ]);
    serverProcess.on('message', console.log);
  }
}

const createWindow = async () => {
  if (isDev) {
    await installExtensions();
  }

  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      allowRunningInsecureContent: false,
    },
  });

  if (isDev) {
    process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1';
    win.loadURL(`http://localhost:2003`);
  } else {
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true,
      }),
    );
  }

  if (isDev) {
    // Open DevTools, see https://github.com/electron/electron/issues/12438 for why we wait for dom-ready
    win.webContents.once('dom-ready', () => {
      win!.webContents.openDevTools();
    });
  }

  win.on('closed', () => {
    win = null;
    if (!isDev && serverProcess) {
      serverProcess.kill();
    }
  });
};

app.on('ready', () => {
  createWindow();
  startBEforFE();

  ipcMain.on(CREATE_PDF_EVENT, (_, invoice: Invoice) => {
    createInvoice(invoice);
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
