import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HashRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import MainUsersManagements from "./pages/users-management/MainUsersManagements";
import MainSetting from "./pages/setting/MainSetting";
import AddUsers from "./pages/users-management/AddUsers";
import MainDashboard from "./pages/dashboard/MainDashboard";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<MainDashboard />}></Route>
        </Route>
        <Route path="/user-management" element={<Layout />}>
          <Route path="/user-management/" element={<MainUsersManagements />}></Route>
          <Route path="/user-management/add-user/" element={<AddUsers />}></Route>
        </Route>
        <Route path="/settings" element={<Layout />}>
          <Route path="/settings/" element={<MainSetting />}></Route>
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>
);
