import {
  Autocomplete,
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Grow,
  List,
  ListItem,
  ListItemText,
  Paper,
  Radio,
  RadioGroup,
  Switch,
  TextField,
} from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import CustomDataGrid from "../../components/CustomDatagrid";
import { Loading } from "../../components/Loading";
import { useParams } from "react-router-dom";

export const SentimentTab = ({ dialogData, selectedResult, evalId }) => {
  const [comments, setComments] = useState(selectedResult?.overall?.comments);
  const [barChartData, setBarChartData] = useState([]);
  const [classes, setClasses] = useState([]);
  useEffect(() => {
    setComments(selectedResult?.overall?.comments);
    setBarChartData(selectedResult?.overall?.data);
    const classesWithComments =
      selectedResult?.separated?.student_comments?.filter(
        (class_) => class_.comments?.length > 0
      );
    setClasses(classesWithComments);
  }, [selectedResult]);

  const col = [
    { field: "comment", headerName: "Comment", flex: 3 },
    {
      field: "sentiment_score",
      headerName: "Sentiment",
      flex: 1,
      valueGetter: (params) => {
        if (params.row.sentiment_score) {
          return "Positive";
        } else {
          return "Negative";
        }
      },
      cellClassName: (params) => {
        if (params.value === "Positive") {
          return "green";
        } else {
          return "red";
        }
      },
    },
  ];
  const col2 = [
    {
      field: "topic_keywords",
      headerName: "Topic Keywords",
      flex: 1,
      alignItems: "top",
      renderCell: (params) => (
        <List dense={false}>
          {params.row.topic_keywords.map((keyword, index) => (
            <ListItem key={index} disableGutters>
              <ListItemText primary={keyword} />
            </ListItem>
          ))}
        </List>
      ),
    },
    {
      field: "comments",
      headerName: "Comments",
      flex: 2,
      renderCell: (params) => (
        <List dense={true}>
          {params.row.comments.map((comment, index) => (
            <ListItem key={index} disableGutters>
              <ListItemText
                primary={comment.comment}
                sx={{
                  color: comment.sentiment === "Positive" ? "green" : "red",
                }}
              />
            </ListItem>
          ))}
        </List>
      ),
      type: "string",
    },
  ];
  const [columns, setColumns] = useState(col);
  const [rows, setRows] = useState(comments);
  const [checked, setChecked] = React.useState(false);
  const [value, setValue] = useState("all");
  const [disabled, setDisabled] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const handleChange = (event) => {
    setChecked(false);
    setColumns(col);
    if (event.target.value === "all") {
      if (selectedResult?.overall.comments.length > 0) {
        setRows(selectedResult?.overall.comments);
        setBarChartData(selectedResult?.overall.data);
        setValue(event.target.value);
        setDisabled(false);
      } else {
        console.log(selectedResult?.overall.comments.length);
        window.alert("No comments found");
      }
    }
    if (event.target.value === "faculty") {
      if (
        selectedResult?.separated.faculty_comments.faculty_comments.length > 0
      ) {
        setRows(selectedResult?.separated.faculty_comments.faculty_comments);
        setBarChartData(selectedResult?.separated.faculty_comments.data);
        setValue(event.target.value);
        setDisabled(true);
      } else {
        window.alert("No comments found");
      }
    }
    if (event.target.value === "students") {
      if (classes.length > 0) {
        setRows(classes[0].comments);
        setBarChartData(classes[0].data);
        setSelectedClass(classes[0]);
        setValue(event.target.value);
        setDisabled(false);
      } else {
        console.log(classes[0].comments.length);
        window.alert("No comments found");
      }
    }
  };
  const generateWordCloud = async (class_id) => {
    setLoading(true);
    let response = null;
    if (class_id) {
      response = await fetch(
        `/api/evaluations/wordcloud?sentiment=${selectedResult.sentiment}&faculty_id=${selectedResult.faculty_id}&evaluation_id=${evalId}&class_id=${class_id}`,
        {
          methods: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      response = await fetch(
        `/api/evaluations/wordcloud?sentiment=${selectedResult.sentiment}&faculty_id=${selectedResult.faculty_id}&evaluation_id=${evalId}`,
        {
          methods: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
    let jsonResponse = await response.json();
    if (!response.ok) {
      if (response.status === 409) {
        window.alert(jsonResponse.msg);
      }
      setLoading(false);
      return false;
    }
    const img = new Image();
    img.src = "data:image/png;base64," + jsonResponse.image;
    img.onload = () => setImage(img.src);
    let rows = jsonResponse.result;
    rows.sort((a, b) => (a.percentage < b.percentage ? 1 : -1));
    setRows(jsonResponse.result);
    setColumns(col2);
    setLoading(false);
    return true;
  };
  const { request } = useFetch();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleSwitchChange = async (event) => {
    setLoading(true)
    let wordcloud = null;
    if (event.target.checked) {
      if (value === "all") {
        wordcloud = await generateWordCloud();
        if (!wordcloud) {
          setLoading(false);
          return;
        }
      } else {
        wordcloud = await generateWordCloud(selectedClass.class_id);
        if (!wordcloud) {
          setLoading(false);
          return;
        }
      }
    }
    setChecked(!checked);
    setLoading(false)
  };
  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <Grid container spacing={2}>
          <Grid item>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Filter
              </FormLabel>
              <RadioGroup row value={value} onChange={handleChange}>
                <FormControlLabel value="all" control={<Radio />} label="All" />
                <FormControlLabel
                  value="faculty"
                  control={<Radio />}
                  label="Faculty"
                />
                <FormControlLabel
                  value="students"
                  control={<Radio />}
                  label="Student"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          {!disabled ? (
            <Grid item marginTop={2}>
              <Grid container spacing={2} direction="row">
                <Grid item>
                  {value === "students" && (
                    <Grow in={!disabled}>
                      <Autocomplete
                        disableClearable
                        value={selectedClass}
                        onChange={async (event, newValue) => {
                          // if (checked) {
                          //   let wordcloud = await generateWordCloud(
                          //     newValue.class_id
                          //   );
                          //   if (!wordcloud) {
                          //     return;
                          //   }
                          // } else {
                          //   setRows(newValue.comments);
                          //   setColumns(col);
                          // }
                          if (checked) {
                            setChecked(false);
                          }
                          setRows(newValue.comments);
                          setColumns(col);
                          setSelectedClass(newValue);
                          setBarChartData(newValue.data);
                        }}
                        disablePortal
                        disabled={disabled}
                        options={classes.filter(
                          (class_) => class_.comments?.length > 0
                        )}
                        getOptionLabel={(option) =>
                          option.stub_code + " " + option.subject
                        }
                        sx={{ width: 400 }}
                        renderInput={(params) => (
                          <TextField {...params} label="Select a class" />
                        )}
                      />
                    </Grow>
                  )}
                </Grid>
                <Grid item alignItems="stretch" style={{ display: "flex" }}>
                  <Grow
                    in={!disabled}
                    style={{ transformOrigin: "0 0 0" }}
                    {...(!disabled ? { timeout: 1000 } : {})}
                  >
                    <FormControlLabel
                      control={
                        <Switch
                          checked={checked}
                          onChange={handleSwitchChange}
                        />
                      }
                      label="WordCloud"
                    />
                  </Grow>
                </Grid>
              </Grid>
            </Grid>
          ) : null}
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="row" spacing={2} minHeight="60vh">
          <Grid item xs={checked ? 4 : 12} md={checked ? 6 : 12}>
            <CustomDataGrid rows={rows ? rows : []} columns={columns} />
          </Grid>

          {!checked ? (
            <></>
          ) : //   <ResponsiveContainer width="100%" height="100%">
          //     <BarChart
          //       width={500}
          //       height={300}
          //       data={barChartData}
          //       margin={{
          //         top: 5,
          //         right: 30,
          //         left: 20,
          //         bottom: 5,
          //       }}
          //     >
          //       <CartesianGrid strokeDasharray="3 3" />
          //       <XAxis dataKey="eval_type" />
          //       <YAxis allowDecimals={false} />
          //       <Tooltip />
          //       <Legend />
          //       <Bar dataKey="positive" fill="green" maxBarSize={55} />
          //       <Bar dataKey="negative" fill="red" maxBarSize={55} />
          //     </BarChart>
          //   </ResponsiveContainer>
          loading ? (
            <Loading />
          ) : (
            <Grid
              item
              xs={8}
              md={6}
              container
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Box
                component="img"
                sx={{
                  maxHeight: "60vh",
                  width: "100%",
                }}
                alt="WordCloud"
                src={image}
              />
            </Grid>
          )}

          {/* <Grid container direction="row" spacing={2} minHeight="60vh">
          <Grid item xs={8} md={6}>
            <Grid
              component={Paper}
              sx={{
                "& .Negative": {
                  color: "red",
                  fontWeight: "600",
                },
                "& .Positive": {
                  color: "green",
                  fontWeight: "600",
                },
                display: "flex",
                height: "100%",
              }}
            >
              <div style={{ flexGrow: 1 }}>
                <CustomDataGrid
                  loading={loading}
                  getRowHeight={() => "auto"}
                  minHeight={10}
                  disableMultipleSelection={true}
                  rows={rows}
                  columns={columns}
                  sx={{
                    boxShadow: 1,
                    border: 1,
                    borderColor: "black",
                    "& .MuiDataGrid-cell:hover": {
                      color: "primary.main",
                    },
                    "&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell": {
                      py: "2px",
                    },
                    "&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell": {
                      py: "6px",
                    },
                    "&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell":
                      { py: "8px" },
                  }}
                  getCellClassName={(params) => {
                    if (params.field === "sentiment_score") {
                      return params.value;
                    }
                    return "";
                  }}
                />
              </div>
          <Grid item xs={8} md={6}>
          <Grid item xs={8} md={6} maxHeight="60vh">
            {!checked ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={barChartData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="eval_type" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="positive" fill="green" maxBarSize={55} />
                  <Bar dataKey="negative" fill="red" maxBarSize={55} />
                </BarChart>
              </ResponsiveContainer>
            ) : loading ? (
              <Loading />
            ) : (
              <Box
                component="img"
                sx={{
                  maxHeight: "60vh",
                  width: "100%",
                }}
                alt="WordCloud"
                src={image}
              />
            )}
          </Grid>
        </Grid> */}
        </Grid>
      </Grid>
    </Grid>
  );
};
