import "./ChadPanelLayout.scss";

import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

import { verifyToken } from "./ChadPanelActions";

export const ChadPanelLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    checkToken();
  }, [location.pathname, localStorage.getItem("token")]);

  const checkToken = async () => {
    const token = localStorage.getItem("token");
    const tokenValid = token ? await verifyToken(token) : false;
    console.log("XD");
    if (token === null || !tokenValid) {
      console.log("nieprawidłowy token");
      navigate("/czadowyPanel/login");
    } else {
      navigate("/czadowyPanel/settings");
    }
  };

  return (
    <div className="chadpanel-main">
      <h1>Czadowy panel Reussa</h1>
      <Outlet />
    </div>
  );
};
