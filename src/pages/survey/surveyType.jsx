import { Grid, Typography, useTheme, Divider } from "@mui/material";
import React from "react";
import { SurveyCard } from "./surveyCard";
import { tokens } from "../../theme";

export const SurveyType = ({ faculties, questionCategories }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const peers = faculties.filter((faculty) => faculty.eval_type === "Peer");
  const supervisor = faculties.filter(
    (faculty) => faculty.eval_type === "Supervisor"
  );
  const self = faculties.filter((faculty) => faculty.eval_type === "Self");
  return (
    <>
      <Grid sx={{ mb: theme.spacing(2)}}>
        <Divider />
        <Typography
          variant="h5"
          color={colors.yellowAccent[500]}
          fontWeight="bold"
          sx={{ mt: theme.spacing(2)}}
          >
            Supervisors</Typography>
        <Grid container spacing={2} display="flex">
          {supervisor.map((faculty) => (
            <Grid item sm={12} md={6} key={faculty.id}>
              <SurveyCard
                faculty={faculty}
                questionCategories={questionCategories}
                surveyType="Supervisor"
              />
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid sx={{ mb: theme.spacing(2)}}>
        <Divider />
        <Typography
          variant="h5"
          color={colors.orangeAccent[500]}
          fontWeight="bold"
          sx={{ mt: theme.spacing(2)}}
          >
            Self</Typography>
        <Grid container spacing={2} display="flex">
          {self.map((faculty) => (
            <Grid item sm={12} md={6} key={faculty.id}>
              <SurveyCard
                faculty={faculty}
                questionCategories={questionCategories}
                surveyType="Self"
              />
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid sx={{ mb: theme.spacing(2)}}>
        <Divider />
        <Typography
          variant="h5"
          color={colors.greenAccent[500]}
          fontWeight="bold"
          sx={{ mt: theme.spacing(2)}}
          >
            Peers</Typography>
        <Grid container spacing={2} display="flex">
          {peers.map((faculty) => (
            <Grid item sm={12} md={6} key={faculty.id}>
              <SurveyCard
                faculty={faculty}
                questionCategories={questionCategories}
                surveyType="Peer"
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
};
