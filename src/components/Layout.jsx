import React from "react";
import { Link, Outlet } from "react-router-dom";
import Header from "./Header";
const Dashboard = () => {
  return (
    <div className="h-screen w-[100%]">
      <div className="h-full flex">
        <div className="h-full w-50 flex-none border-r shadow-sm">
          <img src={profile} alt="" />
          <div className="p-4 pb-2 flex justify-between items-center">
            <h1>AAA</h1>
          </div>
        </div>
        <div className="flex-initial p-4 w-full">
          <h1 class="text-3xl font-bold underline text-red-600">Hello world!</h1>
          <button class="btn w-full">Button</button>
          <ul>
            <li>
              <Link to="/">to Dashboard</Link>
            </li>
            <li>
              <Link to="/user-management">to User Management</Link>
            </li>
          </ul>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
