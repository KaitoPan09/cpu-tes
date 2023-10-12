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
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import { tokens } from "../../theme";
import Cookies from "js-cookie";
import useFetch from "../../hooks/useFetch";
import { LoadingButton } from "@mui/lab";
import { useAppContext } from "../../context/AppContext";

export const UpdateUserDialog = ({ open, setOpen, setUsers, selectedUser }) => {
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
    // console.log({
    //   email: data.get("email"),
    //   new_password: data.get("new_password"),
    //   name: data.get("fullName"),
    //   school_id: data.get("schoolID"),
    //   access_level: data.get("accessLevel") || selectedUser?.access_level,
    // });
    // console.log(`/api/users/${selectedUser.id}`);
    let response = await postData(`/api/users/${selectedUser.id}/update`, {
      email: data.get("email"),
      new_password: data.get("new_password"),
      name: data.get("fullName"),
      school_id: data.get("schoolID"),
    });
    // console.log(response);
    setUsers(response);
    setOpen(false);
    showSnackbar("User updated successfully", "success");
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Update User</DialogTitle>
      <DialogContent>
        <DialogContentText>Update user information</DialogContentText>
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
                defaultValue={selectedUser?.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="schoolID"
                label="School ID"
                name="schoolID"
                defaultValue={selectedUser?.school_id}
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
                defaultValue={selectedUser?.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                //required
                fullWidth
                name="new_password"
                label="New Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Access level
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="accessLevel"
                  defaultValue={selectedUser?.access_level}
                  label="Access Level"
                  //onChange={handleChange}
                  disabled={
                    selectedUser?.access_level === 1 ||
                    selectedUser?.access_level === 4
                  }
                >
                  {selectedUser?.access_level === 1 && (
                    <MenuItem value={1}>Admin</MenuItem>
                  )}
                  <MenuItem value={2}>Department Head</MenuItem>
                  <MenuItem value={3}>Teacher</MenuItem>
                  {selectedUser?.access_level === 4 && (
                    <MenuItem value={4}>Student</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid> */}
            <Grid item xs={12}></Grid>
          </Grid>
        </Box>
        <Alert severity="info">
          Access levels for teachers and students are automatically assigned on data import. Department heads can be assigned in the departments page.
        </Alert>
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
          Update User
        </LoadingButton>
        <Button
          onClick={handleClose}
          sx={{
            color: colors.grey[100],
          }}
          disabled={loading}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
