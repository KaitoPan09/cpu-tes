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
      {supervisor.length > 0 && (
        <Grid sx={{ mb: theme.spacing(2) }}>
          <Divider sx={{ borderWidth: 2, borderColor : colors.grey[100] }}/>
          <Typography
            variant="h3"
            color={colors.yellowAccent[500]}
            fontWeight="bold"
            sx={{ mt: theme.spacing(2) }}
          >
            Supervisor Survey
          </Typography>
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
      )}

      <Grid sx={{ mb: theme.spacing(2) }}>
        <Divider sx={{ borderWidth: 2, borderColor : colors.grey[100] }}/>
        <Typography
          variant="h3"
          color={colors.orangeAccent[500]}
          fontWeight="bold"
          sx={{ mt: theme.spacing(2) }}
        >
          Self Survey
        </Typography>
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

      {peers.length > 0 && (
        <Grid sx={{ mb: theme.spacing(2) }}>
          <Divider sx={{ borderWidth: 2, borderColor : colors.grey[100] }}/>
          <Typography
            variant="h3"
            color={colors.greenAccent[500]}
            fontWeight="bold"
            sx={{ mt: theme.spacing(2) }}
          >
            Peer Survey
          </Typography>
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
      )}
    </>
  );
};
