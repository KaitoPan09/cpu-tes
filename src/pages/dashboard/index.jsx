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

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { auth, userInfo, academicYear } = useAuth();
  return (
    <Box m="20px">
      <Header title="DASHBOARD" subtitle="Welcome" />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper variant="outlined">
            <Grid container spacing={2} p={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="h4" fontWeight={700}>
                  {userInfo.name}
                </Typography>
                <Typography
                  color={"text.secondary"}
                  variant="h6"
                  fontWeight={700}
                >
                  SCHOOL ID: {auth.school_id}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h4" fontWeight={700}>
                  {userInfo.course + " - " + userInfo.year_level}
                </Typography>
                <Typography
                  color={"text.secondary"}
                  variant="h6"
                  fontWeight={700}
                >
                  COURSE AND YEAR
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h4" fontWeight={700}>
                  {academicYear.year}
                </Typography>
                <Typography
                  color={"text.secondary"}
                  variant="h6"
                  fontWeight={700}
                >
                  SCHOOL YEAR
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h4" fontWeight={700}>
                  {academicYear.semester}
                </Typography>
                <Typography
                  color={"text.secondary"}
                  variant="h6"
                  fontWeight={700}
                >
                  SEMESTER
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper variant="outlined">
            <Grid container spacing={2} p={2}>
              <Grid item xs={12}>
                <Typography variant="h5" color="darkred" fontWeight={700}>
                  IMPORTANT NOTICE
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" color="text.primary">
                  Good day Students! We would like to hear from you!! Please
                  provide us your evaluation and feedback of your instructors
                  for your respective classes.
                  <br />
                  <br />
                  Thank you
                  <br />
                  <br />
                  Dean
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper variant="outlined">
            <Grid container spacing={2} p={2}>
              <Grid item xs={12}>
                <Typography variant="h5" fontWeight={700}>
                  Surveys
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Link to="/survey">
                  <Typography variant="h6">
                    You have n teachers waiting to be evaluated.
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {auth.role === "Admin" && <AdminDashboard />}
    </Box>
  );
};

export default Dashboard;
