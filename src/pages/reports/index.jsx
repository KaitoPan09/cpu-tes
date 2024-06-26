import React from "react";
import { Box, Tooltip, IconButton } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { dummyEvalResult } from "../../data/dummyData";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Header from "../../components/Header";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import CustomDatagrid from "../../components/CustomDatagrid";
import useData from "../../hooks/useData";
import { useAuth } from "../../context/AuthContext";
const Reports = () => {
  const { auth, userInfo } = useAuth();
  const [rows, setRows] = useData(
    auth?.role === "Admin"
      ? "/api/evaluations/"
      : `/api/evaluations/?college_id=${userInfo?.college_id}`
  );
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const columns = [
    // {
    //   field: "id",
    //   headerName: "ID",
    //   width: 80,
    // },
    {
      field: "college",
      headerName: "College",
      flex: 3,
      minWidth: 240,
    },
    {
      field: "acad_year",
      headerName: "Academic Year",
      flex: 2,
      minWidth: 140,
    },
    {
      field: "semester",
      headerName: "Semester",
      flex: 2,
      minWidth: 140,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 2,
      minWidth: 120,
    },
    // {
    //   field: "student_completion",
    //   headerName: "Student Completion (%)",
    //   flex: 1,
    //   minWidth: 120,
    //   type: "number",
    // },
    {
      field: "survey_completion",
      headerName: "Survey Completion (%)",
      flex: 1,
      minWidth: 120,
      type: "number",
      valueFormatter: (params) => {
        return params.value.toFixed(2) + "%";
      }
    },
    {
      field: "score",
      headerName: "Overall Score",
      flex: 1,
      minWidth: 120,
      type: "number",
    },
    {
      field: "details",
      type: "actions",
      headerName: "Details",
      width: 80,
      cellClassName: "details",
      getActions: ({ row }) => {
        const iconStyle = { fontSize: "1.25rem" };

        return [
          <Tooltip title="Click Here to See Details">
            <IconButton
              onClick={() => {
                navigate(`/reports/${row.id}/reportDetails`, { state: row });
              }}
            >
              <VisibilityOutlinedIcon sx={{ fontSize: iconStyle.fontSize }} />
            </IconButton>
          </Tooltip>,
        ];
      },
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="REPORTS" subtitle="List of all evaluations" />
      </Box>
      <CustomDatagrid rows={rows} columns={columns} />
    </Box>
  );
};

export default Reports;
