import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Select,
  Typography,
} from "@mui/material";
import React from "react";
import CustomDataGrid from "../../components/CustomDatagrid";
import { useState } from "react";
import { useEffect } from "react";
import { MenuItem } from "react-pro-sidebar";
const colStudEval = [
  { field: "school_id", headerName: "School ID", width: 100 },
  { field: "name", headerName: "Name", flex: 1, minWidth: 180 },
  { field: "email", headerName: "Email", flex: 1, minWidth: 180 },
  { field: "course", headerName: "Course", width: 80 },
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
    }
  }, [selectedEval]);
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
        {selectedEval.type === "Student" && classes && (
          <Select
            label={"Select a Class"}
            onChange={(e) => {
              setSelectedClass(e.target.value);
            }}
          >
            {classes.map((option, index) => {
              return (
                <MenuItem key={index} value={option}>
                  {option.stub_code} - {option.subject_code}
                </MenuItem>
              );
            })}
          </Select>
        )}
        <CustomDataGrid
          // getRowId={(row) => row.school_id}
          rows={selectedEval.type === "Student" ? selectedClass?.students : selectedEval.rows}
          columns={selectedEval.type === "Student" ? colStudEval : colPeerEval}
          getCellClassName={(params) => {
            if (params.field === "eval") {
              return params.value === "Completed" ? "green" : "red";
            }
            return "";
          }}
        />
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
