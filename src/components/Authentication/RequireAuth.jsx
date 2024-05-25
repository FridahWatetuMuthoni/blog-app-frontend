import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useGlobalContext from "../../hooks/useGlobalContext";

function RequireAuth() {
  const { access_token: token } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login/");
    }
  }, [token, navigate]);

  return token ? <Outlet /> : null;
}

export default RequireAuth;
