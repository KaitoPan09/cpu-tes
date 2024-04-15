import React, { useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { tokens } from "../../theme";
import NewReleasesOutlinedIcon from "@mui/icons-material/NewReleasesOutlined";
import Header from "../../components/Header";
import { useTheme } from "@emotion/react";
import SurveyBox from "../../components/SurveyBox";
import { useAuth } from "../../context/AuthContext";
import { SurveyCard } from "./surveyCard";
import { useNavigate } from "react-router";
import useFetch from "../../hooks/useFetch";
import { SurveyType } from "./surveyType";
const Survey = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { auth, userInfo } = useAuth();
  const { request, loading } = useFetch();
  const [faculties, setFaculties] = React.useState([]);
  const [questionCategories, setQuestionCategories] = React.useState([]);
  useEffect(() => {
    (async () => {
      let faculties = [];
      if (auth.role === "Student") {
        faculties = await request(
          `/api/evaluations/students/evaluate?student_id=${userInfo.student_id}&user_id=${userInfo.user_id}&college_id=${userInfo.college_id}`
        );
      } else if (auth.role !== "Admin") {
        faculties = await request(
          `/api/evaluations/faculties/evaluate?user_id=${userInfo.user_id}&role=${auth.role}&college_id=${userInfo.college_id}&dept_id=${userInfo.dept_id}`
        );
      }
      setFaculties(faculties ? faculties : []);
      let questionCategories = await request(
        `/api/questionnaires/survey?role=${auth.role}`
      );
      setQuestionCategories(questionCategories);
    })();
  }, []);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="SURVEYS" subtitle="Available Surveys" />
      </Box>
      {loading ? (
        <Grid
          container
          justifyContent={"center"}
          alignContent={"center"}
          height={"60vh"}
        >
          <CircularProgress />
        </Grid>
      ) : faculties.length === 0 ? (
        <Typography variant="h5">No Surveys Available.</Typography>
      ) : auth.role === "Student" ? (
        faculties &&
        questionCategories && (
          <Grid container spacing={2} display="flex">
            {faculties.map((faculty) => (
              <Grid item sm={12} md={6}>
                <SurveyCard
                  faculty={faculty}
                  questionCategories={questionCategories}
                />
              </Grid>
            ))}
          </Grid>
        )
      ) : (
        <SurveyType
          faculties={faculties}
          questionCategories={questionCategories}
        />
      )}
    </Box>
  );
};

export default Survey;
