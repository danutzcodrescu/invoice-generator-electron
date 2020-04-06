import { ChildProcess, fork } from 'child_process';
import { app, BrowserWindow } from 'electron';
import isDev from 'electron-is-dev';
import * as path from 'path';
import * as url from 'url';
import { checkForUpdates } from './autoupdater';
import { exportData } from './export';
import { createInvoice, openInvoice } from './invoices';
import { init } from '@sentry/electron/dist/main';
import { SENTRY_DSN } from '../backend/constants';
import { setMenu } from './menu';

let win: BrowserWindow | null;
let serverProcess: ChildProcess;
if (process.env.NODE_ENV === 'production') {
  init({
    dsn: SENTRY_DSN,
    enableNative: false,
    release: `${app.name}_${app.getVersion()}`,
  });
}

const installExtensions = async () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map((name) => installer.default(installer[name], forceDownload)),
  ).catch(console.log);
};

function startBEforFE() {
  if (isDev) {
    const serverWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: { nodeIntegration: true },
      fullscreen: true,
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
    fullscreen: true,
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

  createInvoice(win);
};

app.on('ready', () => {
  createWindow();
  startBEforFE();
  setMenu();
  openInvoice();
  exportData();
  checkForUpdates();
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
