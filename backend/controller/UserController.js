import { createUser, deleteUsers, updateUsers } from "../model/UserModel.js";
import bcrypt from "bcrypt";

function convertToSlug(Text) {
  return Text.toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

export const submitAddUser = (event, opts) => {
  try {
    // console.log(event, opts);
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(opts.password, salt);
    let create = createUser({ name: opts.name, name_slug: convertToSlug(opts.name), email: opts.email, password: hash, role: opts.roles });
    event.sender.send("addUser:status", { success: true, data: create });
  } catch (error) {
    event.sender.send("addUser:status", { success: false });
  }
};

export const submitEditUser = (event, opts) => {
  try {
    // console.log(event, opts);
    // const salt = bcrypt.genSaltSync(10);
    // const hash = bcrypt.hashSync(opts.password, salt);
    let update = updateUsers({ name: opts.name, name_slug: convertToSlug(opts.name), email: opts.email, role: opts.roles, old_name_slug: opts.name_slug });
    console.log(update);
    event.sender.send("editUser:status", { success: true, data: update, message: "Edit success" });
  } catch (error) {
    event.sender.send("editUser:status", { success: false, message: error });
  }
};

export const deleteUserBySlug = (event, opts) => {
  try {
    let del = deleteUsers({ name_slug: opts.name_slug });
    event.sender.send("users:deleted", { success: true, data: del, message: "Delete success" });
  } catch (error) {
    event.sender.send("users:deleted", { success: false, message: error });
  }
};
