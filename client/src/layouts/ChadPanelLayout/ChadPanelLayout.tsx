import "./ChadPanelLayout.scss";

import { Outlet } from "react-router";

export const ChadPanelLayout = () => {
  return (
    <div className="chadpanel-main">
      <h1>Czadowy panel Reussa</h1>
      <Outlet />
    </div>
  );
};
