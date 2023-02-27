import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "../pages/admin/products/Index";
import Home from "../pages/home/Index";
import HeaderTabs from "../components/header/Index";
import Login from "../pages/login/Index";
import UserLogin from "../pages/login/text";
import RegisterForm from "../pages/register/Index";

const RenderRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RenderRoutes;
