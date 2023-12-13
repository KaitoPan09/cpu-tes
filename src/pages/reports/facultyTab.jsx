import React from "react";
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import BarGraph from "../../components/BarGraph";
import { useState } from "react";
import { TabPanel } from "@mui/lab";
export const FacultyTab = ({
  ratings,
  dialogData,
  open,
  facultyTabValue,
  n_peer_respondents,
  scores,
}) => {
  const columnColors = ["#e8c1a0", "#f47560", "#f1e15b", "#e8a838", "#61cdbb"];
  const [tabValue, setTabValue] = useState(
    facultyTabValue === "supervisor" ? 0 : facultyTabValue === "peer" ? 1 : 2
  );
  const [facultyRatings, setFacultyRatings] = useState(
    facultyTabValue === "supervisor"
      ? ratings.supervisor
      : facultyTabValue === "peer"
      ? ratings.peer
      : ratings.self
  );
  const [facultyScore, setFacultyScore] = useState(
    facultyTabValue === "supervisor"
      ? ratings.sup_score
      : facultyTabValue === "peer"
      ? ratings.peer_score
      : ratings.self_score
  );
  const handleChangeTab = (event, newValue) => {
    if (newValue === 0 && ratings.supervisor.length > 0) {
      setFacultyRatings(ratings.supervisor);
      setFacultyScore(ratings.sup_score);
      setTabValue(newValue);
    } else if (newValue === 1 && ratings.peer.length > 0) {
      setFacultyRatings(ratings.peer);
      setFacultyScore(ratings.peer_score);
      setTabValue(newValue);
    } else if (newValue === 2 && ratings.self.length > 0) {
      setFacultyRatings(ratings.self);
      setFacultyScore(ratings.self_score);
      setTabValue(newValue);
    } else {
      window.alert("No data available");
    }
  };
  if (!facultyRatings)
    return (
      <Grid container justifyContent={"center"}>
        <Typography>No Data Available</Typography>
      </Grid>
    );

  return (
    <Stack>
      <Tabs
        value={tabValue}
        onChange={handleChangeTab}
        indicatorColor="secondary"
        textColor="secondary"
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="Supervisor" value={0} />
        <Tab label="Peer" value={1} />
        <Tab label="Self" value={2} />
      </Tabs>
      <Stack direction={"row"} spacing={2}>
        <Grid container xs={12} md={6} alignItems={"center"}>
          {facultyRatings?.length > 0 && (
            <List>
              {tabValue === 1 && (
                <ListItem>
                  <ListItemText
                    primary={"No. of Peer Respondents: " + n_peer_respondents}
                    sx={{
                      textAlign: "left",
                      fontWeight: "bold",
                      fontSize: "1.25rem",
                    }}
                  />
                </ListItem>
              )}
              {facultyRatings?.map((item, index) => (
                <ListItem key={item.category} divider={true}>
                  <ListItemText
                    primary={item.category}
                    sx={{
                      textAlign: "left",
                      color: columnColors[index],
                    }}
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
              ))}
              <ListItem>
                <ListItemText
                  primary={"Overall Score"}
                  sx={{
                    textAlign: "left",
                    fontWeight: "bold",
                    fontSize: "1.25rem",
                  }}
                />
                <ListItemText
                  primary={Number(
                    tabValue === 0
                      ? scores.supervisor
                      : tabValue === 1
                      ? scores.peer
                      : scores.self
                  ).toFixed(2)}
                  sx={{
                    textAlign: "right",
                    paddingLeft: 2,
                    fontWeight: "bold",
                    fontSize: "1.25rem",
                    color: dialogData.student < 4.2 ? "red" : "green",
                  }}
                />
              </ListItem>
            </List>
          )}
        </Grid>
        <Grid container xs={12} md={6} alignContent={"center"}>
          {open && <BarGraph ratings={facultyRatings} type={"faculty"} />}
        </Grid>
      </Stack>
    </Stack>
  );
};
