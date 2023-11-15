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
const Reports = () => {
    // const theme = useTheme();
    // const colors = tokens(theme.palette.mode);
    
    // const columns = [
    //     { 
    //         field: "id", 
    //         headerName: "ID",
    //         flex: .1,
    //     },
    //     {
    //         field: "department",
    //         headerName: "Department",
    //         flex: 1,
    //         editable: true,
    //     },
    //     { 
    //         field: "status", 
    //         headerName: "Status", 
    //         flex: .5,
    //     },
    //     {
    //         field: 'actions',
    //         type: 'actions',
    //         headerName: ' ',
    //         flex: .5,
    //         cellClassName: 'actions',
    //         getActions: () => {
    //             return [
    //                     <Link to="/reports/reportDetails">
    //                         <GridActionsCellItem
    //                             icon={<VisibilityOutlinedIcon />}
    //                             label="View"
    //                         />Details
    //                     </Link>
    //             ];
    //             },
    //         },
    
    // ]
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.1,
    },
    {
      field: "department",
      headerName: "Department",
      flex: 1,
      editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.5,
    },
    {
      field: "details",
      type: "actions",
      headerName: "Details",
      flex: 0.5,
      cellClassName: "details",
      getActions: () => {
        const iconStyle = { fontSize: '1.25rem' };
        return [
          <Tooltip title="Details">
            <IconButton
              onClick={() => {
                navigate(`/reports/reportDetails`);
              }}
            >
              <VisibilityOutlinedIcon sx={{ fontSize: iconStyle.fontSize }}/>
            </IconButton>
          </Tooltip>,

          // <Link to="/reports/reportDetails">
          //   <GridActionsCellItem
          //     icon={<VisibilityOutlinedIcon sx={{ fontSize: iconStyle.fontSize }}/>}
          //     label="View"
          //   />
          //   Details
          // </Link>,
        ];
      },
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="REPORTS" subtitle="Evaluation Result Summary" />
      </Box>
      <CustomDatagrid rows={dummyEvalResult} columns={columns} />
    </Box>
  );
};

export default Reports;
