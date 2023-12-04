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
import { Faculty } from "./faculty";
import { Students } from "./students";
import { Courses } from "./courses";
import { Subjects } from "./subjects";
import { Classes } from "./classes";
import { Navigate } from "react-router-dom";
const ManageDepartment = () => {
  const location = useLocation();
  const dept_id = useParams();
  const { auth, userInfo } = useAuth();
  const department = location?.state ? location.state.department : userInfo.department;
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [parsedData, setParsedData] = useState([]);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [faculties, setFaculties] = useState([]);
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  // if (department === null || department === undefined) {
  //   return <Navigate to="/departments" replace />;
  // }
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title={department}
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
        {/* <Tab label="Students" /> */}
        {/* <Tab label="Courses" /> */}
        <Tab label="Subjects" />
        <Tab label="Classes" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Faculty />
      </TabPanel>
      {/* <TabPanel value={value} index={1}>
        <Students students={students} setStudents={setStudents} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Courses />
      </TabPanel> */}
      <TabPanel value={value} index={1}>
        <Subjects />
      </TabPanel>
      <TabPanel value={value} index={2}>
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

export default ManageDepartment;
