import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Drawer from "./components/Drawer";
import HomePage from "./pages/HomePage";
import PostShift from "./pages/PostShift"

const Router = () => {
  return (
    <BrowserRouter>
     <Drawer />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/postshift" element={<PostShift />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;