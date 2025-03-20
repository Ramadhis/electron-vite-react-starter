import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect } from "react";

const ProtectedLayout = ({ children }) => {
  const user = Cookies.get("userData") ? JSON.parse(Cookies.get("userData")) : null;
  const Navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      Navigate("/login");
    }
  }, []);

  return <>{children}</>;
};

export default ProtectedLayout;
