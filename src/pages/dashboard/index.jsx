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
      {/* <Header title="DASHBOARD" subtitle={`Welcome, ${auth.role}`} />
      {auth.role === "Admin" && (
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="20px"
        >
          <Box
            gridColumn="span 8"
            gridRow="span 2"
            backgroundColor={colors.darkBlue[400]}
          >
            <Box
              mt="25px"
              p="0 30px"
              display="flex"
              displayContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography
                  variant="h5"
                  fontWeight="600"
                  color={colors.grey[100]}
                >
                  Evaluation Summary */}
      <Header title="DASHBOARD" subtitle={`Welcome, ${auth.role}`} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper variant="outlined" sx={{backgroundColor: "primary.sub"}}>
            <Grid container spacing={2} p={2}>
              <Grid item xs={12} md={6}>
                <Typography 
                  variant="h4" 
                  fontWeight={700} 
                  color={colors.grey[100]}>
                  {userInfo.name}
                </Typography>
                <Typography
                  // color={"text.secondary"}
                  variant="h6"
                  fontWeight={700}
                  color={colors.yellowAccent[500]}
                >
                  SCHOOL ID: {auth.school_id}
                </Typography>
              {/* </Box>//
            </Box>
            <Box height="250px" mt="-20px">
              <BarGraph isDashboard={true} />
            </Box>
          </Box>
          <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.darkBlue[400]}
            overflow="auto"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.darkBlue[500]}`}
              colors={colors.grey[100]}
              p="15px"
            >
              <Typography
                color={colors.grey[100]}
                variant="h5"
                fontWeight="600"
              >
                Completed Surveys
              </Typography>
              <Button
                color="primary"
                startIcon={<FilterListOutlinedIcon />}
                sx={{
                  padding: "4px 5px",
                  color: colors.grey[100],
                }}
                onClick={handleFilterMenuOpen}
              >
                FILTER SCORES
              </Button>
              <Menu
                anchorEl={filterMenuAnchor}
                open={Boolean(filterMenuAnchor)}
                onClose={handleFilterMenuClose}
              >
                <MenuItem>
                  <TextField
                    label="Score"
                    type="number"
                    value={selectedFilterScore}
                    onChange={(event) =>
                      setSelectedFilterScore(parseFloat(event.target.value))
                    }
                    variant="outlined"
                  />
                </MenuItem>
                <MenuItem>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: colors.greenAccent[500],
                    }}
                    onClick={handleApplyFilter}
                  >
                    Apply
                  </Button>
                  <Button
                    sx={{
                      backgroundColor: colors.greenAccent[500],
                      color: colors.grey[100],
                      ml: "15px",
                    }}
                    onClick={handleResetFilter}
                  >
                    Reset
                  </Button>
                </MenuItem>
              </Menu>
            </Box>
            {filteredUpdates.map((updates, i) => (
              <Box
                key={`${updates.txId}-${i}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.darkBlue[500]}`}
                p="15px"
              >
                <Box>
                  <Typography
                    color={colors.yellowAccent[500]}
                    variant="h5"
                    fontWeight="600"
                  >
                    {updates.name}// */}
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h4" fontWeight={700} color={colors.grey[100]}>
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
              <Grid item xs={12} md={6}>
                <Typography variant="h4" fontWeight={700} color={colors.grey[100]}>
                  {academicYear.year}
                </Typography>
                <Typography
                  // color={"text.secondary"}
                  color={colors.yellowAccent[500]}
                  variant="h6"
                  fontWeight={700}
                >
                  SCHOOL YEAR
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h4" fontWeight={700} color={colors.grey[100]}>
                  {academicYear.semester}
                </Typography>
                <Typography
                  // color={"text.secondary"}
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
        <Grid item xs={12}>
          <Paper variant="outlined" sx={{backgroundColor: "primary.sub"}}>
            <Grid container spacing={2} p={2}>
              <Grid item xs={12}>
                <Typography variant="h5" color={colors.redAccent[400]} fontWeight={700}>
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
          <Paper variant="outlined" sx={{backgroundColor: "primary.sub"}}>
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
              {/* </Box>//
            ))}
          </Box>
        </Box>
      )}
      {auth.role !== "Admin" && (
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="120px"
          gap="20px 0"
        >
          <Box
            gridColumn="span 6"
            gridRow="span 1"
            backgroundColor={colors.darkBlue[400]}
          >
            <Box
              mt="25px"
              p="0 30px"
              display="flex"
              displayContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography
                  variant="h4"
                  color={colors.grey[100]}
                >
                  Student Name
                </Typography>
                <Typography
                  variant="h6"
                  color={colors.yellowAccent[500]}
                >
                  University ID Number
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            gridColumn="span 3"
            gridRow="span 1"
            backgroundColor={colors.darkBlue[400]}
          >
            <Box
              mt="25px"
              p="0 30px"
              display="flex"
              displayContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography
                  variant="h4"
                  color={colors.grey[100]}
                >
                  Put Course Here
                </Typography>
                <Typography
                  variant="h6"
                  color={colors.yellowAccent[500]}
                >
                  Course and Year
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            gridColumn="span 3"
            gridRow="span 1"
            backgroundColor={colors.darkBlue[400]}
          >
            <Box
              mt="25px"
              p="0 30px"
              display="flex"
              displayContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography
                  variant="h4"
                  color={colors.grey[100]}
                >
                  SY 2022-2023
                </Typography>
                <Typography
                  variant="h6"
                  color={colors.yellowAccent[500]}
                >
                  School Year
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            gridColumn="span 12"
            gridRow="span 1"
            backgroundColor={colors.darkBlue[400]}
          >
            <Box
              mt="25px"
              p="0 30px"
              display="flex"
              displayContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography
                  variant="h1"
                  color={colors.yellowAccent[500]}
                >
                  Announcement
                </Typography>
                <Box>
                  <Typography
                    variant="h6"
                    color={colors.grey[100]}
                  >
                    here lies my sleep
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}// */}
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
