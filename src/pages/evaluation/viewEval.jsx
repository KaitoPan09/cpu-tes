import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  Tab,
  Tabs,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
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
import { FacultyEvalStatusReport } from "../../components/generatePDF/template";
import generatePdf from "../../components/generatePDF";

const View = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { evalId } = useParams();
  const location = useLocation();
  const evaluation = location.state;
  const { auth } = useAuth();
  const { request, loading } = useFetch();
  const [facultyRows, setFacultyRows] = useData(
    `/api/evaluations/${evalId}?role=${auth?.role}&type=Faculty`
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
                  rows: row.classes,
                });
                setOpen(true);
              }}
            >
              {row.student}
            </Typography>
          </Tooltip>,
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
        return [
          <Tooltip title="Click to view details">
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
          </Tooltip>,
        ];
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
      `/api/evaluations/${evalId}?role=${auth?.role}&type=${
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
  const handleGenerateReport = (rows) => {
    generatePdf(FacultyEvalStatusReport, { rows }, "test.pdf");
  };
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title={evaluation?.college}
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
        <CustomDataGrid
          getRowId={(row) => row.school_id}
          rows={facultyRows}
          columns={facultyColumns}
          loading={loading}
          handleGenerateReport={() => handleGenerateReport(facultyRows)}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CustomDataGrid
          getRowId={(row) => row.school_id}
          rows={studentRows}
          columns={studentColumns}
          loading={loading}
        />
      </TabPanel>

      {selectedEval && (
        <EvalDialog open={open} setOpen={setOpen} selectedEval={selectedEval} />
      )}
      {/* <Dialog open={true} fullWidth maxWidth="md">
        <FacultyEvalStatusReport
          rows={facultyRows}
        />
      </Dialog> */}
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
