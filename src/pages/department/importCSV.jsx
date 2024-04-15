import {
  Alert,
  Autocomplete,
  Box,
  Button,
  CircularProgress,
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
  Tab,
  Tabs,
  TextField,
  Typography,
  colors,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import CustomDataGrid from "../../components/CustomDatagrid";
import { CloudUpload } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import Papa from "papaparse";
import useFetch from "../../hooks/useFetch";
import { MuiFileInput } from "mui-file-input";
import { useAppContext } from "../../context/AppContext";
import { LoadingButton } from "@mui/lab";
export const ImportCSV = ({ open, setOpen, departments }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { showSnackbar } = useAppContext();
  const { postData, loading } = useFetch();
  const importOptions = [
    { value: "faculty", label: "Faculty" },
    { value: "student", label: "Student" },
    { value: "class", label: "Class" },
    { value: "courses", label: "Courses" },
    { value: "subjects", label: "Subjects" },
  ];
  const [value, setValue] = useState("faculty");
  const [classValue, setClassValue] = useState("facultyClass");
  const handleChange = (event) => {
    let newValue = event.target.value;
    console.log(newValue);
    setValue(newValue);
    setSelectedDepartment(null);
    setClassValue(null);
    setRows([]);
    setFile(null);
    if (newValue === "faculty") setColumns(facultyColumns);
    else if (newValue === "student") setColumns(studentColumns);
    // else if (newValue === "facultyClass") setColumns(facultyClassColumns);
    // else if (newValue === "studentClass") setColumns(studentClassColumns);
    else if (newValue === "courses") setColumns(coursesColumns);
    else if (newValue === "subjects") setColumns(subjectsColumns);
  };
  const handleChangeClass = (event, newValue) => {
    setClassValue(newValue);
    setRows([]);
    setFile(null);
    if (newValue === "facultyClass") setColumns(facultyClassColumns);
    else if (newValue === "studentClass") setColumns(studentClassColumns);
  };
  const handleClose = () => {
    setOpen(false);
    setRows([]);
    setFile(null);
    setColumns(facultyColumns);
    setValue("faculty");
  };
  const facultyColumns = [
    { field: "school_id", headerName: "School ID", width: 100 },
    { field: "lname", headerName: "Last Name", flex: 1, minWidth: 100 },
    { field: "fname", headerName: "First Name", flex: 1, minWidth: 100 },
    { field: "mname", headerName: "Middle Name", flex: 1, minWidth: 100 },
    { field: "college_code", headerName: "College Code", width: 100 },
    { field: "dept_code", headerName: "Department Code", width: 100 },
  ];
  const studentColumns = [
    { field: "school_id", headerName: "School ID", width: 100 },
    { field: "lname", headerName: "Last Name", flex: 1, minWidth: 100 },
    { field: "fname", headerName: "First Name", flex: 1, minWidth: 100 },
    { field: "mname", headerName: "Middle Name", flex: 1, minWidth: 100 },
    { field: "course_code", headerName: "Course", width: 100 },
    { field: "year_level", headerName: "Year Level", width: 80 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 100 },
  ];
  const facultyClassColumns = [
    { field: "stub_code", headerName: "Stub Code", width: 80 },
    { field: "subject_code", headerName: "Subject Code", width: 100 },
    { field: "subject", headerName: "Subject", flex: 2, minWidth: 100 },
    { field: "school_id", headerName: "School ID", width: 100 },
    { field: "type", headerName: "Type", width: 80 },
    { field: "dept_code", headerName: "Department Code", width: 150 },
    { field: "class_time", headerName: "Class Time", flex: 1, minWidth: 150 },
  ];
  const studentClassColumns = [
    { field: "school_id", headerName: "School ID", flex: 1, minWidth: 100 },
    { field: "stub_code", headerName: "Stub Code", flex: 1, minWidth: 100 },
    {
      field: "subject_code",
      headerName: "Subject Code",
      flex: 1,
      minWidth: 100,
    },
    { field: "type", headerName: "Type", flex: 1, minWidth: 100 },
  ];
  const coursesColumns = [
    { field: "course_code", headerName: "Course Code", width: 100 },
    { field: "course", headerName: "Course", flex: 1, minWidth: 100 },
    { field: "department", headerName: "Department", flex: 1, minWidth: 100 },
  ];
  const subjectsColumns = [
    { field: "dept_code", headerName: "Department Code", width: 200 },
    { field: "subject_code", headerName: "Subject Code", width: 200 },
    { field: "subject", headerName: "Subject", flex: 1, minWidth: 200 },
  ];

  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState(facultyColumns);
  const [file, setFile] = useState(null);
  const handleFileChange = (file) => {
    setFile(file);
    if (file) {
      Papa.parse(file, {
        encoding: "UTF-8",
        complete: function (result) {
          let headers = [];
          if (value === "faculty") {
            headers = [
              "school_id",
              "lname",
              "fname",
              "mname",
              "college_code",
              "dept_code",
            ];
            setColumns(facultyColumns);
          } else if (value === "student") {
            headers = [
              "school_id",
              "lname",
              "fname",
              "mname",
              "course_code",
              "year_level",
              "email",
            ];
            setColumns(studentColumns);
          } else if (value === "class" && classValue === "facultyClass") {
            headers = [
              "stub_code",
              "subject_code",
              "subject",
              "school_id",
              "type",
              "dept_code",
              "class_time",
            ];
            setColumns(facultyClassColumns);
          } else if (value === "class" && classValue === "studentClass") {
            headers = ["school_id", "stub_code", "subject_code", "type"];
            setColumns(studentClassColumns);
          } else if (value === "courses") {
            headers = ["course_code", "course", "department"];
            setColumns(coursesColumns);
          } else if (value === "subjects") {
            headers = ["dept_code", "subject_code", "subject"];
            setColumns(subjectsColumns);
          }
          const parsedData = result.data
            .map((row) => {
              if (row.every((cell) => cell === "")) {
                return null; // Skip entirely blank rows
              }
              const parsedRow = {};
              row.forEach((cell, index) => {
                if (
                  headers[index] === "class_time" &&
                  classValue === "facultyClass"
                ) {
                  // Combine the last three columns into one
                  parsedRow["class_time"] = `${row[row.length - 3]} - ${
                    row[row.length - 2]
                  } (${row[row.length - 1].trim()})`;
                } else {
                  parsedRow[headers[index]] = cell.trim();
                }
              });
              parsedRow.id = result.data.indexOf(row) + 1;
              return parsedRow;
            })
            .filter((row) => row !== null);
          console.log(parsedData);
          setRows(parsedData);
        },
        header: false, // Treat the first row as data, not headers
      });
    }
  };
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const handleImport = async () => {
    const response = await postData(
      `/api/utils/import_data?type=${value === "class" ? classValue : value}`,
      rows
    );
    if (response.message === "success") {
      showSnackbar("Import successful", "success");
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
      <DialogTitle>Import CSV</DialogTitle>
      <DialogContent>
        <Grid container direction={"column"} spacing={2} mt={2}>
          <Grid
            item
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Grid item xs={6}>
              {/* <Autocomplete
                sx={{ maxWidth: "400px" }}
                disablePortal
                disableClearable
                id="import-type"
                value={value}
                options={importOptions}
                getOptionLabel={(option) => option.label}
                onChange={handleChange}
                renderInput={(params) => (
                  <TextField {...params} label="Type of Import" />
                )}
              /> */}
              <FormControl fullWidth sx={{ maxWidth: "400px" }}>
                <InputLabel>Type of Import</InputLabel>
                <Select
                  labelId="import-type"
                  id="import-type"
                  value={value}
                  label="Type of Import"
                  onChange={handleChange}
                >
                  {importOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {departments && (
              <Grid item xs={6}>
                <Autocomplete
                  sx={{ maxWidth: "400px" }}
                  disablePortal={true}
                  id="dept_head"
                  getOptionLabel={(option) =>
                    option.dept_code + " - " + option.department
                  }
                  options={departments}
                  onChange={(event, newValue) => {
                    setSelectedDepartment(newValue);
                    console.log(newValue);
                  }}
                  name="department"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select a Department"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <React.Fragment>
                            {params.InputProps.endAdornment}
                          </React.Fragment>
                        ),
                      }}
                    />
                  )}
                />
              </Grid>
            )}
          </Grid>

          {value === "class" && (
            <Grid item>
              <FormLabel>Type of Class Assignment:</FormLabel>
              <RadioGroup row value={classValue} onChange={handleChangeClass}>
                <FormControlLabel
                  value="facultyClass"
                  control={<Radio />}
                  label="Faculty Class Assignment"
                />
                <FormControlLabel
                  value="studentClass"
                  control={<Radio />}
                  label="Student Class Assignment"
                />
              </RadioGroup>
            </Grid>
          )}
          <Grid item xs={6}>
            <MuiFileInput
              placeholder="Upload a CSV File"
              value={file}
              onChange={handleFileChange}
              inputProps={{ accept: ".csv" }}
              // disabled={
              //   (value === "faculty" && !selectedDepartment) ||
              //   (value === "class" && !classValue)
              // }
              disabled={value === "class" && !classValue}
              sx={{ maxWidth: "320px" }}
            />
          </Grid>
          {file && (
            <Grid item mt={1}>
              <Alert severity="info">
                {
                  "Make sure that the selected CSV file contains appropriate data shown by the headers of the table."
                }
                {value === "class" && (
                  <>
                    <br />
                    {classValue === "facultyClass"
                      ? `Import of faculty classes with relevant information such as subjects and departments that are not found on the system will be skipped`
                      : `Import of student classes with relevant information such as subjects and stub codes that are not found on the system will be skipped`}
                  </>
                )}
              </Alert>
            </Grid>
          )}
          <Grid item>
            <CustomDataGrid rows={rows} columns={columns} />
            {/* {rows.length > 0 && (
              <CustomDataGrid rows={rows} columns={columns} />
            )} */}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          sx={{
            color: colors.grey[100],
          }}
          onClick={handleImport}
          loading={loading}
          disabled={loading}
        >
          Import
        </LoadingButton>
        <Button
          sx={{
            color: colors.grey[100],
          }}
          onClick={handleClose}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
