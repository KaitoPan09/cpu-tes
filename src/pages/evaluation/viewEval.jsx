import React from "react";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { dummyViewEval } from "../../data/dummyData";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import Header from "../../components/Header";
import { useTheme } from "@emotion/react";
import { Link, useLocation, useParams } from "react-router-dom";
import CustomDataGrid from "../../components/CustomDatagrid";
import useData from "../../hooks/useData";
import { EvalDialog } from "./evalDialog";
import { useAuth } from "../../context/AuthContext";

const View = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { evalId } = useParams();
  const location = useLocation();
  const evaluation = location.state;
  const {auth} = useAuth();
  const [rows, setRows] = useData(`/api/evaluations/${evalId}?role=${auth?.role}`);
  const [open, setOpen] = React.useState(false);
  const [selectedEval, setSelectedEval] = React.useState(null);
  const columns = [
    {
      field: "faculty",
      headerName: "Faculty",
      flex: 2,
      minWidth: 150,
    },
    {
      field: "school_id",
      headerName: "School ID",
      width: 120,
    },
    {
      field: "department",
      headerName: "Department",
      flex: 2,
      minWidth: 150,
    },
    {
      field: "supervisor",
      headerName: "Supervisor",
      width: 120,
      cellClassName: (params) =>
        params.value === "Completed" ? "green" : "red",
    },
    {
      field: "peer",
      headerName: "Peer",
      width: 100,
      renderCell: ({ row }) => {
        return [
          <Tooltip title="Click to view details">
            <Typography
              onClick={() => {
                setSelectedEval({
                  type: "Peer",
                  faculty: row.faculty,
                  rows: row.peers,
                });
                setOpen(true);
              }}
            >
              {row.peer}
            </Typography>
          </Tooltip>,
        ];
      },
      cellClassName: (params) =>
        params.value === "Completed" ? "green" : "red",
    },
    {
      field: "self",
      headerName: "Self",
      width: 120,
      cellClassName: (params) =>
        params.value === "Completed" ? "green" : "red",
    },
    {
      field: "student",
      headerName: "Student",
      width: 120,
      renderCell: ({ row }) => {
        return [
          <Tooltip title="Click to view details">
            <Typography
              onClick={() => {
                setSelectedEval({
                  type: "Student",
                  faculty: row.faculty,
                  rows: row.students,
                });
                setOpen(true);
              }}
            >
              {row.student}
            </Typography>
          </Tooltip>,
        ];
      },
      cellClassName: (params) =>
        params.value === "Completed" ? "green" : "red",
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title={evaluation?.department}
          subtitle="List of faculty members and their evaluation status"
        />
      </Box>
      <CustomDataGrid
        getRowId={(row) => row.school_id}
        rows={rows}
        columns={columns}
      />
      {selectedEval && (
        <EvalDialog open={open} setOpen={setOpen} selectedEval={selectedEval} />
      )}
    </Box>
  );
};

export default View;
