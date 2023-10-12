import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";
import useFetch from "../hooks/useFetch";

export const Loading = () => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <CircularProgress />
    </Backdrop>
  );
};
