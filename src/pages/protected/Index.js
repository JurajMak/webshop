import React from "react";
import { AuthContext } from "../../contexts/Index";
import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoute = () => {
  const { user } = React.useContext(AuthContext);

  console.log("Protected route", user?.user_metadata.role);

  if (user?.user_metadata.role !== "admin") {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
