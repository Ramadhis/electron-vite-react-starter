import { session } from "electron";

export const authCheck = (accept, reject, errors) => {
  session.defaultSession.cookies.get({ url: "https://www.radhians.com" }).then(
    (cookies) => {
      if (cookies.length !== 0) {
        return accept(cookies);
      }
      //return if user not login
      return reject();
    },
    (err) => {
      console.error(err);
      errors(err);
      // event.sender.send("swap:success", { success: false, data: null, message: error });
    }
  );
};
