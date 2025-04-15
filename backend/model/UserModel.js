import { db } from "../../database/connection.js";
import { DDMMYYYY } from "../helper/getDate.js";

const getUserFullDataBySlug = (args) => {
  const stmt = db.prepare("SELECT * from users where name_slug = :name_slug");
  const info = stmt.bind({ name_slug: args.name_slug }).get();
  return info;
};

const getUserByEmail = (args) => {
  const stmt = db.prepare("SELECT name,name_slug,email,password,profile_picture,role,created_at from users where email = :email");
  const info = stmt.bind({ email: args.email }).get();
  return info;
};

//args.name_slug
const getUserBySlug = (args) => {
  const stmt = db.prepare("SELECT id,name,name_slug,email,profile_picture,role,created_at from users where name_slug = :name_slug");
  const info = stmt.bind({ name_slug: args.name_slug }).get();
  return info;
};

const getUser = (args) => {
  //simple
  // const sql = `
  //   SELECT * from users order by id desc
  // `;
  // const row = db.prepare(sql).all();
  // return row;
  //simple

  const currentPage = args.currentPage;
  const search = args.search;
  const limitPerPage = 15;
  const offset = (currentPage - 1) * limitPerPage;

  let query =
    "SELECT *,(COUNT() OVER() - (COUNT() OVER() % :limitPerPage))/:limitPerPage + (case when (COUNT() OVER() % :limitPerPage) > 0 then 1 else 0 end)  AS totalPage from users where (name like '%'||:search||'%' OR email like '%'||:search||'%' OR role like '%'||:search||'%') order by id desc limit :limitPerPage offset :offset";
  const stmt = db.prepare(query);
  const info = stmt.bind({ limitPerPage: limitPerPage, search: search, offset: offset }).all();
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

const updateProfile = (args) => {
  try {
    const stmt = db.prepare("update users set name=(?),name_slug=(?),email=(?) where name_slug=(?)");
    const info = stmt.run(args.name, args.name_slug, args.email, args.old_name_slug);
    return info;
  } catch (error) {
    console.log(error);
  }
};

const updatePassword = (args) => {
  try {
    const stmt = db.prepare("update users set password=(?) where name_slug=(?)");
    const info = stmt.run(args.password, args.name_slug);
    return info;
  } catch (error) {
    console.log(error.message);
  }
};

const createUser = (args) => {
  const stmt = db.prepare("INSERT INTO users (name, name_slug ,email, password, profile_picture, role, created_at, updated_at) VALUES (?, ?, ?, ? ,?, ?, ?, ?)");
  const info = stmt.run(args.name, args.name_slug, args.email, args.password, args.profile_picture ? args.profile_picture : "default.jpg", args.role, DDMMYYYY, DDMMYYYY);
  return info;
};

const checkNameAvailable = (args) => {
  const query = "select id,name,name_slug from users where name_slug = :name_slug";
  const stmt = db.prepare(query);
  const info = stmt.bind({ name_slug: args.name_slug }).get();
  return info;
};
const checkEmailAvailable = (args) => {
  const query = "select id,email from users where email = :email";
  const stmt = db.prepare(query);
  const info = stmt.bind({ email: args.email }).get();
  return info;
};

export { getUser, createUser, deleteUsers, updateUsers, getUserByEmail, getUserBySlug, updateProfile, checkNameAvailable, checkEmailAvailable, getUserFullDataBySlug, updatePassword };
