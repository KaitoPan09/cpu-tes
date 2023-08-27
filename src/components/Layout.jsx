import React from "react";
import { useAuth } from "../context/AuthContext";
import { Backdrop, CircularProgress } from "@mui/material";
import { Outlet } from "react-router-dom";
import Topbar from "../pages/global/Topbar";
import Sidebar from "../pages/global/Sidebar";

export default function Layout() {
  const { auth } = useAuth();
  return !auth ? (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  ) : (
    <div className="app">
      <Sidebar />
      <main className="content">
        <Topbar />
        <Outlet />
      </main>
    </div>
  );
}
