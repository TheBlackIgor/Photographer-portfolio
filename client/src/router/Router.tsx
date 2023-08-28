import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ChadPanelLayout, MainPageLayout } from "@/layouts";
import {
  FolderPagePanel,
  GalleryPage,
  HomePage,
  MainPagePanel,
  PanelLogin,
} from "@/pages";

export const Router = () => {
  useEffect(() => {
    if (window.location.pathname === "/") window.location.replace("/home");
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<MainPageLayout />}>
          <Route path="home" element={<HomePage />} />
          <Route path="gallery" element={<GalleryPage />}></Route>
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
