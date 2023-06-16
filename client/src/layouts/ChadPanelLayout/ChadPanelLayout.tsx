import "./ChadPanelLayout.scss";

import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

export const ChadPanelLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) navigate("/czadowyPanel/login");
  }, [navigate]);

  return (
    <div className="chadpanel-main">
      <h1>Czadowy panel Reussa</h1>
      <Outlet />
    </div>
  );
};
