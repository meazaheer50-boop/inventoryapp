const { app, BrowserWindow, shell, session, Menu } = require('electron');
const path = require('path');
const { autoUpdater } = require('electron-updater');

if (!app.requestSingleInstanceLock()) app.quit();
let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1366, height: 860, minWidth: 420, minHeight: 600,
    backgroundColor: '#f6f1e9', autoHideMenuBar: true,
    icon: path.join(__dirname, 'build', 'icon.png'),
    webPreferences: { contextIsolation: true, sandbox: true }
  });
  win.loadFile(path.join(__dirname, 'app', 'index.html'));
  // Zoho Books and other web links open in the normal browser, never inside the app window.
  win.webContents.setWindowOpenHandler(({ url }) => { if (/^https?:/i.test(url)) shell.openExternal(url); return { action: 'deny' }; });
  win.webContents.on('will-navigate', (e, url) => { if (!url.startsWith('file:')) { e.preventDefault(); if (/^https?:/i.test(url)) shell.openExternal(url); } });
}

app.on('second-instance', () => { if (win) { if (win.isMinimized()) win.restore(); win.focus(); } });

app.whenReady().then(() => {
  // Google Apps Script replies do not always carry CORS headers for a local (file://) page.
  session.defaultSession.webRequest.onHeadersReceived(
    { urls: ['https://script.google.com/*', 'https://*.googleusercontent.com/*'] },
    (d, cb) => {
      const h = {};
      for (const k of Object.keys(d.responseHeaders)) if (k.toLowerCase() !== 'access-control-allow-origin') h[k] = d.responseHeaders[k];
      h['Access-Control-Allow-Origin'] = ['*'];
      cb({ responseHeaders: h });
    }
  );
  Menu.setApplicationMenu(null);
  createWindow();
  if (app.isPackaged) {
    const check = () => autoUpdater.checkForUpdatesAndNotify().catch(() => {});
    check();
    setInterval(check, 6 * 60 * 60 * 1000);
  }
});

app.on('window-all-closed', () => app.quit());
