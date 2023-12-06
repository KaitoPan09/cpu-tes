import {
  Box,
  useTheme,
  Typography,
  Button,
  Menu,
  MenuItem,
  TextField,
  Grid,
  Card,
  Paper,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import BarGraph from "../../components/BarGraph";
import { dummyUpdates } from "../../data/dummyData";
import { Link } from "react-router-dom";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { AdminDashboard } from "./adminDashboard";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { request } = useFetch();
  const [evalInfo, setEvalInfo] = useState({});

  useEffect(() => {
    (async () => {
      let response = {};
      if (auth.role === "Student") {
        response = await request(
          `/api/evaluations/students/dashboard?student_id=${userInfo.student_id}&user_id=${userInfo.user_id}&college_id=${userInfo.college_id}`
        );
      } else if (auth.role !== "Admin" && auth.role !== "Department Secretary" && auth.role !== "College Secretary") {
        response = await request(
          `/api/evaluations/faculty/dashboard?role=${auth.role}&user_id=${userInfo.user_id}&college_id=${userInfo.college_id}&dept_id=${userInfo.dept_id}`
        );
      }
      if (response) setEvalInfo(response);
    })();
  }, []);

  const { auth, userInfo, academicYear } = useAuth();
  return (
    <Box m="20px">
      <Header title="DASHBOARD" subtitle={`Welcome, ${auth.role}`} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ backgroundColor: "primary.sub" }}>
            <Grid container spacing={2} p={2}>
              <Grid item xs={12} md={6}>
                <Typography
                  variant="h4"
                  fontWeight={700}
                  color={colors.grey[100]}
                >
                  {userInfo.name}
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight={700}
                  color={colors.yellowAccent[500]}
                >
                  SCHOOL ID: {auth.school_id}
                </Typography>
              </Grid>
              {auth.role === "Student" && (
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="h4"
                    fontWeight={700}
                    color={colors.grey[100]}
                  >
                    {userInfo.course + " - " + userInfo.year_level}
                  </Typography>
                  <Typography
                    // color={"text.secondary"}
                    color={colors.yellowAccent[500]}
                    variant="h6"
                    fontWeight={700}
                  >
                    COURSE AND YEAR
                  </Typography>
                </Grid>
              )}
              {auth.role !== "Student" && auth.role !== "Admin" && (
                <Grid item xs={12} md={6}>
                  <Typography variant="h4" fontWeight={700}>
                    {userInfo.college ? userInfo.college : ""}
                    {userInfo.college && userInfo.department ? " - " : ""}
                    {userInfo.department ? userInfo.department : ""}
                  </Typography>
                  <Typography
                    color={colors.yellowAccent[500]}
                    variant="h6"
                    fontWeight={700}
                  >
                    {userInfo.college && "COLLEGE"}{" "}
                    {userInfo.college && userInfo.department && "-"}
                    {userInfo.department && "DEPARTMENT"}
                  </Typography>
                </Grid>
              )}
              <Grid item xs={12} md={6}>
                <Typography
                  variant="h4"
                  fontWeight={700}
                  color={colors.grey[100]}
                >
                  {academicYear.year}
                </Typography>
                <Typography
                  color={colors.yellowAccent[500]}
                  variant="h6"
                  fontWeight={700}
                >
                  SCHOOL YEAR
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  variant="h4"
                  fontWeight={700}
                  color={colors.grey[100]}
                >
                  {academicYear.semester}
                </Typography>
                <Typography
                  color={colors.yellowAccent[500]}
                  variant="h6"
                  fontWeight={700}
                >
                  SEMESTER
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        {auth.role === "Student" && (
          <Grid item xs={12}>
            <Paper variant="outlined" sx={{ backgroundColor: "primary.sub" }}>
              <Grid container spacing={2} p={2}>
                <Grid item xs={12}>
                  <Typography
                    variant="h5"
                    color={colors.redAccent[400]}
                    fontWeight={700}
                  >
                    IMPORTANT NOTICE
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" color="text.primary">
                    {evalInfo?.announcement || "No announcements."}
                    <br />
                    <br />
                    {evalInfo?.dean}
                    <br />
                    Dean
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        )}
        {auth.role !== "Admin" &&
          auth.role !== "Department Secretary" &&
          auth.role !== "College Secretary" && (
            <Grid item xs={12}>
              <Paper variant="outlined" sx={{ backgroundColor: "primary.sub" }}>
                <Grid container spacing={2} p={2}>
                  <Grid item xs={12}>
                    <Typography variant="h5" fontWeight={700}>
                      Surveys
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Link to="/survey">
                      <Typography variant="h6">
                        {"You have " +
                          (evalInfo?.total - evalInfo?.completed) +
                          " surveys to answer."}
                      </Typography>
                    </Link>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          )}
        {auth.role === "Admin" && (
          <Grid item xs={12}>
            <AdminDashboard />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Dashboard;
