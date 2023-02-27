import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "../pages/admin/products/Index";
import Home from "../pages/home/Index";
import UserLogin from "../pages/login/Index";
import ProtectedRoute from "../pages/protected/Index";
import RegisterForm from "../pages/register/Index";
import AppShellUser from "../pages/user/logged/Index";

const RenderRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          path="/loggedUser"
          element={
            <ProtectedRoute>
              <AppShellUser />
            </ProtectedRoute>
          }></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RenderRoutes;
