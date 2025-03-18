import { session } from "electron";

export const login = (event, opts) => {
  const cookie = { url: "https://www.radhians.com", name: "dummy_name", value: "dummy" };
  session.defaultSession.cookies.set(cookie).then(
    () => {
      // success
      event.sender.send("login:success", { success: true, data: null });
    },
    (error) => {
      console.error(error);
    }
  );
};

export const logout = (event, opts) => {
  console.log("logout");
  session.defaultSession.cookies.remove("https://www.radhians.com", "dummy_name").then(
    () => {
      // success
      event.sender.send("logout:success", { success: true, data: null });
    },
    (error) => {
      console.error(error);
    }
  );
};
