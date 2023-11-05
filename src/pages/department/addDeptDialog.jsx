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

export const AddDeptDialog = ({ open, setOpen, setDepartments }) => {
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
    console.log(data);
    let response = await postData("/api/departments/add", {
      department: data.get("dept"),
      dept_code: data.get("deptCode"),
    });
    setDepartments(response ? response : []);
    setOpen(false);
    showSnackbar("Department added successfully", "success");
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Department</DialogTitle>
      <DialogContent>
        <DialogContentText>Add a new department</DialogContentText>
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
                name="dept"
                required
                fullWidth
                id="dept"
                label="Department Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="deptCode"
                label="Department Code"
                name="deptCode"
              />
            </Grid>
          </Grid>
          <Grid item xs={12} mt={2}>
            <Alert severity="info">
              Department heads can be assigned after creating a new department
              and adding faculties into the newly created department.
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
          Add Department
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
