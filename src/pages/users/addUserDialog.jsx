import { useTheme } from "@emotion/react";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  TextField,
} from "@mui/material";
import React from "react";
import { tokens } from "../../theme";
import Cookies from "js-cookie";
import useFetch from "../../hooks/useFetch";

import { useAppContext } from "../../context/AppContext";
import { LoadingButton } from "@mui/lab";

export const AddUserDialog = ({ open, setOpen, setUsers }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleClose = () => {
    setOpen(false);
  };
  const { postData, loading } = useFetch();
  const { showSnackbar } = useAppContext();
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    let response = await postData("/api/users/add_admin_user", {
      email: data.get("email"),
      password: data.get("password"),
      name: data.get("fullName"),
      school_id: data.get("schoolID"),
    });
    setUsers(response ? response : []);
    setOpen(false);
    showSnackbar("User added successfully", "success");
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add User</DialogTitle>
      <DialogContent>
        <DialogContentText>Add a new user with admin access</DialogContentText>
        <Box
          id="userForm"
          component="form"
          // noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="fullName"
                required
                fullWidth
                id="fullName"
                label="Full Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="schoolID"
                label="School ID"
                name="schoolID"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Grid item xs={12} mt={2}>
            <Alert severity="info">
              Accounts for students and faculties are automatically created when
              their information are imported into the system
            </Alert>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          type="submit"
          form="userForm"
          sx={{
            color: colors.grey[100],
          }}
          loading={loading}
          disabled={loading}
        >
          Add User
        </LoadingButton>
        <Button
          onClick={handleClose}
          sx={{
            color: colors.grey[100],
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
