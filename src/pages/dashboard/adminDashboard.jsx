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
import ProgressCircle from "../../components/ProgressCircle";
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
    progress: 0,
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
          progress:
            response?.total_student_surveys_completed /
            response?.total_surveys_to_be_completed,
        });
      }
    })();
  }, []);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
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
                  Active Sessions
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
      <Grid item xs={12} sm={4}>
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
                  Logins For Today
                </Typography>
                <Typography variant="h4">
                  {metrics?.totalLoginsToday}
                </Typography>
              </Stack>
              <Avatar
                sx={{
                  backgroundColor: colors.blueAccent[400],
                  height: 56,
                  width: 56,
                }}
              >
                <SvgIcon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                    />
                  </svg>
                </SvgIcon>
              </Avatar>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                    />
                  </svg>
                </SvgIcon>
              </Avatar>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card sx={{ height: "100%", backgroundColor: "primary.sub" }}>
          <CardContent>
            <Typography color="text.secondary" variant="overline">
              Student Evaluation Progress
            </Typography>
            <Stack
              alignItems="center"
              direction="column"
              justifyContent="space-between"
              spacing={1}
              mt={3}
            >
              <ProgressCircle progress={metrics?.progress} size={125} />
              <Typography variant="body2" color={colors.yellowAccent[500]}>
                Surveys Completed: {metrics.totalStudentSurveysCompleted}
              </Typography>
              <Typography variant="body2" color={colors.redAccent[500]}>
                Pending Surveys: {metrics.pendingSurveys}
              </Typography>
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


  // return (
  //   <Box
  //     display="grid"
  //     gridTemplateColumns="repeat(12, 1fr)"
  //     gridAutoRows="140px"
  //     gap="20px"
  //   >
  //     <Box
  //       gridColumn="span 8"
  //       gridRow="span 2"
  //       backgroundColor={colors.darkBlue[400]}
  //     >
  //       <Box
  //         mt="25px"
  //         p="0 30px"
  //         display="flex"
  //         displayContent="space-between"
  //         alignItems="center"
  //       >
  //         <Box>
  //           <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
  //             Evaluation Summary
  //           </Typography>
  //           <Typography
  //             variant="h3"
  //             fontWeight="bold"
  //             color={colors.yellowAccent[500]}
  //           >
  //             2022-2023
  //           </Typography>
  //         </Box>
  //       </Box>
  //       <Box height="250px" mt="-20px">
  //         <BarGraph isDashboard={true} />
  //       </Box>
  //     </Box>
  //     {/* updates */}
  //     {/* <Box
  //       gridColumn="span 4"
  //       gridRow="span 2"
  //       backgroundColor={colors.darkBlue[400]}
  //       overflow="auto"
  //     >
  //       <Box
  //         display="flex"
  //         justifyContent="space-between"
  //         alignItems="center"
  //         borderBottom={`4px solid ${colors.darkBlue[500]}`}
  //         colors={colors.grey[100]}
  //         p="15px"
  //       >
  //         <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
  //           Completed Surveys
  //         </Typography>
  //         <Button
  //           color="primary"
  //           startIcon={<FilterListOffOutlined />}
  //           sx={{
  //             padding: "4px 5px",
  //             color: colors.grey[100],
  //           }}
  //           onClick={handleFilterMenuOpen}
  //         >
  //           FILTER SCORES
  //         </Button>
  //         <Menu
  //           anchorEl={filterMenuAnchor}
  //           open={Boolean(filterMenuAnchor)}
  //           onClose={handleFilterMenuClose}
  //         >
  //           <MenuItem>
  //             <TextField
  //               label="Score"
  //               type="number"
  //               value={selectedFilterScore}
  //               onChange={(event) =>
  //                 setSelectedFilterScore(parseFloat(event.target.value))
  //               }
  //               variant="outlined"
  //             />
  //           </MenuItem>
  //           <MenuItem>
  //             <Button
  //               variant="contained"
  //               sx={{
  //                 backgroundColor: colors.greenAccent[500],
  //               }}
  //               onClick={handleApplyFilter}
  //             >
  //               Apply
  //             </Button>
  //             <Button
  //               sx={{
  //                 backgroundColor: colors.greenAccent[500],
  //                 color: colors.grey[100],
  //                 ml: "15px",
  //               }}
  //               onClick={handleResetFilter}
  //             >
  //               Reset
  //             </Button>
  //           </MenuItem>
  //         </Menu>
  //       </Box>
  //       {filteredUpdates.map((updates, i) => (
  //         <Box
  //           key={`${updates.txId}-${i}`}
  //           display="flex"
  //           justifyContent="space-between"
  //           alignItems="center"
  //           borderBottom={`4px solid ${colors.darkBlue[500]}`}
  //           p="15px"
  //         >
  //           <Box>
  //             <Typography
  //               color={colors.yellowAccent[500]}
  //               variant="h5"
  //               fontWeight="600"
  //             >
  //               {updates.name}
  //             </Typography>
  //             <Typography color={colors.grey[100]}>{updates.type}</Typography>
  //           </Box>
  //           <Box color={colors.grey[100]}>{updates.stubCode}</Box>
  //           <Link to="/reports/reportDetails">
  //             <Button
  //               variant="contained"
  //               sx={{
  //                 backgroundColor:
  //                   updates.score < 4.2
  //                     ? colors.redAccent[500]
  //                     : colors.greenAccent[500],
  //                 p: "5px 10px",
  //                 borderRadius: "4px",
  //               }}
  //             >
  //               {updates.score}
  //             </Button>
  //           </Link>
  //         </Box>
  //       ))}
  //     </Box> */}
  //   </Box>
  // );
};
