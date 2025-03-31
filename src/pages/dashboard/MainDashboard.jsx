import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Content from "../../components/Content";

const MainDashboard = () => {
  const navigate = useNavigate();
  const login = (e) => {
    e.preventDefault();
    return navigate("/login");
  };

  return (
    <Content title={`Dashboard`}>
      Welcome back User
      {/* <button className="btn bg-amber-500" onClick={login}>
        tes
      </button> */}
    </Content>
  );
};

export default MainDashboard;
