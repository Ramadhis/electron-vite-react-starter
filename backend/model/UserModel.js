import { db } from "../../database/connection.js";

const getUser = () => {
  const sql = `
    SELECT * from users
  `;

  const row = db.prepare(sql).all();
  return row;
};

const backup = async () => {
  const fs = require("fs");
  // await db
  //   .backup(`D:\backup-${Date.now()}.db`)
  //   .then(() => {
  //     console.log("backup complete!");
  //   })
  //   .catch((err) => {
  //     console.log("backup failed:", err);
  //   });
  fs.copyFile("./database/data.db", "D:dataBackup.js", (err) => {
    if (err) throw err;
    console.log("source.txt was copied to destination.txt");
  });
};

export { getUser, backup };
