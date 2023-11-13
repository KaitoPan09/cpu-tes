import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";

import { useLocation } from "react-router";
import { useTheme } from "@emotion/react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import { useNavigate } from "react-router";
import { themeJson } from "./surveyTheme";
import { useAuth } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import { useAppContext } from "../../context/AppContext";

const SurveyForm = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { auth, userInfo } = useAuth();
  const { postData, loading } = useFetch();
  const { showSnackbar } = useAppContext();
  // const [questionCategories, setQuestionCategories] = React.useState([]);
  const location = useLocation();
  const faculty = location.state.faculty;
  console.log(faculty);
  const questionCategories = location.state.questionCategories;
  const [questionRatings, setQuestionRatings] = useState([]);
  const [survey] = useState(getSurveyModel(questionCategories));
  survey.onCurrentPageChanged.add((sender, options) => {
    setPageChangeCounter(pageChangeCounter + 1);
  });
  survey.onComplete.add((sender, options) => {
    setPageChangeCounter(pageChangeCounter + 1);
  });
  const [pageChangeCounter, setPageChangeCounter] = useState(0);
  survey.showNavigationButtons = false;
  survey.applyTheme(themeJson);
  // survey.applyTheme(useTheme);
  const prevPageFunc = () => {
    survey.prevPage();
  };
  const nextPageFunc = () => {
    survey.nextPage();
  };
  const completePageFunc = async () => {
    if (survey.completeLastPage()) {
      const feedbackAnswers = [];
      const questionRatings = [];
      const data = survey.getPlainData();
      for (const question of data) {
        // console.log(question);
        if (question.isNode) {
          questionRatings.push(
            ...Object.entries(question.value).map(([question_id, rating]) => ({
              question_id: parseInt(question_id),
              rating: parseInt(rating),
            }))
          );
        } else {
          feedbackAnswers.push({
            feedback_section_id: parseInt(question.name),
            answer: question.value ? question.value : null,
          });
        }
      }
      const response = await postData(
        `/api/evaluations/${faculty.college_id}/submit_evaluation`,
        {
          user_id: userInfo.user_id,
          eval_type: faculty.eval_type ? faculty.eval_type : "Student",
          faculty_id: faculty.faculty_id,
          class_id: faculty.id,
          question_ratings: questionRatings,
          feedback_answer: feedbackAnswers,
        }
      );
      if (response.success) {
        showSnackbar(response.msg, "success");
      } else {
        showSnackbar(response.msg, "error");
      }
      // if (response)
      //   setSnackbar({
      //     message: "Survey Submitted Successfully",
      //     isOpen: true,
      //     severity: "success",
      //   });
      // else
      //   setSnackbar({
      //     message: "Survey Submission Failed",
      //     isOpen: true,
      //     severity: "error",
      //   });
    }
  };
  const renderButton = (text, func, canRender) => {
    if (!canRender) return undefined;
    return (
      <Button
        variant="contained"
        onClick={func}
        // color="primary"
        sx={{
          margin: 2,
          backgroundColor: colors.blueAccent[300],
          color: colors.grey[900],
        }}
      >
        {text}
      </Button>
    );
  };

  const handleCancel = () => {
    // setSurveyInfo({
    //   ...surveyInfo,
    //   faculty_id: null,
    //   class_id: null,
    // });
    setQuestionRatings([]);
    navigate("/survey");
    // setShowQuestionnaire(false);
  };
  const renderExternalNavigation = () => {
    if (survey.state !== "running") return undefined;
    return (
      <Grid container direction="row" justifyContent="space-between">
        <Grid item>
          {renderButton("Prev", prevPageFunc, !survey.isFirstPage)}
          {/* {!survey.isFirstPage ? (
             <Button
               variant="contained"
               onClick={prevPageFunc}
               color="primary"
               sx={{ margin: 2 }}
             >
               Prev
             </Button>
           ) : null} */}
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={handleCancel}
            // color="primary"
            sx={{
              margin: 2,
              backgroundColor: colors.blueAccent[300],
              color: colors.grey[900],
            }}
          >
            Cancel
          </Button>
          {renderButton("Next", nextPageFunc, !survey.isLastPage)}
          {renderButton("Complete", completePageFunc, survey.isLastPage)}
        </Grid>
      </Grid>
    );
  };
  return (
    <Box m="20px">
      <Header
        title="SURVEY FORM"
        subtitle="Please answer the following questions"
      />
      <Grid container direction={"column"} spacing={2}>
        <Grid item container spacing={2}>
          <Grid item xs>
            <Grid container spacing={2}>
              <Grid item md container spacing={2}>
                <Grid item>
                  <Typography variant="h5" color="text.secondary">
                    Faculty:
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="h5"
                    sx={{ color: colors.yellowAccent[400] }}
                  >
                    {faculty.faculty}
                  </Typography>
                </Grid>
              </Grid>
              {!faculty.eval_type ? (
                <>
                  <Grid item md container spacing={2}>
                    <Grid item>
                      <Typography variant="h5" color="text.secondary">
                        Subject:
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="h5"
                        sx={{ color: colors.yellowAccent[400] }}
                      >
                        {faculty.subject}
                      </Typography>{" "}
                    </Grid>
                  </Grid>
                  <Grid item md container spacing={2}>
                    <Grid item>
                      <Typography variant="h5" color="text.secondary">
                        Class Time:
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="h5"
                        sx={{ color: colors.yellowAccent[400] }}
                      >
                        {faculty.class_time}
                      </Typography>
                    </Grid>
                  </Grid>
                </>
              ) : null}
            </Grid>
          </Grid>
        </Grid>
        {survey && (
          <Grid item container>
            <Survey model={survey} />
          </Grid>
        )}
        <Grid item>{renderExternalNavigation()}</Grid>
        <Grid item>
          {survey.state === "completed" ? (
            <Button
              variant="contained"
              onClick={handleCancel}
              color="primary"
              sx={{ margin: 2 }}
            >
              Go back
            </Button>
          ) : null}
        </Grid>
      </Grid>
    </Box>
  );
};

