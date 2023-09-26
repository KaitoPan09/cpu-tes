import React, { useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from "@mui/material";
import { tokens } from "../../theme";
import NewReleasesOutlinedIcon from "@mui/icons-material/NewReleasesOutlined";
import Header from "../../components/Header";
import { useTheme } from "@emotion/react";
import SurveyBox from "../../components/SurveyBox";
import { useAuth } from "../../context/AuthContext";
import { SurveyCard } from "./surveyCard";
import { useNavigate } from "react-router";

const Survey = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { auth, userInfo } = useAuth();
  const [faculties, setFaculties] = React.useState([]);
  const [questionCategories, setQuestionCategories] = React.useState([]);
  useEffect(() => {
    (async () => {
      // setLoading(true);
      console.log(userInfo);
      console.log(auth);
      let faculties = null;
      if (auth.role === "Student") {
        faculties = await fetch(
          `/api/evaluations/students/evaluate?student_id=${userInfo.student_id}&user_id=${userInfo.user_id}&dept_id=${userInfo.dept_id}`,
          {
            methods: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        ).then((res) => res.json());
      } else if (auth.role === "Admin") {
        faculties = await fetch(
          `/api/evaluations/dept_heads/evaluate?user_id=${userInfo.user_id}`,
          {
            methods: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        ).then((res) => res.json());
      } else {
        faculties = await fetch(
          `/api/evaluations/faculties/evaluate?user_id=${auth.user_id}&role=${auth.role}&dept_id=${auth.dept_id}`,
          {
            methods: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        ).then((res) => res.json());
      }
      setFaculties(faculties);
      //   setSurveyInfo({
      //     ...surveyInfo,
      //     user_id: auth.user_id,
      //     dept_id: auth.dept_id,
      //   });
      //   setLoading(false);
      let questionCategories = await fetch(
        `/api/questionnaires/survey?role=${auth.role}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      ).then((res) => res.json());
      setQuestionCategories(questionCategories);
    })();
  }, []);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="SURVEYS" subtitle="Available Surveys" />
      </Box>

      {/* GRID & CHARTS */}
      {faculties && (
        <Grid container spacing={2} display="flex">
          {faculties.map((faculty) => (
            <Grid item sm={12} md={8} xl={4}>
              <SurveyCard faculty={faculty} questionCategories={questionCategories} />
            </Grid>
          ))}
        </Grid>
      )}

    </Box>
  );
};

export default Survey;
