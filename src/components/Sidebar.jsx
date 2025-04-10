import React, { useEffect } from "react";
import { Cog6ToothIcon, UsersIcon, ChartPieIcon } from "@heroicons/react/24/solid";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  // useEffect(() => {
  //   console.log("sidebar", location);
  // }, [location]);

  //menuPathName route from <Link to="..."> <--
  const menuActive = (menuPathName) => {
    if (location.pathname == menuPathName) {
      return `menu-active `;
    }
  };

  return (
    <>
      <div className="h-full w-50 flex-none border-r-base-300 border-r shadow-sm fixed bg-base-100 z-50">
        <div className="flex justify-center items-center">
          <img className="w-24" src={"./assets/logo.png"} alt="" />
        </div>
        <div className="p-1 pb-2 flex">
          <ul className="menu bg-base-200 rounded-box w-56">
            <li className="">
              <Link className={menuActive("/dashboard")} to={"/dashboard"}>
                <ChartPieIcon className="w-4" /> Dashboard
              </Link>
            </li>
            <li className="">
              <Link className={menuActive("/user-management")} to={"/user-management"}>
                <UsersIcon className="w-4" /> User Management
              </Link>
              <ul tabindex="0">
                <li>
                  <Link className={menuActive("/user-management/add-user/")} to={"/user-management/add-user/"}>
                    <div role="button" tabindex="0">
                      Add User
                    </div>
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link className={menuActive("/settings/")} to={"/settings/"}>
                <Cog6ToothIcon className="w-4" />
                Setting
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
