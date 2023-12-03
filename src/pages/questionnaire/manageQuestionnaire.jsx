import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { Grid, Tab, Tabs, Box, Button, AppBar } from "@mui/material";
import { useLocation, useParams } from "react-router";
import { useAuth } from "../../context/AuthContext";
import Header from "../../components/Header";

import { Navigate } from "react-router-dom";
import { Categories } from "../questionnaire/surveyCategories";
import { Feedback } from "../questionnaire/feedback";
import { Courses } from "../department/courses";
import { Subjects } from "../department/subjects";
import { Classes } from "../department/classes";
const ManageQuestionnaire = () => {
    // const location = useLocation();
    // const college = location?.state;
    // console.log(location);
    // const { collegeId } = useParams();
    // const { auth } = useAuth();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    // const [parsedData, setParsedData] = useState([]);
    // const [uploadOpen, setUploadOpen] = useState(false);
    // const [faculties, setFaculties] = useState([]);
    // const [students, setStudents] = useState([]);
    // const [classes, setClasses] = useState([]);
    // if (college === null || college === undefined) {
    //     return <Navigate to="/colleges" replace />;
    // }
    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header
                    title= "Version Control"
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
            <Tab label="Survey" />
            <Tab label="Feedback" />
        </Tabs>
        <TabPanel value={value} index={0}>
            <Categories />
        </TabPanel>
        <TabPanel value={value} index={1}>
            <Feedback />
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

export default ManageQuestionnaire;
