import { db } from "../../database/connection.js";
import { DDMMYYYY } from "../helper/getDate.js";

const getUserByEmail = (args) => {
  const stmt = db.prepare("SELECT name,name_slug,email,password,profile_picture,role,created_at from users where email = :email");
  const info = stmt.bind({ email: args.email }).get();
  return info;
};

const getUserBySlug = (args) => {
  const stmt = db.prepare("SELECT name,name_slug,email,profile_picture,role,created_at from users where name_slug = :name_slug");
  const info = stmt.bind({ name_slug: args.name_slug }).get();
  return info;
};

const getUser = (args) => {
  // const sql = `
  //   SELECT * from users order by id desc
  // `;

  // const row = db.prepare(sql).all();
  // return row;
  const currentPage = args.currentPage;
  const limitPerPage = 2;
  const offset = (currentPage - 1) * limitPerPage;

  let query = "SELECT * from users order by id desc limit :limitPerPage offset :offset";
  const stmt = db.prepare(query);
  const info = stmt.bind({ limitPerPage: limitPerPage, offset: offset }).all();
  return info;
};

const deleteUsers = (args) => {
  const stmt = db.prepare("delete from users where name_slug=(?)");
  const info = stmt.run(args.name_slug);
  return info;
};

const updateUsers = (args) => {
  const stmt = db.prepare("update users set name=(?),name_slug=(?),email=(?),role=(?) where name_slug=(?)");
  const info = stmt.run(args.name, args.name_slug, args.email, args.role, args.old_name_slug);
  return info;
};

const createUser = (args) => {
  const stmt = db.prepare("INSERT INTO users (name, name_slug ,email, password, profile_picture, role, created_at, updated_at) VALUES (?, ?, ?, ? ,?, ?, ?, ?)");
  const info = stmt.run(args.name, args.name_slug, args.email, args.password, args.profile_picture ? args.profile_picture : "default.jpg", args.role, DDMMYYYY, DDMMYYYY);
  return info;
};

export { getUser, createUser, deleteUsers, updateUsers, getUserByEmail, getUserBySlug };
