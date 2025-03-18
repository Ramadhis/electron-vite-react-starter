import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MainDashboard = () => {
  const navigate = useNavigate();
  const login = (e) => {
    e.preventDefault();
    return navigate("/login");
  };

  return (
    <div>
      MainDashboard
      <button className="btn bg-amber-500" onClick={login}>
        tes
      </button>
    </div>
  );
};

export default MainDashboard;
