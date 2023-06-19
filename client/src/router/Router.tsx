import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ChadPanelLayout } from "@/layouts";
import { loginAction, PanelLogin } from "@/pages";

export const Router = () => {
  useEffect(() => {
    if (window.location.pathname === "/") window.location.replace("/0/home");
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="0" element={<></>}>
          <Route path="home" element={<div>Home</div>}></Route>
        </Route>
        <Route path="czadowyPanel" element={<ChadPanelLayout />}>
          <Route path="settings" element={<>czad panel</>}>
            <Route path="main" />
          </Route>
          <Route path="login" element={<PanelLogin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
