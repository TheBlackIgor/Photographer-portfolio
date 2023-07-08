import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ChadPanelLayout } from "@/layouts";
import { FolderPagePanel, MainPagePanel, PanelLogin } from "@/pages";

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
          <Route path="settings">
            <Route index element={<MainPagePanel />} />
            <Route path="main" />
            <Route path="folders/:name" element={<FolderPagePanel />} />
          </Route>
          <Route path="login" element={<PanelLogin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
