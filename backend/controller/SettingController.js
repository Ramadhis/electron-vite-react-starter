import "dotenv/config";
import { dialog } from "electron";
import sqlite3 from "better-sqlite3";
import { copyFile, constants } from "node:fs";
import { join } from "path";

export const selectDirectory = async (event, opts) => {
  return await dialog
    .showOpenDialog({
      properties: ["openDirectory"],
    })
    .then((result) => {
      console.log(result.filePaths);
      event.sender.send("directory:selected", { success: true, data: { directory: result.filePaths } });
    })
    .catch((err) => {
      console.log(err);
      event.sender.send("directory:selected", { success: false, data: null, errors: err });
    });
};

export const openFileFromDirectory = async (event, opts) => {
  return await dialog
    .showOpenDialog({ properties: ["openFile"], filters: [{ name: "Custom File Type", extensions: ["db", "sqlite", "sqlite3"] }] })
    .then((result) => {
      console.log(result.filePaths);
      event.sender.send("dbFile:selected", { success: true, data: { directory: result.filePaths } });
    })
    .catch((err) => {
      console.log(err);
      event.sender.send("dbFile:selected", { success: false, data: null, errors: err });
    });
};

export const backupDB = async (event, opts) => {
  const dbPath = process.env.NODE_ENV == "development" ? "./database/data.db" : join(process.resourcesPath, "./database/data.db");
  const db = sqlite3(dbPath);
  await db
    .backup(opts + `/backup-${Date.now()}.db`)
    .then((result) => {
      event.sender.send("backup:success", { success: true, data: null });
    })
    .catch((err) => {
      console.log("backup failed:", err);
      return event.sender.send("backup:success", { success: true, data: null });
    });

  // console.log(opts);
  // const dbPath = process.env.NODE_ENV == "development" ? "./database/data.db" : join(process.resourcesPath, "./database/data.db");
  // const dbPath = "./database/data.db";
  // console.log(dbPath);
  // const db = sqlite3(dbPath);
  // await db
  //   .backup(opts + `/backup-${Date.now()}.db`)
  //   .then(() => {
  //     console.log("backup complete!");
  //     // event.sender.send("backup:success", { success: true, data: null });
  //   })
  //   .catch((err) => {
  //     console.log("backup failed:", err);
  //   });
};

export const swapSqlite = async (event, opts) => {
  const dbPath = process.env.NODE_ENV == "development" ? "./database/data.db" : join(process.resourcesPath, "./database/data.db");
  copyFile(opts, dbPath, (err) => {
    if (err) throw event.sender.send("swap:success", { success: false, data: null, message: err });
    console.log("source was copied to destination");
    event.sender.send("swap:success", { success: true, data: null });
  });
};
