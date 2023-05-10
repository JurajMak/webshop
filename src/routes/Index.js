import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home/Index";
import UserLogin from "../pages/login/Index";
import ProtectedRoute from "../pages/protected/Index";
import RegisterForm from "../pages/register/Index";
import { ErrorPage } from "../pages/error/Index";
import Dashboard from "../pages/admin/dashboard/Index";
import Create from "../pages/admin/create/Index";
import Edit from "../pages/admin/edit/Index";
import CreateCategory from "../pages/admin/category/Index";
import ProductDetails from "../pages/product/Index";
import AppShellLayout from "../components/layout/Index";
import Categories from "../pages/categories/Index";

const RenderRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/products" element={<AppShellLayout />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/products/create" element={<Create />} />
          <Route
            path="/admin/products/create/category"
            element={<CreateCategory />}
          />
          <Route path="/admin/products/:id/" element={<Edit />} />
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RenderRoutes;
