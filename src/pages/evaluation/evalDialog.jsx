import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";
import CustomDataGrid from "../../components/CustomDatagrid";
const colStudEval = [
  { field: "school_id", headerName: "School ID", width: 100 },
  { field: "name", headerName: "Name", flex: 1, minWidth: 180 },
  { field: "email", headerName: "Email", flex: 1, minWidth: 180 },
  { field: "course", headerName: "Course", width: 80 },
  { field: "year_level", headerName: "Year", width: 40 },
  { field: "stub_code", headerName: "Stub Code", width: 80 },
  { field: "subject_code", headerName: "Subject", width: 100 },
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
  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="lg">
      <DialogTitle>
        {selectedEval.type} Evaluations for {selectedEval.faculty}
      </DialogTitle>
      <DialogContent>
        <CustomDataGrid
          getRowId={(row) => row.school_id}
          rows={selectedEval.rows}
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
