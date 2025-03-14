import React from "react";
import { Link, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="h-screen w-[100%]">
      <div className="h-full flex">
        <Sidebar />
        <div className="flex-initial w-full ps-50">
          <Header />
          <div className="p-2">
            {/* <ul>
            <li>
              <Link to="/">to Dashboard</Link>
            </li>
            <li>
              <Link to="/user-management">to User Management</Link>
            </li>
          </ul> chevron-left */}

            <div className="w-full ps-2">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
