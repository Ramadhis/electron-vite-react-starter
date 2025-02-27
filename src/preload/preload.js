import { contextBridge, ipcRenderer } from "electron";
import os from "os";

// Custom APIs for renderer
const api = {};

contextBridge.exposeInMainWorld("api", api);
contextBridge.exposeInMainWorld("dir", { data: () => os.homedir() });
contextBridge.exposeInMainWorld("ipcRenderer", {
  send: (channel, data) => ipcRenderer.send(channel, data),
  on: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args)),
});
