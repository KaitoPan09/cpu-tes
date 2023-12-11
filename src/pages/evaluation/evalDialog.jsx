import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import React from "react";
import CustomDataGrid from "../../components/CustomDatagrid";
import { useState } from "react";
import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { useAuth } from "../../context/AuthContext";
import { useLocation, useParams } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { PDFReport } from "../../components/generatePDF/template";
const colStudEval = [
  { field: "school_id", headerName: "School ID", width: 100 },
  { field: "name", headerName: "Name", flex: 1, minWidth: 180 },
  { field: "email", headerName: "Email", flex: 1, minWidth: 180 },
  { field: "course", headerName: "Course", width: 90 },
  { field: "year_level", headerName: "Year", width: 40 },
  // { field: "stub_code", headerName: "Stub Code", width: 80 },
  // { field: "subject_code", headerName: "Subject", width: 100 },
  {
    field: "eval",
    headerName: "Status",
    width: 100,
    valueGetter: (params) => {
      if (params.value) {
        return "Completed";
      }
      return "Pending";
    },
  },
];
const colPeerEval = [
  { field: "school_id", headerName: "School ID", flex: 1 },
  { field: "name", headerName: "Name", flex: 2 },
  { field: "email", headerName: "Email", flex: 2 },
  {
    field: "eval",
    headerName: "Status",
    flex: 1,
    valueGetter: (params) => {
      if (params.value) {
        return "Completed";
      }
      return "Pending";
    },
  },
];
export const EvalDialog = ({
  open,
  setOpen,
  selectedEval,
  setSelectedEval,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { request, loading } = useFetch();
  const { auth, userInfo } = useAuth();
  const [selectedClass, setSelectedClass] = useState(
    selectedEval.type === "Student" ? selectedEval.rows[0] : {}
  );
  const [classes, setClasses] = useState(
    selectedEval.type === "Student" ? selectedEval.rows : []
  );
  const [students, setStudents] = useState([]);
  const [faculties, setFaculties] = useState(
    selectedEval.type === "Faculty" ? selectedEval.rows : []
  );
  const [rows, setRows] = useState([]);
  const [column, setColumn] = useState([]);
  const { collegeId } = useParams();
  const getStudentEvalProgress = async () => {
    const students = await request(
      auth?.role === "Department Head" || auth?.role === "Department Secretary"
        ? `/api/evaluations/student_eval_progress?college_id=${collegeId}&faculty_id=${selectedEval.id}`
        : `/api/evaluations/student_eval_progress?college_id=${collegeId}&faculty_id=${selectedEval.id}`
    );
    if (students) {
      const class_students = students.filter(
        (student) => student.class_id === selectedEval.rows[0].id
      );
      setStudents(students);
      setRows(class_students);
      setColumn(colStudEval);
    }
  };
  useEffect(() => {
    if (selectedEval.type === "Student") {
      setClasses(selectedEval.rows);
      setSelectedClass(selectedEval.rows[0]);
      getStudentEvalProgress();
    } else {
      setFaculties(selectedEval.rows);
      setRows(selectedEval.rows);
      setColumn(colPeerEval);
    }
  }, [selectedEval]);
  const [status, setStatus] = useState("All");
  const handleClose = () => {
    setSelectedEval(null);
    setStatus("All");
    setSelectedClass({});
    setRows([]);
    setOpen(false);
  };
  const [facultyReportRows, setFacultyReportRows] = useState([]);
  const location = useLocation();
  const evaluation = location.state;
  const componentRef = useRef();
  const generateReport = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${
      auth?.role !== "Admin"
        ? auth?.role === "Dean"
          ? userInfo.college
          : userInfo.department
        : evaluation?.college
    }_Evaluation-Status-Report-${
      selectedEval.faculty
    }-${new Date().toLocaleDateString()}`,
  });
  const handleGenerateReport = () => {
    const reportRows = classes.map((row) => {
      return {
        subject: row.subject_code + " : " + row.subject,
        stub_code: row.stub_code,
        completed: row.completed,
        pending: row.pending,
        total: row.students,
      };
    });
    setFacultyReportRows(reportRows);
    generateReport();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
        <DialogTitle>
          <Grid container spacing={2} justifyContent={"flex-start"}>
            <Grid item>
              <Typography variant="h5" color={"text.secondary"}>
                Evaluation Type:
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5" color={"primary"}>
                {selectedEval.type}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5" color={"text.secondary"}>
                Faculty:
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5" color={"primary"}>
                {selectedEval.faculty}
              </Typography>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            {selectedEval.type === "Student" && classes && (
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel id="demo-simple-select-label">
                    Select a Class
                  </InputLabel>
                  <Select
                    label={"Select a Class"}
                    value={selectedClass ? selectedClass : {}}
                    onChange={(e) => {
                      const class_ = e.target.value;
                      setSelectedClass(class_);
                      const class_students = students.filter(
                        (student) => student.class_id === class_.id
                      );
                      setRows(class_students);
                      setStatus("All");
                    }}
                  >
                    {classes.map((option, index) => {
                      // console.log(option);
                      return (
                        <MenuItem key={index} value={option}>
                          {option.stub_code +
                            " - " +
                            option.subject_code +
                            " - " +
                            option.subject}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  {/* <FormHelperText>
                  Stub - Subject - No. of Students
                </FormHelperText> */}
                </FormControl>
              </Grid>
            )}
            {selectedEval.type === "Student" && students && (
              <Grid item xs={12} sm={6}>
                <FormControl sx={{ mt: 2, ml: 2 }}>
                  <FormLabel>Status</FormLabel>
                  <RadioGroup
                    row
                    value={status}
                    onChange={(e) => {
                      let status = e.target.value;
                      setStatus(status);
                      if (status === "Completed") {
                        if (selectedEval.type === "Student") {
                          const filteredStudents = students.filter(
                            (student) =>
                              student.eval &&
                              student.class_id === selectedClass.id
                          );
                          console.log(filteredStudents);
                          setRows(filteredStudents);
                        } else {
                          const filteredFaculties = faculties.filter(
                            (faculty) => faculty.eval === true
                          );
                          setRows(filteredFaculties);
                        }
                      }
                      if (status === "Pending") {
                        if (selectedEval.type === "Student") {
                          const filteredStudents = students.filter(
                            (student) =>
                              student.eval === false &&
                              student.class_id === selectedClass.id
                          );
                          setRows(filteredStudents);
                        } else {
                          const filteredFaculties = faculties.filter(
                            (faculty) => faculty.eval === false
                          );
                          setRows(filteredFaculties);
                        }
                      }
                      if (status === "All") {
                        if (selectedEval.type === "Student") {
                          const filteredStudents = students.filter(
                            (student) => student.class_id === selectedClass.id
                          );
                          setRows(filteredStudents);
                        } else {
                          const filteredFaculties = faculties.filter(
                            (faculty) =>
                              faculty.eval === false || faculty.eval === true
                          );
                          setRows(filteredFaculties);
                        }
                      }
                    }}
                  >
                    <FormControlLabel
                      value="All"
                      control={<Radio />}
                      label="All"
                    />
                    <FormControlLabel
                      value="Completed"
                      control={<Radio />}
                      label="Completed"
                    />
                    <FormControlLabel
                      value="Pending"
                      control={<Radio />}
                      label="Pending"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            )}
            {selectedEval.type === "Student" && (
              <Grid
                item
                xs={12}
                container
                spacing={2}
                justifyContent={"flex-start"}
              >
                <Grid item>
                  <Typography variant="h5" color={"text.secondary"}>
                    No. of Students:
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h5" fontWeight={700} color={"primary"}>
                    {selectedClass.students}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h5" color={"text.secondary"}>
                    Completed:
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="h5"
                    fontWeight={700}
                    color={colors.greenAccent[500]}
                  >
                    {selectedClass.completed}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h5" color={"text.secondary"}>
                    Pending:
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="h5"
                    fontWeight={700}
                    color={colors.redAccent[500]}
                  >
                    {selectedClass.pending}
                  </Typography>
                </Grid>
              </Grid>
            )}
            <Grid item xs={12}>
              <CustomDataGrid
                getRowId={(row) => row.school_id}
                // rows={selectedEval.type === "Student" ? students : faculties}
                loading={loading}
                rows={rows}
                columns={
                  selectedEval.type === "Student" ? colStudEval : colPeerEval
                }
                handleGenerateReport={
                  selectedEval.type === "Student" ? handleGenerateReport : null
                }
                generateReportText={
                  selectedEval.type === "Student"
                    ? "Generate Class Evaluation Status Report"
                    : null
                }
                getCellClassName={(params) => {
                  if (params.field === "eval") {
                    return params.value === "Completed" ? "green" : "red";
                  }
                  return "";
                }}
              />
            </Grid>
          </Grid>
          {/* <DataGrid
          getRowId={(row) => row.school_id}
          disableMultipleSelection={true}
          rows={rowEval}
          columns={colEval}
          sx={{
            boxShadow: 1,
            border: 1,
            borderColor: "black",
            "& .MuiDataGrid-cell:hover": {
              color: "primary.main",
            },
          }}
          getCellClassName={(params) => {
            if (params.field === "eval") {
              return params.value == "Completed" ? "completed" : "pending";
            }
            return "";
          }}
        /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      <div style={{ display: "none" }}>
        {facultyReportRows.length > 0 && (
          <PDFReport
            rows={facultyReportRows}
            columnHeaders={[
              "Subject",
              "Stub Code",
              "Completed",
              "Pending",
              "Total",
            ]}
            college={
              auth?.role !== "Admin" ? userInfo.college : evaluation?.college
            }
            department={auth?.role === "Dean" ? null : userInfo.department}
            title="Class Evaluation Status Report"
            ref={componentRef}
            faculty={selectedEval.faculty}
          />
        )}
      </div>
    </>
  );
};
