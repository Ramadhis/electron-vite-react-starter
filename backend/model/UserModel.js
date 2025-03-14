import { db } from "../../database/connection.js";
import { DDMMYYYY } from "../helper/getDate.js";

const getUser = () => {
  const sql = `
    SELECT * from users order by id desc
  `;

  const row = db.prepare(sql).all();
  return row;
};

const createUser = (args) => {
  const stmt = db.prepare("INSERT INTO users (name, name_slug ,email, password, profile_picture, role, created_at, updated_at) VALUES (?, ?, ?, ? ,?, ?, ?, ?)");
  const info = stmt.run(args.name, args.name_slug, args.email, args.password, args.profile_picture ? args.profile_picture : "default.jpg", args.role, DDMMYYYY, DDMMYYYY);
  return info;
};

export { getUser, createUser };
