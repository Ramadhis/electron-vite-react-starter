import { session } from "electron";
import { getUserByEmail } from "../model/UserModel.js";
import bcrypt from "bcrypt";
import logging from "electron-log/main.js";

export const login = async (event, opts) => {
  try {
    const getUserData = getUserByEmail({ email: opts.email });
    // console.log("ini data user", getUserData);
    if (getUserData) {
      const cookie = {
        url: "https://www.radhians.com",
        name: "userData",
        value: JSON.stringify({
          name: getUserData.name,
          name_slug: getUserData.name_slug,
          email: getUserData.email,
          profile_picture: getUserData.profile_picture,
          role: getUserData.role,
          created_at: getUserData.created_at,
        }),
      };
      const password_validation = await bcrypt.compare(opts.password, getUserData.password);
      // console.log("password validation fail :", password_validation);
      if (password_validation != false) {
        return session.defaultSession.cookies.set(cookie).then(
          () => {
            // success
            return event.sender.send("login:status", { status: true, data: cookie.value });
          },
          (error) => {
            return console.error(error);
          }
        );
      }
      return event.sender.send("login:status", { status: false, message: "Wrong email or password" });
    }
    event.sender.send("login:status", { status: false, message: "Wrong email or password" });
    return false;
  } catch (error) {
    //save log
    logging.error(error.message);
    return event.sender.send("login:status", { status: false, message: error.message });
  }
};

export const logout = (event, opts) => {
  // console.log("logout");
  session.defaultSession.cookies.remove("https://www.radhians.com", "dummy_name").then(
    () => {
      // success
      event.sender.send("logout:status", { success: true, data: null });
    },
    (error) => {
      logging.error(error);
      console.error(error);
    }
  );
};
