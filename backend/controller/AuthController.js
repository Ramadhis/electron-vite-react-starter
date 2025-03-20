import { session } from "electron";
import { getUserByEmail } from "../model/UserModel.js";
import bcrypt from "bcrypt";

export const login = async (event, opts) => {
  const getUserData = getUserByEmail({ email: opts.email });

  if (getUserData) {
    console.log(getUserData);

    const password_validation = await bcrypt.compare(opts.password, getUserData.password);
    if (password_validation) {
      const cookie = {
        url: "https://www.radhians.com",
        name: "userData",
        value: {
          name: getUserData.name,
          name_slug: getUserData.name_slug,
          email: getUserData.email,
          profile_picture: getUserData.profile_picture,
          role: getUserData.role,
          created_at: getUserData.created_at,
        },
      };
      session.defaultSession.cookies.set(cookie).then(
        () => {
          // success
          event.sender.send("login:status", { success: true, data: JSON.stringify(cookie.value) });
        },
        (error) => {
          console.error(error);
        }
      );
    }
    console.log(password_validation);
  }

  console.log("user not found");
  // session.defaultSession.cookies.set(cookie).then(
  //   () => {
  //     // success
  //     event.sender.send("login:status", { success: true, data: null });
  //   },
  //   (error) => {
  //     console.error(error);
  //   }
  // );
};

export const logout = (event, opts) => {
  console.log("logout");
  session.defaultSession.cookies.remove("https://www.radhians.com", "dummy_name").then(
    () => {
      // success
      event.sender.send("logout:status", { success: true, data: null });
    },
    (error) => {
      console.error(error);
    }
  );
};
