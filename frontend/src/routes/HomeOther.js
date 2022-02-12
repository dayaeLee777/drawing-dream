import Nav from "components/layout/Nav";
import React from "react";
import { Outlet } from "react-router-dom";

const HomeOther = () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};

export default HomeOther;
