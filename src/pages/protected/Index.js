import React from "react";
import { AuthContext } from "../../contexts/Index";
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const { user } = React.useContext(AuthContext);

  console.log("Protected route", user);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
