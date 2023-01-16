import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { useSelector } from "react-redux";

export default function AuthRoute() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return (
      <MainLayout>
        <Outlet />
      </MainLayout>
    );
  }
  return <Navigate to="/home" />;
}
