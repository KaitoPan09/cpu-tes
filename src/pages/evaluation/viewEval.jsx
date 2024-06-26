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
import ClassesPopover from "./classesPopover";

const View = () => {
  const navigate = useNavigate();

  const { collegeId } = useParams();
  const location = useLocation();
  const evaluation = location.state;
  const { auth, userInfo } = useAuth();
  const { request, loading } = useFetch();
  const [facultyRows, setFacultyRows] = useData(
    auth?.role === "Department Head" || auth?.role === "Department Secretary"
      ? `/api/evaluations/${collegeId}?type=Faculty&dept_id=${userInfo.dept_id}`
      : auth.role === "Dean" || auth.role === "College Secretary"
      ? `/api/evaluations/${userInfo.college_id}?type=Faculty`
      : `/api/evaluations/${collegeId}?type=Faculty`
  );
  // const [facultyRows, setFacultyRows] = useState([]);
  const [studentRows, setStudentRows] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectedEval, setSelectedEval] = React.useState(null);
  const facultyColumns = [
    { field: "id" },
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
      headerName: "Classes",
      width: 140,
      align: "right",
      renderCell: (params) => {
        const iconStyle = { fontSize: "1.25rem" };
        // const classes = facultyRows.find(
        //   (faculty) => faculty.id === params.row.id
        // )?.classes;

        const faculty = facultyRows.find(
          (faculty) => faculty.id === params.row.id
        );
      
        // Retrieve classes array
        const classes = faculty?.classes || [];

        // Calculate the number of classes
        const numberOfClasses = classes.length;

        // Calculate the number of classes with a score of 50% or greater
        const surveyThreshold = classes.filter(row => {
          const completionRate = (row.completed / row.students) * 100;
          return completionRate >= 50;
        }).length;

        // Determine the value to display
        const classValue = surveyThreshold + '/' + numberOfClasses;
  
        return [
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            {/* <Typography>{params.row.student}</Typography> */}
            {params.value === "No Students" ? (
              <Typography>{params.value}</Typography>
            ) : (
              // <ClassesPopover classes={classes} status={params.row.student} />
              <ClassesPopover classes={classes} status={classValue} />
            )}
            <Tooltip title="Click to view details">
              <IconButton
                onClick={() => {
                  console.log(params);
                  setSelectedEval({
                    id: params.row.id,
                    type: "Student",
                    faculty: params.row.faculty,
                    rows: params.row.classes,
                    completed: params.row.n_students_completed,
                    pending: params.row.n_students_pending,
                  });
                  setOpen(true);
                }}
                disabled={params.value === "No Students"}
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
    { field: "n_students_completed" },
    { field: "n_students_pending" },
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
        (auth?.role === "Department Secretary" && userInfo.dept_id != null)
        ? `/api/evaluations/${userInfo.college_id}?dept_id=${
            userInfo.dept_id
          }&type=${newValue === 0 ? "Faculty" : "Students"}`
        : auth.role === "Dean" || auth.role === "College Secretary"
        ? `/api/evaluations/${userInfo.college_id}?type=${
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
              ? auth?.role === "Dean" || auth?.role === "College Secretary"
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
            getRowId={(row) => row.id}
            rows={facultyRows}
            columns={facultyColumns}
            handleGenerateReport={() => {
              // setOpenDialog(true);
              handleGenerateReport();
            }}
            generateReportText={"Generate Faculty Evaluation Status Report"}
            handleBack={handleBack}
            columnVisibilityModel={{
              id: false,
              n_students_pending: false,
              n_students_completed: false,
            }}
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
        <EvalDialog
          open={open}
          setOpen={setOpen}
          selectedEval={selectedEval}
          setSelectedEval={setSelectedEval}
        />
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
