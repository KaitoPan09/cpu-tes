import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  Tab,
  Tabs,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
  IconButton,
  Grid,
  CircularProgress,
} from "@mui/material";
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
import useFetch from "../../hooks/useFetch";
import { PDFReport } from "../../components/generatePDF/template";
import generatePdf from "../../components/generatePDF";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { ManageSearchOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const View = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { collegeId } = useParams();
  const location = useLocation();
  const evaluation = location.state;
  const { auth, userInfo } = useAuth();
  const { request, loading } = useFetch();
  const [facultyRows, setFacultyRows] = useData(
    auth?.role === "Department Head" || auth?.role === "Department Secretary"
      ? `/api/evaluations/${collegeId}?type=Faculty&dept_id=${userInfo.dept_id}`
      : `/api/evaluations/${collegeId}?type=Faculty`
  );
  // const [facultyRows, setFacultyRows] = useState([]);
  const [studentRows, setStudentRows] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectedEval, setSelectedEval] = React.useState(null);
  const facultyColumns = [
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
      field: "role",
      headerName: "Role",
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
      align: "right",
      renderCell: ({ row }) => {
        const iconStyle = { fontSize: "1.25rem" };
        return [
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography>{row.peer}</Typography>
            <Tooltip title="Click to view details">
              <IconButton
                onClick={() => {
                  setSelectedEval({
                    type: "Peer",
                    faculty: row.faculty,
                    rows: row.peers,
                  });
                  setOpen(true);
                }}
              >
                <ManageSearchOutlined sx={{ fontSize: iconStyle.fontSize }} />
              </IconButton>
            </Tooltip>
          </div>,
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
      align: "right",
      renderCell: ({ row }) => {
        const iconStyle = { fontSize: "1.25rem" };
        return [
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Typography>{row.student}</Typography>
            <Tooltip title="Click to view details">
              <IconButton
                onClick={() => {
                  setSelectedEval({
                    type: "Student",
                    faculty: row.faculty,
                    rows: row.classes,
                  });
                  setOpen(true);
                }}
              >
                <ManageSearchOutlined sx={{ fontSize: iconStyle.fontSize }} />
              </IconButton>
            </Tooltip>
          </div>,
        ];
      },
      cellClassName: (params) => {
        if (params.value === "No Students") {
          return "yellow";
        } else if (params.value === "Pending") {
          return "red";
        } else {
          return "green";
        }
      },
    },
  ];
  const studentColumns = [
    {
      field: "student",
      headerName: "Student",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "school_id",
      headerName: "School ID",
      width: 120,
    },
    {
      field: "course",
      headerName: "Course",
      width: 120,
    },
    {
      field: "year",
      headerName: "Year",
      width: 80,
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: ({ row }) => {
        return (
          <Typography
          // onClick={() => {
          //   setSelectedEval({
          //     type: "Student",
          //     faculty: row.faculty,
          //     rows: row.classes,
          //   });
          //   setOpen(true);
          // }}
          >
            {row.completed} / {row.total}
          </Typography>
        );
      },
      // cellClassName: (params) =>
      //   params.value === "Completed" ? "green" : "red",
    },
  ];
  const [columns, setColumns] = useState(facultyColumns);
  const [value, setValue] = useState(0);
  const handleChange = async (event, newValue) => {
    setValue(newValue);
    const response = await request(
      auth?.role === "Department Head" ||
        (auth?.role === "Secretary" && userInfo.dept_id != null)
        ? `/api/evaluations/${collegeId}?dept_id=${userInfo.dept_id}&type=${
            newValue === 0 ? "Faculty" : "Students"
          }`
        : `/api/evaluations/${collegeId}?type=${
            newValue === 0 ? "Faculty" : "Students"
          }`
    );
    if (response) {
      if (value === "Faculty") {
        setFacultyRows(response);
      } else {
        setStudentRows(response);
      }
    }
  };
  const componentRef = useRef();
  const handleGenerateReport = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${
      auth.role === "Dean" ? userInfo.college : userInfo.department
    }_Evaluation-Status-Report-${new Date().toLocaleDateString()}`,
  });
  // const handleGenerateReport = () => {
  //   generatePdf(componentRef);
  // };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title={
            auth?.role !== "Admin"
              ? auth?.role === "Dean"
                ? userInfo.college
                : userInfo.department
              : evaluation?.college
          }
          subtitle={
            value === 0
              ? "List of faculty members and their evaluation status"
              : "List of students with incomplete survey submissions"
          }
        />
      </Box>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="secondary"
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="Faculty" />
        <Tab label="Students" />
      </Tabs>
      <TabPanel value={value} index={0}>
        {loading ? (
          <Grid
            container
            justifyContent={"center"}
            alignContent={"center"}
            sx={{ height: "60vh" }}
          >
            <CircularProgress />
          </Grid>
        ) : (
          <CustomDataGrid
            getRowId={(row) => row.school_id}
            rows={facultyRows}
            columns={facultyColumns}
            handleGenerateReport={() => {
              // setOpenDialog(true);
              handleGenerateReport();
            }}
            generateReportText={"Generate Faculty Evaluation Status Report"}
            handleBack={handleBack}
          />
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {loading ? (
          <Grid
            container
            justifyContent={"center"}
            alignContent={"center"}
            sx={{ height: "60vh" }}
          >
            <CircularProgress />
          </Grid>
        ) : (
          <CustomDataGrid
            getRowId={(row) => row.school_id}
            rows={studentRows}
            columns={studentColumns ? studentColumns : []}
            // loading={loading}
            handleGenerateReport={() => {
              // setOpenDialog(true);
              handleGenerateReport();
            }}
            generateReportText={"Generate Student Evaluation Status Report"}
            handleBack={handleBack}
          />
        )}
      </TabPanel>

      {selectedEval && (
        <EvalDialog open={open} setOpen={setOpen} selectedEval={selectedEval} />
      )}
      {/* <Dialog open={true} fullWidth maxWidth="md">
        <FacultyEvalStatusReport
          rows={facultyRows}
        />
      </Dialog> */}
      {/* <Dialog open={openDialog} fullWidth maxWidth="md">
        <FacultyEvalStatusReport rows={facultyRows} ref={componentRef} />
        <DialogActions>
          <Button onClick={handleGenerateReport}>Generate PDF</Button>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog> */}
      <div style={{ display: "none" }}>
        {value === 0 ? (
          <PDFReport
            rows={facultyRows}
            columnHeaders={facultyColumns.map((column) => column.headerName)}
            college={
              auth?.role !== "Admin" ? userInfo.college : evaluation?.college
            }
            department={auth?.role === "Dean" ? null : userInfo.department}
            title="Faculty Evaluation Status Report"
            ref={componentRef}
          />
        ) : (
          <PDFReport
            rows={studentRows}
            columnHeaders={studentColumns.map((column) => column.headerName)}
            college={
              auth?.role !== "Admin" ? userInfo.college : evaluation?.college
            }
            department={auth?.role === "Dean" ? null : userInfo.department}
            title="Student Evaluation Status Report"
            ref={componentRef}
          />
        )}
      </div>
    </Box>
  );
};
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ px: 2, pt: 1 }}>{children}</Box>}
    </div>
  );
}
export default View;
