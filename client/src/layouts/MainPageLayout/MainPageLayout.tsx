import { Navbar } from "@/components";
import React from "react";
import { Outlet } from "react-router";

export const MainPageLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
