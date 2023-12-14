import React from "react";
import { useState } from "react";
import CustomDataGrid from "../../components/CustomDatagrid";
import {
  Alert,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { ThumbDown, ThumbUp } from "@mui/icons-material";

export const FeedBackSectionTab = ({ dialogData, selectedResult, evalId }) => {
  const bestPractices = [];
  const badPractices = [];
  const yes = [];
  const no = [];
  selectedResult.separated.student_comments.forEach((item) => {
    item.student_feedback.forEach((item) => {
      if (
        item.question ===
          "Please list down the best practices that your teacher has been doing in class and that he/she should CONTINUE doing these because they enhance your learning experience." &&
        item.response != null
      ) {
        bestPractices.push({
          id: item.id,
          response: item.response,
        });
      } else if (
        item.question ===
          "Please list down you teacher's classroom practices that did not enhance your learning experience, thus recommending that your teacher must NOT DO them anymore." &&
        item.response != null
      ) {
        badPractices.push({
          id: item.id,
          response: item.response,
        });
      } else if (item.type === 1) {
        if (item.response === "1") {
          yes.push({
            id: item.id,
            response: item.response,
          });
        } else {
          no.push({
            id: item.id,
            response: item.response,
          });
        }
      }
    });
  });
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "response",
      headerName: "Response",
      flex: 1,
      minWidth: 200,
    },
  ];
  const [rows, setRows] = useState(bestPractices);
  const [value, setValue] = React.useState("0");

  const handleChange = (event) => {
    if (event.target.value === "0") {
      setRows(bestPractices);
    } else if (event.target.value === "1") {
      setRows(badPractices);
    } else {
      setRows();
    }
    setValue(event.target.value);
  };
  return (
    <Stack spacing={2}>
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        Student Feedback Section
      </Typography>
      <Grid
        container
        spacing={2}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid item xs={12} md={8}>
          <RadioGroup
            row
            value={value}
            onChange={handleChange}
            sx={{ fontSize: "1.25rem" }}
          >
            <FormControlLabel
              value="0"
              control={<Radio />}
              label="Best Practices"
            />
            <FormControlLabel
              value="1"
              control={<Radio />}
              label="Bad Practices"
            />
          </RadioGroup>
          <CustomDataGrid
            rows={rows}
            columns={columns}
            columnVisibilityModel={{
              id: false,
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Alert
            icon={<ThumbUp fontSize="inherit" />}
            severity="success"
            sx={{ fontSize: "1rem", marginBottom: 2, maxWidth: "sm" }}
            variant="outlined"
          >
            {yes.length +
              " student/s want to be taught by this teacher again in another course or subject"}
          </Alert>
          <Alert
            icon={<ThumbDown fontSize="inherit" />}
            severity="error"
            sx={{ fontSize: "1rem", maxWidth: "sm" }}
            variant="outlined"
          >
            {no.length +
              " student/s do not want to be taught by this teacher again in another course or subject"}
          </Alert>
        </Grid>
      </Grid>
    </Stack>
  );
};
