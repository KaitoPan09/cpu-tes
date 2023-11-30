import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import React from "react";
import CustomDataGrid from "../../components/CustomDatagrid";
import { useState } from "react";
import { useEffect } from "react";
const colStudEval = [
  { field: "school_id", headerName: "School ID", width: 100 },
  { field: "name", headerName: "Name", flex: 1, minWidth: 180 },
  { field: "email", headerName: "Email", flex: 1, minWidth: 180 },
  { field: "course", headerName: "Course", width: 90 },
  { field: "year_level", headerName: "Year", width: 40 },
  // { field: "stub_code", headerName: "Stub Code", width: 80 },
  // { field: "subject_code", headerName: "Subject", width: 100 },
  {
    field: "eval",
    headerName: "Status",
    width: 100,
    valueGetter: (params) => {
      if (params.value) {
        return "Completed";
      }
      return "Pending";
    },
  },
];
const colPeerEval = [
  { field: "school_id", headerName: "School ID", flex: 1 },
  { field: "name", headerName: "Name", flex: 2 },
  { field: "email", headerName: "Email", flex: 2 },
  {
    field: "eval",
    headerName: "Status",
    flex: 1,
    valueGetter: (params) => {
      if (params.value) {
        return "Completed";
      }
      return "Pending";
    },
  },
];
export const EvalDialog = ({ open, setOpen, selectedEval }) => {
  const [selectedClass, setSelectedClass] = useState({});
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  useEffect(() => {
    if (selectedEval.type === "Student") {
      setClasses(selectedEval.rows);
      setSelectedClass(selectedEval.rows[0]);
      setStudents(selectedEval.rows[0].students);
      console.log(selectedEval);
    }
  }, [selectedEval]);
  const [status, setStatus] = useState("All");
  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="lg">
      <DialogTitle>
        <Grid container spacing={2} justifyContent={"flex-start"}>
          <Grid item>
            <Typography variant="h6" color={"text.secondary"}>
              Evaluation Type:
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" color={"primary"}>
              {selectedEval.type}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" color={"text.secondary"}>
              Faculty:
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" color={"primary"}>
              {selectedEval.faculty}
            </Typography>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={1}>
          {selectedEval.type === "Student" && classes && (
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel id="demo-simple-select-label">
                  Select a Class
                </InputLabel>
                <Select
                  label={"Select a Class"}
                  value={selectedClass ? selectedClass : {}}
                  onChange={(e) => {
                    const class_ = e.target.value;
                    setSelectedClass(class_);
                    setStudents(class_.students);
                    setStatus("All");
                  }}
                >
                  {classes.map((option, index) => {
                    // console.log(option);
                    return (
                      <MenuItem key={index} value={option}>
                        {option.stub_code +
                          " - " +
                          option.subject +
                          " - " +
                          option.students.length +
                          " Students"}
                      </MenuItem>
                    );
                  })}
                </Select>
                <FormHelperText>
                  Stub - Subject - No. of Students
                </FormHelperText>
              </FormControl>
            </Grid>
          )}
          <Grid item xs={12} sm={6}>
            <FormControl sx={{ mt: 2, ml: 2 }}>
              <FormLabel>Status</FormLabel>
              <RadioGroup
                row
                value={status}
                onChange={(e) => {
                  let status = e.target.value;
                  setStatus(status);
                  if (status === "Completed") {
                    const filteredStudents = selectedClass.students.filter(
                      (student) => student.eval === true
                    );
                    setStudents(filteredStudents);
                  }
                  if (status === "Pending") {
                    const filteredStudents = selectedClass.students.filter(
                      (student) => student.eval === false
                    );
                    setStudents(filteredStudents);
                  }
                  if (status === "All") {
                    const filteredStudents = selectedClass.students.filter(
                      (student) =>
                        student.eval === true || student.eval === false
                    );
                    setStudents(filteredStudents);
                  }
                }}
              >
                <FormControlLabel value="All" control={<Radio />} label="All" />
                <FormControlLabel
                  value="Completed"
                  control={<Radio />}
                  label="Completed"
                />
                <FormControlLabel
                  value="Pending"
                  control={<Radio />}
                  label="Pending"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <CustomDataGrid
              getRowId={(row) => row.school_id}
              rows={
                selectedEval.type === "Student" ? students : selectedEval.rows
              }
              columns={
                selectedEval.type === "Student" ? colStudEval : colPeerEval
              }
              getCellClassName={(params) => {
                if (params.field === "eval") {
                  return params.value === "Completed" ? "green" : "red";
                }
                return "";
              }}
            />
          </Grid>
        </Grid>
        {/* <DataGrid
          getRowId={(row) => row.school_id}
          disableMultipleSelection={true}
          rows={rowEval}
          columns={colEval}
          sx={{
            boxShadow: 1,
            border: 1,
            borderColor: "black",
            "& .MuiDataGrid-cell:hover": {
              color: "primary.main",
            },
          }}
          getCellClassName={(params) => {
            if (params.field === "eval") {
              return params.value == "Completed" ? "completed" : "pending";
            }
            return "";
          }}
        /> */}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
