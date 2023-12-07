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
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import { tokens } from "../../theme";
import Cookies from "js-cookie";
import useFetch from "../../hooks/useFetch";

import { useAppContext } from "../../context/AppContext";
import { LoadingButton } from "@mui/lab";
import useData from "../../hooks/useData";

export const AddUserDialog = ({ open, setOpen, setUsers }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleClose = () => {
    setOpen(false);
  };
  const { postData, loading } = useFetch();
  const { showSnackbar } = useAppContext();
  const [departments, setDepartments] = useData("/api/departments");
  const [colleges, setColleges] = useData("/api/colleges");
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let response = null;
    if (value === "Admin") {
      response = await postData("/api/users/add_admin_user", {
        email: data.get("email"),
        password: data.get("password"),
        name: data.get("fullName"),
        school_id: data.get("schoolID"),
      });
    } else {
      response = await postData(
        type === "College"
          ? `/api/users/add_secretary?college_id=${college.id}`
          : `/api/users/add_secretary?dept_id=${department.id}`,
        {
          email: data.get("email"),
          password: data.get("password"),
          name: data.get("fullName"),
          school_id: data.get("schoolID"),
        }
      );
    }
    setUsers(response ? response : []);
    setOpen(false);
    showSnackbar("User added successfully", "success");
  };
  const [value, setValue] = React.useState("female");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const [college, setCollege] = React.useState({});
  const handleChangeCollege = (event) => {
    setCollege(event.target.value);
  };
  const [department, setDepartment] = React.useState({});
  const handleChangeDepartment = (event) => {
    setDepartment(event.target.value);
  };
  const [type, setType] = React.useState("College");
  const handleChangeType = (event) => {
    setType(event.target.value);
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add User</DialogTitle>
      <DialogContent>
        <DialogContentText>Add a new user</DialogContentText>
        <Box
          id="userForm"
          component="form"
          // noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl>
                <RadioGroup row value={value} onChange={handleChange}>
                  <FormControlLabel
                    value="Admin"
                    control={<Radio />}
                    label="Admin"
                  />
                  <FormControlLabel
                    value="Secretary"
                    control={<Radio />}
                    label="Secretary"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            {value === "Secretary" && (
              <Grid item xs={12}>
                <FormControl>
                  <RadioGroup row value={type} onChange={handleChangeType}>
                    <FormControlLabel
                      value="College"
                      control={<Radio />}
                      label="College"
                    />
                    <FormControlLabel
                      value="Department"
                      control={<Radio />}
                      label="Department"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            )}
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
                // required
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

            {value === "Secretary" && (
              <>
                {type === "College" && (
                  <Grid item xs={12}>
                    <FormControl fullWidth required>
                      <InputLabel>College</InputLabel>
                      <Select
                        label={"College"}
                        // defaultValue={defaultValue}
                        onChange={handleChangeCollege}
                      >
                        {colleges.map((option, index) => {
                          return (
                            <MenuItem key={index} value={option}>
                              {option.college}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                )}
                {type === "Department" && (
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      // required
                    >
                      <InputLabel>Department</InputLabel>
                      <Select
                        label={"Department"}
                        // defaultValue={defaultValue}
                        onChange={handleChangeDepartment}
                      >
                        {departments.map((option, index) => {
                          return (
                            <MenuItem key={index} value={option}>
                              {option.department}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                )}
              </>
            )}
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
