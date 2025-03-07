import { db } from "../../database/connection.js";

const getUser = () => {
  const sql = `
    SELECT * from users
  `;

  const row = db.prepare(sql).all();
  return row;
};

export { getUser };
