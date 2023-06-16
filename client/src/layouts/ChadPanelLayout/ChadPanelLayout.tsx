import { useState, useEffect } from "react";
import "./ChadPanelLayout.scss";

import { Outlet, useNavigate } from "react-router";

export const ChadPanelLayout = () => {
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) navigate("/czadowyPanel/login");
  }, []);

  return (
    <div className="chadpanel-main">
      <h1>Czadowy panel Reussa</h1>
      <Outlet />
    </div>
  );
};
