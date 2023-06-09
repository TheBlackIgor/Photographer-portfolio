import "./ChadPanelLayout.scss";

import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

import { verifyToken } from "@/api";

export const ChadPanelLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    checkToken();
  }, [location.pathname, localStorage.getItem("token")]);

  const checkToken = async () => {
    const token = localStorage.getItem("token");
    const tokenValid = token ? await verifyToken(token) : false;
    if (token === null || !tokenValid) {
      console.log("nieprawidłowy token");
      navigate("/czadowyPanel/login");
    } else if (
      location.pathname === "/czadowyPanel/login" ||
      location.pathname === "/czadowyPanel"
    ) {
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
