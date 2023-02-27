import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const RenderRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" />
      </Routes>
    </BrowserRouter>
  );
};

export default RenderRoutes;
