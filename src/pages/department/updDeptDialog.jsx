import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import useFetch from "../../hooks/useFetch";
import { useAppContext } from "../../context/AppContext";
import { Alert, Box, DialogContentText, Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const UpdDeptDialog = ({
  open,
  setOpen,
  setDepartments,
  selectedDepartment,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleClose = () => {
    setFaculties([]);
    setOpen(false);
  };
  const { postData, request, loading } = useFetch();
  const { showSnackbar } = useAppContext();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const dept_head = faculties.find(
      (faculty) => faculty.name === selectedFaculty.name
    );
    let response = await postData(
      `/api/departments/${selectedDepartment.id}/update`,
      {
        department: data.get("department"),
        dept_code: data.get("dept_code"),
        dept_head: selectedFaculty.id,
      }
    );
    setDepartments(response);
    setOpen(false);
    showSnackbar("Department updated successfully", "success");
  };
  const [faculties, setFaculties] = useState([]);
  // useEffect(() => {
  //   const getFaculties = async () => {
  //     let response = await request(
  //       `/api/departments/${selectedDepartment.id}/faculties`
  //     );
  //     setFaculties(response ? response : []);
  //     setSelectedFaculty(
  //       response.find(
  //         (faculty) => faculty.name === selectedDepartment.dept_head
  //       )
  //     );
  //   };
  //   if (selectedDepartment) {
  //     getFaculties();
  //   }
    
  // }, [selectedDepartment]);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Update Department</DialogTitle>
      <DialogContent>
        <DialogContentText>Update department information</DialogContentText>
        <Box
          id="deptForm"
          component="form"
          // noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="department"
                required
                fullWidth
                id="department"
                label="Department"
                autoFocus
                defaultValue={selectedDepartment?.department}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="dept_code"
                label="Department Code "
                name="dept_code"
                defaultValue={selectedDepartment?.dept_code}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                disablePortal={true}
                id="dept_head"
                getOptionLabel={(option) => option.name}
                options={selectedDepartment?.faculties}
                loading={loading}
                value={selectedFaculty}
                onChange={(event, newValue) => {
                  setSelectedFaculty(newValue);
                }}
                fullWidth
                name="dept_head"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Department Head"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {loading ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Alert severity="info">
                When assigning a new department head, the access levels of the
                affected user accounts are appropriately updated by the system
              </Alert>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          type="submit"
          form="deptForm"
          sx={{
            color: colors.grey[100],
          }}
          loading={loading}
          disabled={loading}
        >
          Update Department
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

export default UpdDeptDialog;
