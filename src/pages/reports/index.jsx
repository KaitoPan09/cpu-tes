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
const Reports = () => {
  const [rows, setRows] = useData("/api/evaluations/");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
    },
    {
      field: "college",
      headerName: "College",
      flex: 1,
      minWidth: 180,
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "score",
      headerName: "Overall Score",
      width: 120,
      type:"number"
    },
    {
      field: "details",
      type: "actions",
      headerName: "Details",
      width: 80,
      cellClassName: "details",
      getActions: ({row}) => {
        const iconStyle = { fontSize: "1.25rem" };
        
        return [
          <Tooltip title="Details">
            <IconButton
              onClick={() => {
                console.log(row);
                navigate(`/reports/${row.id}/reportDetails`);
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
        <Header title="REPORTS" subtitle="Evaluation Result Summary" />
      </Box>
      <CustomDatagrid rows={rows} columns={columns} />
    </Box>
  );
};

export default Reports;
