import { contextBridge, ipcRenderer } from "electron";

import { electronAPI } from "@electron-toolkit/preload";
import os from "os";
import { getUser, getUserBySlug } from "../backend/model/UserModel.js";
// Custom APIs for renderer
const api = {};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("electron", electronAPI);
    contextBridge.exposeInMainWorld("api", api);
    contextBridge.exposeInMainWorld("dir", { data: () => os.homedir() });
    // contextBridge.exposeInMainWorld("ipcRenderer", {
    //   send: (channel, data) => ipcRenderer.send(channel, data),
    //   on: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args)),
    //   once: (channel, func) => ipcRenderer.once(channel, (event, ...args) => func(...args)),
    //   removeListener: (channel, func) => ipcRenderer.removeListener(channel, (event, ...args) => func(...args)),
    //   removeAllListeners: (channel, func) => {
    //     ipcRenderer.removeAllListeners(channel);
    //   },
    // });

    contextBridge.exposeInMainWorld("users", {
      getUser: (args) => getUser(args),
      getUserBySlug: (args) => getUserBySlug(args),
    });
  } catch (error) {
    console.error(error);
  }
} else {
  window.electron = electronAPI;
  window.api = api;
}
