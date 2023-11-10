import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { Grid, Tab, Tabs, Box, Button, AppBar } from "@mui/material";
// import Faculty from "../Pages/Faculty";
// import Students from "../Pages/Students";
// import Course from "../Pages/Course";
// import Class from "../Pages/Class";
// import Subject from "../Pages/Subject";
// import ImportCSV from "./ImportCSV";
// import useAuth from "../Hooks/useAuth";
import { useLocation, useParams } from "react-router";
import { useAuth } from "../../context/AuthContext";
import Header from "../../components/Header";

import { Navigate } from "react-router-dom";
import { Faculty } from "../department/faculty";
import { Students } from "../department/students";
import { Courses } from "../department/courses";
import { Subjects } from "../department/subjects";
import { Classes } from "../department/classes";
const ManageCollege = () => {
  const location = useLocation();
  const college = location?.state;
  console.log(location);
  const { collegeId } = useParams();
  const { auth } = useAuth();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [parsedData, setParsedData] = useState([]);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [faculties, setFaculties] = useState([]);
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  if (college === null || college === undefined) {
    return <Navigate to="/colleges" replace />;
  }
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title={college.college}
          //subtitle={department.department}
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
        <Tab label="Faculties" />
        <Tab label="Students" />
        <Tab label="Courses" />
        <Tab label="Subjects" />
        <Tab label="Classes" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Faculty />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Students />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Courses />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Subjects />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Classes />
      </TabPanel>
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

export default ManageCollege;
