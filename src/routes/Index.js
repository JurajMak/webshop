import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "../pages/admin/products/Index";
import Home from "../pages/home/Index";
import UserLogin from "../pages/login/Index";
import ProtectedRoute from "../pages/protected/Index";
import RegisterForm from "../pages/register/Index";
import { ErrorPage } from "../pages/error/Index";
import { AuthContext } from "../contexts/Index";

const RenderRoutes = () => {
  const { user } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          path="/login/user"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }></Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RenderRoutes;
