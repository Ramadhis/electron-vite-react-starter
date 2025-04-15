import { createUser, deleteUsers, updateUsers, updateProfile, checkNameAvailable, checkEmailAvailable, getUserBySlug, updatePassword, getUserFullDataBySlug } from "../model/UserModel.js";
import bcrypt from "bcrypt";
import { session } from "electron";
import logging from "electron-log/main.js";

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
    event.sender.send("addUser:status", { status: true, data: create, message: "Create user success" });
  } catch (error) {
    console.log(error);
    logging.error(error.message);
    event.sender.send("addUser:status", { status: false, message: error.message });
  }
};

export const submitEditUser = (event, opts) => {
  try {
    let update = updateUsers({ name: opts.name, name_slug: convertToSlug(opts.name), email: opts.email, role: opts.roles, old_name_slug: opts.name_slug });
    // console.log(update);
    event.sender.send("editUser:status", { success: true, data: update, message: "Edit success" });
  } catch (error) {
    logging.error(error.message);
    event.sender.send("editUser:status", { success: false, message: error.message });
  }
};

export const deleteUserBySlug = (event, opts) => {
  try {
    let del = deleteUsers({ name_slug: opts.name_slug });
    event.sender.send("users:deleted", { success: true, data: del, message: "Delete success" });
  } catch (error) {
    logging.error(error.message);
    event.sender.send("users:deleted", { success: false, message: error.message });
  }
};

export const submitChangePassword = async (event, opts) => {
  try {
    const getUserData = getUserFullDataBySlug({ name_slug: opts.name_slug });
    const password_validation = await bcrypt.compare(opts.currentPassword, getUserData.password);

    if (password_validation) {
      if (opts.newPassword == opts.confirmPassword) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(opts.newPassword, salt);

        let update = updatePassword({ password: hash, name_slug: opts.name_slug });
        // console.log(update);
        return event.sender.send("changePassword:status", { status: true, message: "Change password success, you can close this form." });
      }
    }
    return event.sender.send("changePassword:status", { status: false, message: "The current password is incorrect, please enter the password when logging into this account." });
  } catch (error) {
    logging.error(error.message);
    event.sender.send("changePassword:status", { status: false, message: error.message });
  }
};

export const submitEditProfile = (event, opts) => {
  try {
    const getUserData = getUserBySlug({ name_slug: opts.name_slug });
    const updateObj = {};

    if (opts.email != "" && opts.name != "") {
      updateObj.name = getUserData.name;
      updateObj.name_slug = getUserData.name_slug;

      if (opts.name != getUserData.name) {
        updateObj.name = opts.name;
        updateObj.name_slug = convertToSlug(opts.name);
      }

      updateObj.email = getUserData.email;
      if (opts.email != getUserData.email) {
        updateObj.email = opts.email;
      }

      const checkName = checkNameAvailable({ name_slug: convertToSlug(opts.name) });
      const checkEmail = checkEmailAvailable({ email: opts.email });

      // console.log(checkName, getUserData);

      if (checkName && checkName.id != getUserData.id) {
        return event.sender.send("editProfile:status", { status: false, message: "Name is already in use, try adding numbers or other characters like name123!" });
      }

      if (checkEmail && checkEmail.id != getUserData.id) {
        return event.sender.send("editProfile:status", { status: false, message: "Email has been used on another account, try another email" });
      }

      let update = updateProfile({ ...updateObj, old_name_slug: opts.name_slug });
      // console.log(update);
      const getUserDataUpdated = getUserBySlug({ name_slug: convertToSlug(opts.name) });
      // console.log("cookie", getUserDataUpdated);
      //success
      const cookie = {
        url: "https://www.radhians.com",
        name: "userData",
        value: JSON.stringify({
          name: getUserDataUpdated.name,
          name_slug: getUserDataUpdated.name_slug,
          email: getUserDataUpdated.email,
          profile_picture: getUserDataUpdated.profile_picture,
          role: getUserDataUpdated.role,
          created_at: getUserDataUpdated.created_at,
        }),
      };
      // replace session cookie with new data
      session.defaultSession.cookies.set(cookie).then(
        () => {
          // success
          console.log("sesion replaced");
        },
        (error) => {
          console.error(error);
          logging.error(error);
        }
      );

      return event.sender.send("editProfile:status", { status: true, data: cookie.value, message: "Edit profile success" });
    }
    return event.sender.send("editProfile:status", { status: false, message: "Name or Email empty" });
  } catch (error) {
    logging.error(error.message);
    return event.sender.send("editProfile:status", { status: false, message: error.message });
  }
};
