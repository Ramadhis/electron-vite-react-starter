import { createUser } from "../model/UserModel.js";
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
    console.log(create);
    event.sender.send("addUser:success", { success: true, data: create });
  } catch (error) {
    event.sender.send("addUser:success", { success: false });
  }
};
