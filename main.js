const { app, ipcMain, Notification } = require('electron');
const { BrowserWindow } = require('electron/main');
const path = require('path');

const isDev = !app.isPackaged;

let mainWindow;
const createWindow = () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      worldSafeExecuteJavaScript: true,
      preload: path.join(__dirname, 'preload.js'),
      backgroundColor: "gray",
    },
    fullscreen: true,
  });
  mainWindow.loadFile('index.html');
};
  
if (isDev) {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
  });
}

ipcMain.on('notify', (_, message) => {
  new Notification({
    title: 'Notification',
    body: message,
  }).show();
  console.log(message);
});

app.whenReady().then(createWindow);
