import React, { useState, useEffect } from "react";
import { UserCircleIcon, ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/solid";

const Header = () => {
  const [theme, setTheme] = React.useState("dark"); // change to light for production
  const electronAPI = window.electron.ipcRenderer;
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  electronAPI.on("logout:success", (ev, args) => {
    return alert("success logout");
  });

  const logout = async () => {
    await electronAPI.send("logout");
  };

  return (
    <div className="navbar bg-base-100 sticky top-0 z-10">
      <div className="flex-1">
        <label className="flex cursor-pointer gap-2 ps-2">
          <span className="label-text text-xs">Light</span>
          <input onClick={toggleTheme} type="checkbox" value="synthwave" className="toggle toggle-xs theme-controller" />
          <span className="label-text text-xs">Dark</span>
        </label>
      </div>
      <div className="flex-none">
        <div className="form-control">{/* <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" /> */}</div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <ul tabIndex={0} className="menu menu-md dropdown-content bg-base-100 rounded-box z-[20] mt-3 w-32 p-2 shadow">
            <li>
              <a role="button" tabindex="0">
                <UserCircleIcon className="w-4 color-base-content" />
                Profile
              </a>
            </li>
            <li>
              <button onClick={logout} tabIndex="0" role="button">
                <ArrowLeftStartOnRectangleIcon className="w-4 color-base-content" />
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
