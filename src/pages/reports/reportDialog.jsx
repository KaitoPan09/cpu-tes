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

const ReportDialog = ({ open, setOpen, handleClose, dialogData }) => {
  const { evalId } = useParams();
  const { loading, request } = useFetch();
  const [ratings, setRatings] = React.useState([]);
  useEffect(() => {
    (async () => {
      const response = await request(
        `/api/evaluations/individual_result?evaluation_id=${evalId}&faculty_id=${dialogData?.id}`
      );
      if (response) {
        setRatings(response.student_ratings);
      }
    })();
  }, []);
  const columnColors = ["#e8c1a0", "#f47560", "#f1e15b", "#e8a838", "#61cdbb"];
  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="lg">
      <DialogTitle>
        <Grid container spacing={2} justifyContent={"flex-start"}>
          <Grid item>
            <Typography variant="h6" color={"text.secondary"}>
              Evaluation Results:
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" color={"primary"}>
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
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Tabs
                  // value={value}
                  // onChange={handleChange}
                  indicatorColor="secondary"
                  textColor="secondary"
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  <Tab label="Overall" />
                  <Tab label="By Class" />
                </Tabs>
              </Grid>
              <Grid item xs={12} md={4}>
                <List>
                  {ratings.map((item, index) => (
                    <div key={item.category}>
                      <ListItem divider={true}>
                        <ListItemText
                          primary={
                            item.category + " " + item.weight * 100 + "%"
                          }
                          sx={{ textAlign: "left", color: columnColors[index] }}
                        />

                        <ListItemText
                          primary={Number(item.rating).toFixed(2)}
                          sx={{
                            textAlign: "right",
                            paddingLeft: 2,
                            color: item.rating < 4.2 ? "red" : "green",
                          }}
                        />
                      </ListItem>
                    </div>
                  ))}
                </List>
              </Grid>
              {ratings && (
                <Grid item xs={12} md={8}>
                  <Box height="50vh">
                    <BarGraph ratings={ratings} />
                  </Box>
                </Grid>
              )}
            </Grid>
            <Divider />
            <Grid item xs={12} container justifyContent="center">
              <Tabs
                value={0}
                // onChange={handleChange}
                indicatorColor="secondary"
                textColor="secondary"
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab label="Student" sx={{ marginRight: 10 }} />
                <Tab label="Supervisor" sx={{ marginRight: 10 }} />
                <Tab label="Peer" sx={{ marginRight: 10 }} />
                <Tab label="Self" sx={{ marginRight: 10 }} />
                <Tab label="Sentiment" sx={{ marginRight: 10 }} />
              </Tabs>
            </Grid>
          </>
        )}
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

export default ReportDialog;
