import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Drawer from "./components/Drawer";
import HomePage from "./pages/HomePage";
import ShiftPage from "./pages/ShiftPage"
import Safety from "./pages/Safety";
import History from "./pages/History";

const Router = () => {
  return (
    <BrowserRouter>
     <Drawer />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/shift" element={<ShiftPage />} />
        <Route path="/report" element={<Safety />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;