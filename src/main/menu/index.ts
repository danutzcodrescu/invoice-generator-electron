import { Menu, app } from 'electron';

export function setMenu() {
  if (process.env.NODE_ENV === 'production') {
    const template = [
      {
        label: app.name,
        submenu: [
          {
            label: `Quit ${app.name}`,
            accelerator: 'CmdOrCtrl+Q',
            click() {
              app.quit();
            },
          },
        ],
      },
      {
        label: 'Edit',
        submenu: [
          { role: 'undo' },
          { role: 'redo' },
          { role: 'cut' },
          { role: 'copy' },
          { role: 'paste' },
          { role: 'selectall' },
        ],
      },
      {
        label: 'View',
        submenu: [
          {
            role: 'reload',
          },
          {
            role: 'forcereload',
          },
          {
            role: 'toggledevtools',
          },
          {
            type: 'separator',
          },
          {
            role: 'resetzoom',
          },
          {
            role: 'zoomin',
          },
          {
            role: 'zoomout',
          },
          {
            type: 'separator',
          },
          {
            role: 'togglefullscreen',
          },
        ],
      },
      {
        role: 'window',
        submenu: [
          {
            role: 'minimize',
          },
          {
            role: 'close',
          },
        ],
      },
    ];
    const menu = Menu.buildFromTemplate(template as any);
    Menu.setApplicationMenu(menu);
  }
}
