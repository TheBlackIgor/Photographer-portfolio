import { Outlet } from "react-router";

import { Navbar } from "@/components";

export const MainPageLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <footer />
    </>
  );
};
