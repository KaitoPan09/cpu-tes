import React, { useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  ListItemText,
  Typography,
  List,
  ListItem,
  Divider,
  Grid,
  Tab,
  Tabs,
  CircularProgress,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import BarGraph from "../../components/BarGraph";
import { dummyBarBreakdown } from "../../data/dummyData";
import useFetch from "../../hooks/useFetch";
import { height } from "@mui/system";
import { Skeleton } from "survey-react-ui";
import { useParams } from "react-router";
import { StudentTab } from "./studentTab";
import { FacultyTab } from "./facultyTab";
import { useState } from "react";
import { SentimentTab } from "./sentimentTab";
import { FeedBackSectionTab } from "./feedBackSectionTab";

const ReportDialog = ({
  open,
  setOpen,
  handleClose,
  dialogData,
  tabValue,
  setTabValue,
  facultyTabValue,
  setFacultyTabValue,
}) => {
  const { evalId } = useParams();
  const { loading, request } = useFetch();
  const [studentRatings, setStudentRatings] = useState([]);
  const [studentRatingsByClass, setStudentRatingsByClass] = useState([]);
  const [facultyRatings, setFacultyRatings] = useState({});
  const [result, setResult] = useState({});
  const [selectedResult, setSelectedResult] = useState({});
  useEffect(() => {
    (async () => {
      const response = await request(
        `/api/evaluations/individual_result?evaluation_id=${evalId}&faculty_id=${dialogData?.id}`
      );
      if (response) {
        setResult(response);
        setStudentRatings(response.student_ratings);
        setStudentRatingsByClass(response.student_ratings_by_class);
        setFacultyRatings({
          supervisor: response.sup_ratings,
          supervisor_score: response.sup_score,
          self: response.self_ratings,
          self_score: response.self_score,
          peer: response.peer_ratings,
          peer_score: response.peer_score,
        });
        setSelectedResult({
          faculty: response.faculty,
          faculty_id: response.faculty_id,
          // eval_type: eval_type,
          // ratings: ratings,
          // score: score,
          overall: response.overall,
          separated: response.separated,
          sentiment: response.sentiment_score >= 0.5 ? "Positive" : "Negative",
          // evaluation_id: evaluation.id,
        });
      }
    })();
  }, []);

  const handleChangeTab = (event, newValue) => {
    if (newValue === 0 && result?.student_ratings?.length > 0) {
      setTabValue(newValue);
    } else if (
      newValue === 1
      // result?.supervisor_ratings?.length > 0 &&
      // result?.self_ratings?.length > 0 &&
      // result?.peer_ratings?.length > 0
    ) {
      if (facultyTabValue === "supervisor" && result?.supervisor?.length <= 0) {
        window.alert("No data available");
        return;
      }
      if (facultyTabValue === "self" && result?.self?.length <= 0) {
        window.alert("No data available");
        return;
      }
      if (facultyTabValue === "peer" && result?.peer?.length <= 0) {
        window.alert("No data available");
        return;
      }
      setTabValue(newValue);
    } else if (
      newValue === 2 &&
      dialogData?.sentiment_score !== "No comments"
    ) {
      setTabValue(newValue);
    } else if (newValue === 3) {
      setTabValue(newValue);
    } else window.alert("No data available");
  };
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xl">
      <DialogTitle>
        <Grid container spacing={2} justifyContent={"flex-start"}>
          <Grid item>
            <Typography variant="h4" color={"text.secondary"}>
              Faculty:
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h4" color={"primary"}>
              {dialogData?.faculty}
            </Typography>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        {loading ? (
          <Grid
            container
            justifyContent={"center"}
            alignContent={"center"}
            sx={{ height: "60vh" }}
          >
            <CircularProgress />
          </Grid>
        ) : (
          <>
            <TabPanel value={tabValue} index={0}>
              <StudentTab
                studentRatings={studentRatings}
                studentRatingsByClass={studentRatingsByClass}
                dialogData={dialogData}
                open={open}
              />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <FacultyTab
                ratings={facultyRatings}
                dialogData={dialogData}
                open={open}
                facultyTabValue={facultyTabValue}
              />
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <SentimentTab
                dialogData={dialogData}
                selectedResult={result}
                evalId={evalId}
              />
            </TabPanel>
            <TabPanel value={tabValue} index={3}>
              <FeedBackSectionTab
                dialogData={dialogData}
                selectedResult={result}
                evalId={evalId}
              />
            </TabPanel>
          </>
        )}
        <Divider />
        <Grid container justifyContent="center">
          <Tabs
            value={tabValue}
            onChange={handleChangeTab}
            indicatorColor="secondary"
            textColor="secondary"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Student Evaluation" sx={{ marginRight: 10 }} />
            <Tab label="Faculty Evaluation" sx={{ marginRight: 10 }} />
            <Tab label="Sentiment" sx={{ marginRight: 10 }} />
            <Tab label="Feedback Section" sx={{ marginRight: 10 }} />
          </Tabs>
        </Grid>
      </DialogContent>
      <DialogActions>
        {/* <Box
          sx={{
            maxWidth: { xs: 320, sm: 480, md: "100%" },
            bgcolor: "transparent",
          }}
        >
          <Tabs
            value={0}
            // onChange={handleChange}
            indicatorColor="secondary"
            textColor="secondary"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Student" />
            <Tab label="Supervisor" />
            <Tab label="Peer" />
            <Tab label="Self" />
            <Tab label="Sentiment" />
          </Tabs>
        </Box> */}
        <Button variant="outlined" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}
export default ReportDialog;
