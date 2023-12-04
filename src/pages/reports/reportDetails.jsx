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
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import BarGraph from "../../components/BarGraph";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import CustomDatagrid from "../../components/CustomDatagrid";
import ReportDialog from "./reportDialog.jsx";
import useData from "../../hooks/useData.js";
import { useAuth } from "../../context/AuthContext/index.jsx";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { PDFReport } from "../../components/generatePDF/template.jsx";
import Cookies from "js-cookie";
import useFetch from "../../hooks/useFetch.jsx";
import { useAppContext } from "../../context/AppContext/index.jsx";
import { ManageSearchOutlined } from "@mui/icons-material";

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

// const reportsData = (rowData) => {
//   return {
//     category: rowData.category,
//     student: rowData.student,
//     supervisor: rowData.supervisor,
//     peer: rowData.peer,
//     self: rowData.self,
//     // Add more fields as needed
//   };
// };

const Details = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { evalId } = useParams();
  const location = useLocation();
  const { auth, userInfo } = useAuth();
  const college =
    auth.role === "Admin" ? location.state?.college : userInfo.college;
  const [rows, setRows] = useData(
    auth.role === "Department Head"
      ? `/api/evaluations/results?evaluation_id=${evalId}&&dept_id=${userInfo.dept_id}`
      : `/api/evaluations/results?evaluation_id=${evalId}`
  );
  const [open, setOpen] = useState(false);
  const [dialogData, setDialogData] = React.useState(null);
  const [tabValue, setTabValue] = React.useState(0);
  const [selectedResult, setSelectResult] = useState(null);
  const handleOpenDialog = (rowData, tabValue) => {
    setTabValue(tabValue);
    setDialogData(rowData);
    setOpen(true);
  };
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
      headerAlign: "center",
      align: "right",
      renderCell: (params) => {
        const iconStyle = { fontSize: "1.25rem" };
        if (params.value == null) {
          return "Pending";
        } else {
          return [
            <Tooltip title="Click to view student details">
              <Button
                variant="text"
                tabIndex={params.hasFocus ? 0 : -1}
                onClick={() => {
                  handleOpenDialog(params.row, 0);
                }}
                color={params.value >= 4.2 ? "success" : "error"}
              >
                {params.value.toFixed(2)}
                <ManageSearchOutlined sx={{ fontSize: iconStyle.fontSize }} />
              </Button>
            </Tooltip>
          ];
        }
      },
      cellClassName: (params) => {
        if (params.value == null) {
          return "yellow";
        }
      },
    },
    {
      field: "student_turnout",
      headerName: "Response Rate",
      width: 120,
      headerAlign: "right",
      align: "right",
      visible: false,
      valueFormatter: (params) => {
        if (params.value == null) {
          return 0.0;
        }
        return params.value.toFixed(2) + " %";
      },
    },
    {
      field: "supervisor",
      headerName: "Supervisor",
      description: "30%",
      width: 120,
      headerAlign: "right",
      align: "right",
      renderCell: (params) => {
        const iconStyle = { fontSize: "1.25rem" };
        if (params.value == null) {
          return "Pending";
        } else {
          return [
            <Tooltip title="Click to view student details">
              <Button
                variant="text"
                tabIndex={params.hasFocus ? 0 : -1}
                onClick={() => {
                  handleOpenDialog(params.row, 1);
                }}
                color={params.value >= 4.2 ? "success" : "error"}
              >
                {params.value.toFixed(2)}
                <ManageSearchOutlined sx={{ fontSize: iconStyle.fontSize }} />
              </Button>
            </Tooltip>
          ];
        }
      },
      cellClassName: (params) => {
        if (params.value == null) {
          return "yellow";
        }
      },
    },
    {
      field: "peer",
      headerName: "Peer",
      description: "5%",
      width: 120,
      headerAlign: "right",
      align: "right",
      renderCell: (params) => {
        const iconStyle = { fontSize: "1.25rem" };
        if (params.value == null) {
          return <Typography variant="body2">Pending</Typography>;
        } else {
          return [
            <Tooltip title="Click to view student details">
              <Button
                variant="text"
                tabIndex={params.hasFocus ? 0 : -1}
                onClick={() => {
                  handleOpenDialog(params.row, 1);
                }}
                color={params.value >= 4.2 ? "success" : "error"}
              >
                {params.value.toFixed(2)}
                <ManageSearchOutlined sx={{ fontSize: iconStyle.fontSize }} />
              </Button>
            </Tooltip>
          ];
        }
      },
      cellClassName: (params) => {
        if (params.value == null) {
          return "yellow";
        }
      },
    },
    {
      field: "self",
      headerName: "Self",
      description: "5%",
      width: 120,
      headerAlign: "right",
      align: "right",
      renderCell: (params) => {
        const iconStyle = { fontSize: "1.25rem" };
        if (params.value == null) {
          return "Pending";
        } else {
          return [
            <Tooltip title="Click to view student details">
              <Button
                variant="text"
                tabIndex={params.hasFocus ? 0 : -1}
                onClick={() => {
                  handleOpenDialog(params.row, 1);
                }}
                color={params.value >= 4.2 ? "success" : "error"}
              >
                {params.value.toFixed(2)}
                <ManageSearchOutlined sx={{ fontSize: iconStyle.fontSize }} />
              </Button>
            </Tooltip>
          ];
        }
      },
      cellClassName: (params) => {
        if (params.value == null) {
          return "yellow";
        }
      },
    },
    {
      field: "sentiment_score",
      headerName: "Sentiment",
      width: 120,
      headerAlign: "right",
      align: "right",
      renderCell: (params) => {
        const iconStyle = { fontSize: "1.25rem" };
        // return params.value >= 0.5 ? "Positive" : "Negative";
        if (params.value == null) {
          return "No comments";
        } else {
          return [
            <Tooltip title="Click to view student details">
              <Button
                variant="text"
                tabIndex={params.hasFocus ? 0 : -1}
                onClick={() => {
                  handleOpenDialog(params.row, 2);
                }}
                color={params.value >= 0.5 ? "success" : "error"}
              >
                {params.value.toFixed(2)}
                <ManageSearchOutlined sx={{ fontSize: iconStyle.fontSize }} />
              </Button>
            </Tooltip>
          ];
        }
      },
      cellClassName: (params) => {
        if (params.value == null) {
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
            <IconButton onClick={() => handleOpenDialog(params.row, 0)}>
              <FactCheckOutlinedIcon sx={{ fontSize: iconStyle.fontSize }} />
            </IconButton>
          </Tooltip>,
        ];
      },
    },
  ];
  const componentRef = useRef();
  const handleGenerateReport = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${college}_Evaluation-Report-Summary-${new Date().toLocaleDateString()}`,
  });
  const [loading, setLoading] = useState(false);
  const { showLoader, hideLoader } = useAppContext();
  const [openExportDialog, setOpenExportDialog] = useState(false);

  const exportResults = async () => {
    // console.log({
    //   filter: filterValue,
    //   faculty_id: selectedFaculty,
    //   include_question_ratings: checked,
    // });
    setLoading(true);
    showLoader();
    await fetch(`/api/utils/evaluation/${evalId}/export_evaluation_results`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-csrf-token": Cookies.get("csrf_access_token"),
      },
      body: JSON.stringify({
        // faculty_id: selectedFaculty,
        include_question_ratings: true,
        eval_type: "Student",
      }),
    })
      .then((response) => {
        if (response.ok) {
          response.blob().then((blob) => {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute(
              "download",
              `${college}_Evaluation-Results-${new Date().toLocaleDateString()}.xlsx`
            );
            document.body.appendChild(link);
            link.click();
            link.remove();
          });
          handleClose();
        } else {
          // Handle the error response here
          throw new Error("Something went wrong. Please try again later.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
    hideLoader();
    // let response = await fetch(
    //   `/api/evaluation/${eval_id}/export_evaluation_results`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "x-csrf-token": Cookies.get("csrf_access_token"),
    //     },
    //   }
    // );
  };
  if (auth.role === "Admin" && college === undefined) {
    return <Navigate to="/reports" />;
  }
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title={college}
          subtitle={
            "Evaluation Summary for " +
            (auth.role !== "Department Head" ? college : userInfo.department)
          }
        />
      </Box>
      <CustomDatagrid
        rows={rows}
        columns={columns}
        columnVisibilityModel={{
          student_turnout: false,
        }}
        handleGenerateReport={() => handleGenerateReport()}
        handleExport={() => exportResults()}
      />
      {open && (
        <ReportDialog
          open={open}
          handleClose={handleClose}
          dialogData={dialogData}
          tabValue={tabValue}
          setTabValue={setTabValue}
        />
      )}
      <div style={{ display: "none" }}>
        <PDFReport
          rows={rows}
          columnHeaders={columns
            .filter((column) => column.type !== "actions")
            .map((column) => column.headerName)}
          college={college}
          title="Evaluation Summary Report"
          ref={componentRef}
        />
      </div>
    </Box>
  );
};

export default Details;
