import {
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Tab,
  Tabs,
} from "@mui/material";
import React, { useState } from "react";
import BarGraph from "../../components/BarGraph";
import CustomDataGrid from "../../components/CustomDatagrid";
import { useEffect } from "react";

export const StudentTab = ({
  studentRatings,
  studentRatingsByClass,
  dialogData,
}) => {
  const columnColors = ["#e8c1a0", "#f47560", "#f1e15b", "#e8a838", "#61cdbb"];
  const [ratings, setRatings] = useState([]);
  useEffect(() => {
    setRatings(studentRatings);
  }, [studentRatings]);

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const columns = [
    { field: "class_id", headerName: "ID", width: 80 },
    { field: "stub_code", headerName: "Stub Code", width: 100 },
    {
      field: "subject",
      headerName: "Subject",
      flex: 1,
      minWidth: 180,
    },
    { field: "class_time", headerName: "Class Time", width: 140 },
    { field: "score", headerName: "Score", width: 80, type: "Number" },
  ];
  const handleRowClick = (row) => {
    // setRatings(studentRatingsByClass[row.id]);
    // find the class id in studentRatingsByClass
    const selectedClass = studentRatingsByClass.find(
      (item) => item.class_id === row.id
    );
    setRatings(selectedClass.ratings);
  };
  return (
    <Grid container>
      <Grid item xs={12} container>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Overall" />
          <Tab label="By Class" />
        </Tabs>
      </Grid>
      <Grid item container xs={12}>
        <TabPanel value={value} index={0}>
          <List>
            {studentRatings.map((item, index) => (
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
            <ListItem>
              <ListItemText
                primary={"Total Score"}
                sx={{
                  textAlign: "left",
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
        </TabPanel>
        <TabPanel value={value} index={1}>
          <CustomDataGrid
            rows={studentRatingsByClass}
            columns={columns}
            getRowId={(row) => row.class_id}
            onRowClick={handleRowClick}
          />
        </TabPanel>
        <Grid container xs={12} md={8} sx={{ height: "60vh" }}>
          <BarGraph ratings={value === 0 ? studentRatings : ratings} />
        </Grid>
      </Grid>
    </Grid>
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
      {value === index && (
        <Box display={"flex"} flexDirection={"row"}>
          {children}
        </Box>
      )}
    </div>
  );
}
