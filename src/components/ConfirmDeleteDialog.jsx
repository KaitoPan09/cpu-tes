import { useTheme } from "@emotion/react";
import React from "react";
import { tokens } from "../theme";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export const ConfirmDeleteDialog = ({open, setOpen, handleConfirm}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this record?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleCancel}
          sx={{
            color: colors.yellowAccent[300],
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          sx={{
            color: colors.redAccent[400],
          }}
          autoFocus
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
