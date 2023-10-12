import React, { createContext, useContext, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import {
  Alert,
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider = ({ children }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("info");

  const showSnackbar = (msg, severity) => {
    setMessage(msg);
    setSeverity(severity);
    setOpen(true);
  };

  const closeSnackbar = () => {
    setOpen(false);
    setMessage("");
    setSeverity("info");
  };
  const [isLoading, setIsLoading] = useState(false);

  const showLoader = () => setIsLoading(true);
  const hideLoader = () => setIsLoading(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [title, setTitle] = useState("");
  const [contentText, setContentText] = useState("");
  const showDialogBox = (title, contentText) => {
    setTitle(title);
    setContentText(contentText);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    if (title === "Session Expired") {
      navigate("/login", { state: { from: location }, replace: true });
    }
  };
  return (
    <AppContext.Provider
      value={{
        showSnackbar,
        showLoader,
        hideLoader,
        isLoading,
        setIsLoading,
        showDialogBox,
      }}
    >
      {children}
      <Snackbar open={open} autoHideDuration={6000} onClose={closeSnackbar}>
        <Alert
          onClose={closeSnackbar}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{contentText}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDialogClose}
            sx={{
              color: colors.yellowAccent[300],
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress />
      </Backdrop>
    </AppContext.Provider>
  );
};
export default AppContext;
