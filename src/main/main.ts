import { app, BrowserWindow, Session } from "electron";
import path from "path";
import os from 'os';

declare global {
  const MAIN_WINDOW_WEBPACK_ENTRY: string;
}
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: null | BrowserWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    title : "Medical Monitor",
    resizable: true,
    icon: './src/assests/logo01.png',
    maximizable: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: true
    },
  });

  /** Manage browser sessions, cookies, cache, proxy settings, etc */
  const ses = mainWindow.webContents.session;
  mainWindow.setMenuBarVisibility(false);
  /**add chrome dev tools */
  addReactDevTools(ses);

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  //mainWindow.removeMenu();

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);
// console.log(MAIN_WINDOW_WEBPACK_ENTRY.toString());

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

async function addReactDevTools(ses: Session) {
  const devToolsModulePath = path.join( os.homedir(),
  '.config/google-chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.24.6_0');
  await ses.loadExtension(devToolsModulePath);
}

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
