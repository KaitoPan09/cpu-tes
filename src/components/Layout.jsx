import React from "react";
import { useAuth } from "../context/AuthContext";
import { Backdrop, CircularProgress } from "@mui/material";
import { Outlet } from "react-router-dom";
import Topbar from "../pages/global/Topbar";
import { MyProSidebarProvider } from "../pages/global/sideBarContext";
import { Loading } from "./Loading";
import useFetch from "../hooks/useFetch";
// import { LoaderProvider, useLoader } from "../context/LoaderContext";
import { useAppContext } from "../context/AppContext";

export default function Layout() {
  const { auth } = useAuth();
  const { isLoading } = useAppContext();
  return (
    auth && (
      <MyProSidebarProvider>
        {/* {isLoading && <Loading />} */}
        <div className="app">
          <main className="content">
            <Topbar />
            <Outlet />
          </main>
        </div>
        {/* <Loading /> */}
      </MyProSidebarProvider>
    )
  );
}
