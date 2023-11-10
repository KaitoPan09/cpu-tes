import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();
  const isAuthorized = allowedRoles.includes(auth.role) && auth.isAuthenticated;
  return auth.isAuthenticated ?
    isAuthorized ?
      <Outlet /> :
      <Navigate to="/" replace /> :
    <Navigate to="/login" state={{ from: location }} replace />;
  // return isAuthorized ? (
  //   <Outlet />
  // ) : (
  //   <Navigate to="/login" state={{ from: location }} replace />
  // );
  // return isAuthorized ? (
  //   <SurveyProvider>
  //     <Outlet />
  //     <SimpleSnackbar />
  //   </SurveyProvider>
  // ) : (
  //   <Navigate to="/login" state={{ from: location }} replace />
  // );
};
export default RequireAuth;
