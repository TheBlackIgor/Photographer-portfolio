import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ChadPanelLayout, MainPageLayout } from "@/layouts";
import {
  AboutMe,
  AlbumPage,
  Contact,
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
          <Route path="gallery">
            <Route index element={<GalleryPage />} />
            <Route path=":name" element={<AlbumPage />} />
          </Route>
          <Route path="aboutMe" element={<AboutMe />} />
          <Route path="contact" element={<Contact />} />
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
