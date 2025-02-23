import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {

  const isAuthenticated = sessionStorage.getItem("AUTH_TOKEN") !== null;
console.warn("isAuthenticated",isAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
