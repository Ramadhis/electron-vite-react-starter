import { dialog } from "electron";
import sqlite3 from "better-sqlite3";
import { copyFile, constants } from "node:fs";

export const selectDirectory = async (ev, opts) => {
  return await dialog
    .showOpenDialog({
      properties: ["openDirectory"],
    })
    .then((result) => {
      console.log(result.filePaths);
      ev.sender.send("directory:selected", { success: true, data: { directory: result.filePaths } });
    })
    .catch((err) => {
      console.log(err);
      ev.sender.send("directory:selected", { success: false, data: null, errors: err });
    });
};

export const openFileFromDirectory = async (ev, opts) => {
  return await dialog
    .showOpenDialog({ properties: ["openFile"], filters: [{ name: "Custom File Type", extensions: ["db", "sqlite", "sqlite3"] }] })
    .then((result) => {
      console.log(result.filePaths);
      ev.sender.send("dbFile:selected", { success: true, data: { directory: result.filePaths } });
    })
    .catch((err) => {
      console.log(err);
      ev.sender.send("dbFile:selected", { success: false, data: null, errors: err });
    });
};

export const backupDB = async (event, opts) => {
  // console.log(opts);
  const dbPath = "./database/data.db";
  const db = sqlite3(dbPath);
  await db.backup(opts + `/data.db`);
  ev.sender.send("backup:success", { success: true, data: null });
};

export const swapSqlite = async (event, opts) => {
  copyFile(opts, "./database/data.db", (err) => {
    if (err) throw ev.sender.send("backup:success", { success: false, data: null });
    console.log("source was copied to destination");
    ev.sender.send("swap:success", { success: true, data: null });
  });
};
