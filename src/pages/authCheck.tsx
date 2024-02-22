import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./login";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const AuthCheck: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return isLoggedIn ? <>{children}</> : <Login />;
};

export default AuthCheck;
