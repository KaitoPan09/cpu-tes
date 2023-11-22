import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  ListItemText,
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { dummyreportDeets, dummyBarBreakdown } from "../../data/dummyData";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import Header from "../../components/Header";
import { useTheme } from "@emotion/react";
import { Link, useParams } from "react-router-dom";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import BarGraph from "../../components/BarGraph";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import CustomDatagrid from "../../components/CustomDatagrid";
import ReportDialog from "./reportDialog.jsx";
import useData from "../../hooks/useData.js";

// const CustomToolbar = () => {

//     return (
//         <GridToolbarContainer>
//             <GridToolbarColumnsButton />
//             <GridToolbarFilterButton />
//             <GridToolbarDensitySelector />
//             <Link to="/reports">
//                 <Button
//                     color="primary"
//                     startIcon={<ArrowBackOutlinedIcon />}
//                     sx={{
//                         padding: "4px 5px",
//                         fontSize: "0.6964285714285714rem"
//                     }}
//                     >
//                     RETURN
//                 </Button>
//             </Link>
//         </GridToolbarContainer>
//     )
// }

const reportsData = (rowData) => {
  return {
    category: rowData.category,
    student: rowData.student,
    supervisor: rowData.supervisor,
    peer: rowData.peer,
    self: rowData.self,
    // Add more fields as needed
  };
};

const Details = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { evalId } = useParams();
  const [rows, setRows] = useData(
    `/api/evaluations/results?evaluation_id=${evalId}`
  );
  const [open, setOpen] = useState(false);
  const [dialogData, setDialogData] = React.useState(null);
  const handleOpenDialog = (rowData) => {
    const dataForBarGraph = reportsData(rowData);
    setDialogData({ ...rowData, barData: dataForBarGraph });
    // setDialogData(rowData)
    setOpen(true);
  };
  useEffect(() => {
    if (open) {
      setDialogData(dialogData);
    }
  }, [open]);
  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    {
      field: "faculty",
      headerName: "Faculty",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "school_id",
      headerName: "School ID",
      width: 120,
    },
    {
      field: "student",
      headerName: "Student",
      description: "60%",
      width: 120,
      headerAlign: "right",
      align: "right",
      valueFormatter: (params) => {
        return params.value.toFixed(2);
      },
    },
    {
      field: "supervisor",
      headerName: "Supervisor",
      description: "30%",
      width: 120,
      headerAlign: "right",
      align: "right",
      valueFormatter: (params) => {
        return params.value.toFixed(2);
      },
    },
    {
      field: "peer",
      headerName: "Peer",
      description: "5%",
      width: 120,
      headerAlign: "right",
      align: "right",
      valueFormatter: (params) => {
        return params.value.toFixed(2);
      },
    },
    {
      field: "self",
      headerName: "Self",
      description: "5%",
      width: 120,
      headerAlign: "right",
      align: "right",
      valueFormatter: (params) => {
        return params.value.toFixed(2);
      },
    },
    {
      field: "sentiment_score",
      headerName: "Sentiment",
      width: 120,
      headerAlign: "right",
      align: "right",
      valueFormatter: (params) => {
        // return params.value >= 0.5 ? "Positive" : "Negative";
        if (isNaN(params.value)) {
          return params.value;
        }
        return params.value.toFixed(2);
      },
      cellClassName: (params) => {
        if (params.value < 0.5) {
          return "red";
        } else if (params.value > 0.5) {
          return "green";
        } else {
          return "yellow";
        }
      },
    },
    {
      field: "final_rating",
      headerName: "Final Rating",
      width: 120,
      headerAlign: "right",
      align: "right",
      valueFormatter: (params) => {
        return params.value.toFixed(2);
      },
      cellClassName: (params) => {
        const rating = parseFloat(params.value);
        if (!isNaN(rating) && rating < 4.2) {
          return "red";
        } else {
          return "green";
        }
      },
    },
    {
      field: "bar",
      type: "actions",
      headerName: "Graph",
      width: 80,
      cellClassName: "bar",
      getActions: (params) => {
        const iconStyle = { fontSize: "1.25rem" };
        return [
          <Tooltip title="Bar Graph">
            <IconButton onClick={() => handleOpenDialog(params.row)}>
              <FactCheckOutlinedIcon sx={{ fontSize: iconStyle.fontSize }} />
            </IconButton>
          </Tooltip>,
        ];
      },
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="CURRENTLY VIEWING"
          subtitle="Viewing Details for Survey Placeholder"
        />
      </Box>
      <CustomDatagrid rows={rows} columns={columns} />
      {open && (
        <ReportDialog
          open={open}
          handleClose={handleClose}
          dialogData={dialogData}
        />
      )}
    </Box>
  );
};

export default Details;
