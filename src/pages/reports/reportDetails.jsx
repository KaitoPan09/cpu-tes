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
  Alert,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
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
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { evalId } = useParams();
  const location = useLocation();
  const { auth, userInfo } = useAuth();
  const college =
    auth.role === "Admin" ? location.state?.college : userInfo.college;
  const [rows, setRows] = useData(
    auth.role === "Department Head" || auth.role === "Department Secretary"
      ? `/api/evaluations/results?evaluation_id=${evalId}&&dept_id=${userInfo.dept_id}`
      : `/api/evaluations/results?evaluation_id=${evalId}`
  );
  const [open, setOpen] = useState(false);
  const [dialogData, setDialogData] = React.useState(null);
  const [tabValue, setTabValue] = React.useState(0);
  const [facultyTabValue, setFacultyTabValue] = useState("");
  const [selectedResult, setSelectResult] = useState(null);
  const handleOpenDialog = (rowData, tabValue, facultyTabValue) => {
    setTabValue(tabValue);
    setFacultyTabValue(facultyTabValue);
    setDialogData(rowData);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleBack = () => {
    navigate(-1);
  };

  const columns = [
    {
      field: "faculty",
      headerName: "Faculty",
      flex: 1,
      minWidth: 175,
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
            <Tooltip title="Click to view details">
              <Button
                variant="text"
                tabIndex={params.hasFocus ? 0 : -1}
                onClick={() => {
                  handleOpenDialog(params.row, 0);
                }}
                color={params.value >= 4.2 ? "success" : "error"}
                endIcon={
                  <ManageSearchOutlined sx={{ fontSize: iconStyle.fontSize }} />
                }
              >
                {params.value.toFixed(2)}
              </Button>
            </Tooltip>,
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
      field: "n_students",
    },
    {
      field: "n_student_surveys",
    },
    {
      field: "response_rate",
      headerName: "Response Rate (%)",
      width: 140,
      headerAlign: "right",
      align: "right",
      valueFormatter: (params) => {
        if (params.value == null) {
          return 0.0;
        }
        return params.value.toFixed(2);
      },
      cellClassName: (params) => {
        if (params.value <= 70) {
          return "red";
        } else {
          return "green";
        }
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
            <Tooltip title="Click to view details">
              <Button
                variant="text"
                tabIndex={params.hasFocus ? 0 : -1}
                onClick={() => {
                  handleOpenDialog(params.row, 1, "supervisor");
                }}
                color={params.value >= 4.2 ? "success" : "error"}
                endIcon={
                  <ManageSearchOutlined sx={{ fontSize: iconStyle.fontSize }} />
                }
              >
                {params.value.toFixed(2)}
              </Button>
            </Tooltip>,
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
            <Tooltip title="Click to view details">
              <Button
                variant="text"
                tabIndex={params.hasFocus ? 0 : -1}
                onClick={() => {
                  handleOpenDialog(params.row, 1, "peer");
                }}
                color={params.value >= 4.2 ? "success" : "error"}
                endIcon={
                  <ManageSearchOutlined sx={{ fontSize: iconStyle.fontSize }} />
                }
              >
                {params.value.toFixed(2)}
              </Button>
            </Tooltip>,
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
            <Tooltip title="Click to view details">
              <Button
                variant="text"
                tabIndex={params.hasFocus ? 0 : -1}
                onClick={() => {
                  handleOpenDialog(params.row, 1, "self");
                }}
                color={params.value >= 4.2 ? "success" : "error"}
                endIcon={
                  <ManageSearchOutlined sx={{ fontSize: iconStyle.fontSize }} />
                }
              >
                {params.value.toFixed(2)}
              </Button>
            </Tooltip>,
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
            <Tooltip title="Click to view details">
              <Button
                variant="text"
                tabIndex={params.hasFocus ? 0 : -1}
                onClick={() => {
                  handleOpenDialog(params.row, 2);
                }}
                color={params.value >= 0.5 ? "success" : "error"}
                endIcon={
                  <ManageSearchOutlined sx={{ fontSize: iconStyle.fontSize }} />
                }
              >
                {params.value.toFixed(2)}
              </Button>
            </Tooltip>,
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
  const handleExport = () => {
    setOpenExportDialog(true);
  };
  const exportResults = async () => {
    // console.log({
    //   filter: filterValue,
    //   faculty_id: selectedFaculty,
    //   include_question_ratings: checked,
    // });
    setOpenExportDialog(false);
    setLoading(true);
    showLoader();
    await fetch(
      `/api/utils/evaluation/${evalId}/export_evaluation_results?eval_type=${evalType}`,
      {
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
      }
    )
      .then((response) => {
        if (response.ok) {
          response.blob().then((blob) => {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute(
              "download",
              `${college}_Evaluation-Results-${evalType}-${new Date().toLocaleDateString()}.xlsx`
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
  const [evalType, setEvalType] = useState("Student");
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
            (auth.role !== "Department Head" ||
            auth.role !== "Department Secretary"
              ? college
              : userInfo.department)
          }
        />
      </Box>
      <CustomDatagrid
        rows={rows}
        columns={columns}
        columnVisibilityModel={{
          student_turnout: true,
          n_students: false,
          n_student_surveys: false,
        }}
        handleGenerateReport={handleGenerateReport}
        generateReportText={"Generate Evaluation Summary Report"}
        handleExport={handleExport}
        handleBack={handleBack}
      />
      {open && (
        <ReportDialog
          open={open}
          handleClose={handleClose}
          dialogData={dialogData}
          tabValue={tabValue}
          setTabValue={setTabValue}
          facultyTabValue={facultyTabValue}
          setFacultyTabValue={setFacultyTabValue}
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
      <Dialog
        open={openExportDialog}
        onClose={() => setOpenExportDialog(false)}
      >
        <DialogTitle>
          <Typography variant="h4">Export Evaluation Results </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="h5">
            This will export the evaluation results of all faculty members in{" "}
            {college} under the college
          </Typography>
          <Alert severity="info" sx={{ my: 2 }}>
            Department Heads can only export the evaluation results of faculty
            members from their own department.
          </Alert>
          <FormControl fullWidth required>
            <InputLabel>Select type of evaluation results</InputLabel>
            <Select
              label={"Select type of evaluation results"}
              value={evalType}
              onChange={(e) => {
                setEvalType(e.target.value);
              }}
            >
              <MenuItem value={"Student"}>Student</MenuItem>
              <MenuItem value={"Faculty"}>
                Faculty (supervisor, peer, and self)
              </MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenExportDialog(false)}>Cancel</Button>
          <Button onClick={exportResults} disabled={loading}>
            Export
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Details;
