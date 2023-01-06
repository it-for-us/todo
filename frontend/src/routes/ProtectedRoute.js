import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { useAuthContext } from "../modules/auth/AuthContext";

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated) {
    return (
      <MainLayout>
        <Outlet />
      </MainLayout>
    );
  }
  return <Navigate to="/login" />;
}
