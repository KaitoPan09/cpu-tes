import { Grid, Typography } from "@mui/material";
import React from "react";
import { SurveyCard } from "./surveyCard";

export const YourPage = ({ faculties, questionCategories }) => {
  const peers = faculties.filter((faculty) => faculty.eval_type === "Peer");
  const supervisors = faculties.filter(
    (faculty) => faculty.eval_type === "Supervisor"
  );
  const self = faculties.filter((faculty) => faculty.eval_type === "Self");
  return (
    <>
      <Typography>Peers</Typography>
      <Grid container spacing={2} display="flex">
        {peers.map((faculty) => (
          <Grid item sm={12} md={6}>
            <SurveyCard
              faculty={faculty}
              questionCategories={questionCategories}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
