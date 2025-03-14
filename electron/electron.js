import "dotenv/config";
import { app, BrowserWindow, ipcMain, dialog } from "electron";
import path from "path";
import { join } from "path";
import isDev from "electron-is-dev";
import * as url from "url";
let mainWindow;
import { fileURLToPath } from "url";
import { submitAddUser } from "../backend/controller/UserController.js";
import { selectDirectory, backupDB, openFileFromDirectory, swapSqlite } from "../backend/controller/SettingController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: {
      preload: path.join(app.getAppPath(), "electron/preload.mjs"),
      contextIsolation: true,
      enableRemoteModule: true,
      nodeIntegration: true,
      sandbox: false,
    },
  });
  if (isDev) {
    mainWindow.loadURL("http://localhost:5173");
  } else {
    // mainWindow.loadFile(`file://${path.join(__dirname, "./index.html")}`);
    // mainWindow.loadFile(join(__dirname, "./index.html"));
    mainWindow.loadFile(join(app.getAppPath(), "dist/index.html"));
    // mainWindow.loadURL(
    //   url.format({
    //     pathname: join(app.getAppPath(), "dist/index.html"),
    //     protocol: "file:",
    //     slashes: true,
    //   })
    // );
  }
  mainWindow.webContents.openDevTools();
  mainWindow.on("closed", () => (mainWindow = null));
}

app.whenReady().then(() => {
  return createWindow();
});
app.on("window-all-closed", () => {
  // if (process.platform !== "darwin") {
  app.quit();
  // }
});
app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on("submit:addUser", (ev, opts) => {
  ev.preventDefault();
  submitAddUser(ev, opts);
});
ipcMain.on("submit:backup", (ev, opts) => backupDB(ev, opts));
ipcMain.on("submit:swapDb", (ev, opts) => swapSqlite(ev, opts));
ipcMain.on("selectDirectory", (ev, opt) => selectDirectory(ev, opt));
ipcMain.on("openFileFromDirectory", (ev, opt) => openFileFromDirectory(ev, opt));
