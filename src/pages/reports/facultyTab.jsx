import React from "react";
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Tab,
  Tabs,
} from "@mui/material";
import BarGraph from "../../components/BarGraph";
export const FacultyTab = ({ ratings, dialogData }) => {
  const columnColors = ["#e8c1a0", "#f47560", "#f1e15b", "#e8a838", "#61cdbb"];
  return (
    <Grid container spacing={2}>
      {/* <Grid item xs={12}>
        <Tabs
          value={0}
          // onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Supervisor" />
          <Tab label="By Class" />
          <Tab label="By Class" />
        </Tabs>
      </Grid> */}
      {ratings?.length > 0 && (
        <>
          <Grid item xs={12} md={4} container alignItems={"center"}>
            <Grid item>
              <List>
                {ratings.map((item, index) => (
                  <ListItem key={item.category} divider={true}>
                    <ListItemText
                      primary={item.category + " " + item.weight * 100 + "%"}
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
                <ListItem divider={true}>
                  <ListItemText
                    primary={"TOTAL SCORE"}
                    sx={{
                      textAlign: "left",
                      transform: "uppercase",
                    }}
                  />
                  <ListItemText
                    primary={Number(dialogData.student).toFixed(2)}
                    sx={{
                      textAlign: "right",
                      paddingLeft: 2,
                      color: dialogData.student < 4.2 ? "red" : "green",
                    }}
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
          <Grid item xs={12} md={8}>
            <Box height="60vh">
              <BarGraph ratings={ratings} />
            </Box>
          </Grid>
        </>
      )}
    </Grid>
  );
};
