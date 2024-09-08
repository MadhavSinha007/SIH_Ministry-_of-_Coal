import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Drawer from "./components/Drawer";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import ShiftPage from "./pages/ShiftPage";
import Safety from "./pages/Safety";
import History from "./pages/History";

const AppRouter = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <>
      {!isLoginPage && <Drawer />}
      <Routes>
        <Route index element={<Login />} />
        <Route path="/dashboard" element={<HomePage />} />
        <Route path="/shift" element={<ShiftPage />} />
        <Route path="/report" element={<Safety />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </>
  );
};

const Router = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
};

export default Router;