export default SurveyForm;
const getSurveyModel = (questionCategories) => {
  const categories = questionCategories.categories;
  const feedbackSection = questionCategories.feedback_section;
  const surveyModel = {
    showQuestionNumbers: "off",
    showProgressBar: "top",
    widthMode: "auto",
    fitToContainer: true,
    showTitle: false,
    isAllRowRequired: true,
    pages: [],
  };
  const categoryPages = categories.map((category) => ({
    title: "Teacher Rating Scale",
    elements: [
      {
        type: "matrix",
        name: "cat" + category.id.toString(),
        title:
          category.category + " " + (category.weight * 100).toString() + "%",
        columns: [
          {
            value: 5,
            text: "5-VERY HIGH EXTENT",
          },
          {
            value: 4,
            text: "4-HIGH EXTENT",
          },
          {
            value: 3,
            text: "3-MODERATE EXTENT",
          },
          {
            value: 2,
            text: "2-LOW EXTENT",
          },
          {
            value: 1,
            text: "1-VERY LOW EXTENT",
          },
        ],
        rows: category.questions.map((question, index) => ({
          value: question.id.toString(),
          text: index + 1 + ". " + question.question,
        })),
        ///alternateRows: true,
        isAllRowRequired: true,
      },
    ],
  }));
  const feedbackSectionPage = {
    elements: feedbackSection.map((question) => {
      let element = {};
      if (question.type === 1) {
        element = {
          type: "boolean",
          name: question.id.toString(),
          title: question.question,
          // valueTrue: "Yes",
          // valueFalse: "No",
          // renderAs: "radio",
          isRequired: true,
        };
      } else {
        element = {
          type: "comment",
          name: question.id.toString(),
          title: question.question,
          maxLength: 500,
        };
      }
      return element;
    }),
    title: "Feedback Section",
  };
  // categoryPages.push(feedbackSectionPage);
  surveyModel.pages = categoryPages.map((page) => ({
    title: page.title,
    elements: page.elements,
  }));
  surveyModel.pages.push(feedbackSectionPage);
  return new Model(surveyModel);
};
