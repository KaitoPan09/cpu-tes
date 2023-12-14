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
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import BarGraph from "../../components/BarGraph";
import CustomDataGrid from "../../components/CustomDatagrid";
import { useEffect } from "react";

export const StudentTab = ({
  studentRatings,
  studentRatingsByClass,
  dialogData,
  open,
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
    {
      field: "response_rate",
      headerName: "Response Rate",
      width: 120,
      type: "Number",
      valueFormatter: (params) => {
        return Number(params.value).toFixed(2) + "%";
      },
    },
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
    <Stack>
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
      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        {/* <Stack direction={"row"} spacing={2}> */}
        <Grid container xs={12} md={6} alignItems={"center"}>
          <TabPanel value={value} index={0}>
            <List>
              <ListItem divider={true}>
                <ListItemText
                  primary={
                    "Respondents: " +
                    dialogData.n_student_surveys +
                    " out of " +
                    dialogData.n_students +
                    " students"
                  }
                  secondary={"Response rate: " + dialogData.response_rate + "%"}
                  sx={{
                    textAlign: "left",
                    fontWeight: "bold",
                    fontSize: "1.25rem",
                  }}
                />
              </ListItem>
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
                  primary={"Overall Score"}
                  sx={{
                    textAlign: "left",
                    fontWeight: "bold",
                    fontSize: "1.25rem",
                  }}
                />
                <ListItemText
                  primary={Number(dialogData.student).toFixed(2)}
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
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Grid item xs={6} md={10} lg={12}>
              <CustomDataGrid
                rows={studentRatingsByClass}
                columns={columns}
                getRowId={(row) => row.class_id}
                onRowClick={handleRowClick}
                columnVisibilityModel={{
                  class_id: false,
                }}
              />
            </Grid>
          </TabPanel>
        </Grid>
        <Grid container xs={12} md={6} alignContent={"center"}>
          {open && (
            <BarGraph ratings={value === 0 ? studentRatings : ratings} />
          )}
        </Grid>
      </Stack>
    </Stack>
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
