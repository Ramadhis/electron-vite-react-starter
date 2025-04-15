import "dotenv/config";
import { dialog, session, Notification } from "electron";
import sqlite3 from "better-sqlite3";
import { copyFile, constants } from "node:fs";
import { join } from "path";
import { authCheck } from "../middleware/session.check.js";
import logging from "electron-log/main.js";

export const selectDirectory = async (event, opts) => {
  return await dialog
    .showOpenDialog({
      properties: ["openDirectory"],
    })
    .then((result) => {
      // console.log(result.filePaths);
      event.sender.send("directory:selected", { success: true, data: { directory: result.filePaths } });
    })
    .catch((err) => {
      // console.log(err);
      logging.error(err.message);
      event.sender.send("directory:selected", { success: false, data: null, errors: err.message });
    });
};

export const openFileFromDirectory = async (event, opts) => {
  return await dialog
    .showOpenDialog({ properties: ["openFile"], filters: [{ name: "Custom File Type", extensions: ["db", "sqlite", "sqlite3"] }] })
    .then((result) => {
      // console.log(result.filePaths);
      event.sender.send("dbFile:selected", { success: true, data: { directory: result.filePaths } });
    })
    .catch((err) => {
      logging.error(err.message);
      event.sender.send("dbFile:selected", { success: false, data: null, errors: err.message });
    });
};

export const backupDB = async (event, opts) => {
  authCheck(
    async (cookie) => {
      const dbPath = process.env.NODE_ENV == "development" ? "./database/data.db" : join(process.resourcesPath, "./database/data.db");
      const db = sqlite3(dbPath);
      const dbName = `/backup-${Date.now()}.db`;
      const dbLocation = opts + dbName;
      await db
        .backup(dbLocation)
        .then((result) => {
          // console.log(result);
          // return event.sender.send("backup:success", { success: true, data: result, message: `backups stored in ${dbLocation}` });          const NOTIFICATION_TITLE = "Swap Success";
          const NOTIFICATION_TITLE = "backups Success";
          const NOTIFICATION_BODY = `backups stored in ${dbLocation}`;

          return new Notification({
            title: NOTIFICATION_TITLE,
            body: NOTIFICATION_BODY,
          }).show();
        })
        .catch((err) => {
          console.log("backup failed:", err);
          logging.error(err.message);
          return event.sender.send("backup:success", { success: false, data: null, message: err.message });
        });
    },
    () => {
      event.sender.send("backup:success", { success: false, data: null, message: "You must login to use this feature" });
    },
    (err) => {
      console.error(err);
      logging.error(err);
    }
  );
};

export const swapSqlite = async (event, opts) => {
  //custom auth check, authCheck(accept,reject,error)
  authCheck(
    (cookie) => {
      // console.log(cookie);
      const dbPath = process.env.NODE_ENV == "development" ? "./database/data.db" : join(process.resourcesPath, "./database/data.db");
      copyFile(opts, dbPath, (err) => {
        if (err) throw event.sender.send("swap:success", { success: false, data: null, message: err });
        console.log("source was copied to destination");
        // event.sender.send("swap:success", { success: true, data: null, message: "swap success, close the application and then run it again" });
        const NOTIFICATION_TITLE = "Swap Success";
        const NOTIFICATION_BODY = "close the application and then run it again";

        return new Notification({
          title: NOTIFICATION_TITLE,
          body: NOTIFICATION_BODY,
        }).show();
      });
    },
    () => {
      event.sender.send("swap:success", { success: false, data: null, message: "You must login to use this feature" });
    },
    (err) => {
      console.error(err);
      logging.error(err);
    }
  );
};
