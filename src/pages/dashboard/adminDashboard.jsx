import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Menu,
  MenuItem,
  Paper,
  Stack,
  SvgIcon,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { tokens } from "../../theme";
import BarGraph from "../../components/BarGraph";
import { FilterListOffOutlined, WarningAmber } from "@mui/icons-material";
import { dummyUpdates } from "../../data/dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";
import ArrowDownIcon from "@heroicons/react/24/solid/ArrowDownIcon";
import ArrowUpIcon from "@heroicons/react/24/solid/ArrowUpIcon";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
export const AdminDashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // State variables and handlers
  const [filterMenuAnchor, setFilterMenuAnchor] = useState(null);
  const [selectedFilterScore, setSelectedFilterScore] = useState(0);
  const [filteredUpdates, setFilteredUpdates] = useState(dummyUpdates);

  // Handler to filter updates based on score
  const handleFilter = (threshold) => {
    const filtered = dummyUpdates.filter(
      (updates) => updates.score < threshold
    );
    setFilteredUpdates(filtered);
  };

  // Function to handle opening and closing the filter menu
  const handleFilterMenuOpen = (event) => {
    setFilterMenuAnchor(event.currentTarget);
  };

  const handleFilterMenuClose = () => {
    setFilterMenuAnchor(null);
  };

  // Function to apply filter
  const handleApplyFilter = () => {
    handleFilterMenuClose();
    handleFilter(selectedFilterScore);
  };

  // Reset filters
  const handleResetFilter = () => {
    setSelectedFilterScore(0);
    setFilteredUpdates(dummyUpdates);
  };
  const { request } = useFetch();
  const [metrics, setMetrics] = useState({
    totalLoginsToday: 0,
    activeSessions: 0,
    totalStudentSurveysCompleted: 0,
    totalStudentSurveysToBeCompleted: 0,
    studentSurveysCompletedToday: 0,
  });
  useEffect(() => {
    (async () => {
      const response = await request(`/api/utils/dashboard_metrics`);
      if (response) {
        setMetrics({
          ...metrics,
          logins: response?.total_logins_today,
          activeSessions: response?.active_sessions,
          totalStudentSurveysCompleted:
            response?.total_student_surveys_completed,
          studentSurveysCompletedToday:
            response?.student_surveys_completed_today,
          totalStudentSurveysToBeCompleted:
            response?.total_surveys_to_be_completed,
          pendingSurveys: response?.pending_surveys,
        });
      }
    })();
  }, []);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} lg={3}>
        <Card sx={{ height: "100%", backgroundColor: "primary.sub" }}>
          <CardContent>
            <Stack
              alignItems="flex-start"
              direction="row"
              justifyContent="space-between"
              spacing={3}
            >
              <Stack spacing={1}>
                <Typography color="text.secondary" variant="overline">
                  Current Active Sessions
                </Typography>
                <Typography variant="h4">{metrics?.activeSessions}</Typography>
              </Stack>
              <Avatar
                sx={{
                  backgroundColor: colors.greenAccent[300],
                  height: 56,
                  width: 56,
                }}
              >
                <SvgIcon>
                  <UsersIcon />
                </SvgIcon>
              </Avatar>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <Card sx={{ height: "100%", backgroundColor: "primary.sub" }}>
          <CardContent>
            <Stack
              alignItems="flex-start"
              direction="row"
              justifyContent="space-between"
              spacing={3}
            >
              <Stack spacing={1}>
                <Typography color="text.secondary" variant="overline">
                  Total Logins For Today
                </Typography>
                <Typography variant="h4">
                  {metrics?.totalLoginsToday}
                </Typography>
              </Stack>
              <Avatar
                sx={{
                  backgroundColor: "success.main",
                  height: 56,
                  width: 56,
                }}
              >
                <SvgIcon>
                  <UsersIcon />
                </SvgIcon>
              </Avatar>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <Card sx={{ height: "100%", backgroundColor: "primary.sub" }}>
          <CardContent>
            <Stack
              alignItems="flex-start"
              direction="row"
              justifyContent="space-between"
              spacing={3}
            >
              <Stack spacing={1}>
                <Typography color="text.secondary" variant="overline">
                  Total Student Surveys Completed
                </Typography>
                <Typography variant="h4">
                  {metrics?.totalStudentSurveysCompleted +
                    " out of " +
                    metrics?.totalStudentSurveysToBeCompleted}
                </Typography>
              </Stack>
              <Avatar
                sx={{
                  backgroundColor: "success.main",
                  height: 56,
                  width: 56,
                }}
              >
                <SvgIcon>
                  <UsersIcon />
                </SvgIcon>
              </Avatar>
            </Stack>

            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
              sx={{ mt: 2 }}
            >
              <Stack alignItems="center" direction="row" spacing={0.5}>
                <SvgIcon color={"error"} fontSize="small">
                  <ExclamationTriangleIcon />
                </SvgIcon>
                <Typography color={"error.main"} variant="body2">
                  {metrics.pendingSurveys}
                </Typography>
              </Stack>
              <Typography color="text.secondary" variant="caption">
                Pending Surveys
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <Card sx={{ height: "100%", backgroundColor: "primary.sub" }}>
          <CardContent>
            <Stack
              alignItems="flex-start"
              direction="row"
              justifyContent="space-between"
              spacing={3}
            >
              <Stack spacing={1}>
                <Typography color="text.secondary" variant="overline">
                  Student Surveys Completed Today
                </Typography>
                <Typography variant="h4">
                  {metrics?.studentSurveysCompletedToday}
                </Typography>
              </Stack>
              <Avatar
                sx={{
                  backgroundColor: "success.main",
                  height: 56,
                  width: 56,
                }}
              >
                <SvgIcon>
                  <UsersIcon />
                </SvgIcon>
              </Avatar>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
    // <Box
    //   display="grid"
    //   gridTemplateColumns="repeat(12, 1fr)"
    //   gridAutoRows="140px"
    //   gap="20px"
    // >
    //   <Box
    //     gridColumn="span 8"
    //     gridRow="span 2"
    //     backgroundColor={colors.darkBlue[400]}
    //   >
    //     <Box
    //       mt="25px"
    //       p="0 30px"
    //       display="flex"
    //       displayContent="space-between"
    //       alignItems="center"
    //     >
    //       <Box>
    //         <Typography
    //           variant="h5"
    //           fontWeight="600"
    //           color={colors.grey[100]}
    //         >
    //           Evaluation Summary
    //         </Typography>
    //         <Typography
    //           variant="h3"
    //           fontWeight="bold"
    //           color={colors.yellowAccent[500]}
    //         >
    //           2022-2023
    //         </Typography>
    //       </Box>
    //     </Box>
    //     <Box height="250px" mt="-20px">
    //       <BarGraph isDashboard={true} />
    //     </Box>
    //   </Box>
    //   {/* updates */}
    //   <Box
    //     gridColumn="span 4"
    //     gridRow="span 2"
    //     backgroundColor={colors.darkBlue[400]}
    //     overflow="auto"
    //   >
    //     <Box
    //       display="flex"
    //       justifyContent="space-between"
    //       alignItems="center"
    //       borderBottom={`4px solid ${colors.darkBlue[500]}`}
    //       colors={colors.grey[100]}
    //       p="15px"
    //     >
    //       <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
    //         Completed Surveys
    //       </Typography>
    //       {/* <TextField
    //                                   label="Search Teacher"
    //                                   variant="outlined"
    //                                   /> */}
    //       <Button
    //         color="primary"
    //         startIcon={<FilterListOffOutlined />}
    //         sx={{
    //           padding: "4px 5px",
    //           color: colors.grey[100],
    //         }}
    //         onClick={handleFilterMenuOpen}
    //       >
    //         FILTER SCORES
    //       </Button>
    //       <Menu
    //         anchorEl={filterMenuAnchor}
    //         open={Boolean(filterMenuAnchor)}
    //         onClose={handleFilterMenuClose}
    //       >
    //         <MenuItem>
    //           <TextField
    //             label="Score"
    //             type="number"
    //             value={selectedFilterScore}
    //             onChange={(event) =>
    //               setSelectedFilterScore(parseFloat(event.target.value))
    //             }
    //             variant="outlined"
    //           />
    //         </MenuItem>
    //         <MenuItem>
    //           <Button
    //             variant="contained"
    //             sx={{
    //               backgroundColor: colors.greenAccent[500],
    //             }}
    //             onClick={handleApplyFilter}
    //           >
    //             Apply
    //           </Button>
    //           <Button
    //             sx={{
    //               backgroundColor: colors.greenAccent[500],
    //               color: colors.grey[100],
    //               ml: "15px",
    //             }}
    //             onClick={handleResetFilter}
    //           >
    //             Reset
    //           </Button>
    //         </MenuItem>
    //       </Menu>
    //     </Box>
    //     {filteredUpdates.map((updates, i) => (
    //       <Box
    //         key={`${updates.txId}-${i}`}
    //         display="flex"
    //         justifyContent="space-between"
    //         alignItems="center"
    //         borderBottom={`4px solid ${colors.darkBlue[500]}`}
    //         p="15px"
    //       >
    //         <Box>
    //           <Typography
    //             color={colors.yellowAccent[500]}
    //             variant="h5"
    //             fontWeight="600"
    //           >
    //             {updates.name}
    //           </Typography>
    //           <Typography color={colors.grey[100]}>{updates.type}</Typography>
    //         </Box>
    //         <Box color={colors.grey[100]}>{updates.stubCode}</Box>
    //         <Link to="/reports/reportDetails">
    //           <Button
    //             variant="contained"
    //             sx={{
    //               backgroundColor:
    //                 updates.score < 4.2
    //                   ? colors.redAccent[500]
    //                   : colors.greenAccent[500],
    //               p: "5px 10px",
    //               borderRadius: "4px",
    //             }}
    //           >
    //             {updates.score}
    //           </Button>
    //         </Link>
    //       </Box>
    //     ))}
    //   </Box>
    // </Box>
  );
};
