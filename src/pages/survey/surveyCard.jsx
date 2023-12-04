import { useTheme } from "@emotion/react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
  CardActionArea,
  CardMedia,
} from "@mui/material";
import React from "react";
import { tokens } from "../../theme";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import supervisorImg from "../../assets/images/cardImages/supervisorSurvey.jpg";
import selfImg from "../../assets/images/cardImages/selfSurvey.jpg";
import peerImg from "../../assets/images/cardImages/peerSurvey.jpg";
import defaultImg from "../../assets/images/cardImages/defaultSurvey.jpg";

export const SurveyCard = ({ faculty, questionCategories, surveyType }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { auth } = useAuth();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  const cardBackgroundColor = () => {
    switch (surveyType) {
      case "Supervisor":
        return colors.orangeAccent[200];
      case "Self":
        return colors.blueAccent[200];
      case "Peer":
        return colors.greenAccent[200];
      default:
        return colors.darkBlue[200];
    }
  };
  // const colorPools = {
  //   Supervisor: [colors.orangeAccent[200], colors.redAccent[200], colors.purpleAccent[200]],
  //   Self: [colors.yellowAccent[200], colors.yellowAccent[400], colors.yellowAccent[600]],
  //   Peer: [colors.greenAccent[200], colors.blueAccent[200], colors.purpleAccent[200]],
  //   Default: [colors.darkBlue[200]],
  // };

  // const colorPool = colorPools[surveyType] || colorPools.Default;
  // const storedIndex = localStorage.getItem(`${surveyType}_colorIndex`);
  // const colorIndex = (storedIndex ? parseInt(storedIndex, 10) : -1) + 1;
  // const rotatedIndex = colorIndex % colorPool.length;
  // localStorage.setItem(`${surveyType}_colorIndex`, rotatedIndex);

  // const cardBackgroundColor = colorPool[rotatedIndex];

  const cardBackgroundImage = () => {
    switch (surveyType) {
      case "Supervisor":
        return supervisorImg;
      case "Self":
        return selfImg;
      case "Peer":
        return peerImg;
      default:
        return defaultImg;
    }
  };

  return (
    <>
      <Card
        variant="elevation"
        sx={{
          minWidth: 340,
          maxWidth: 580,
          backgroundColor: cardBackgroundColor()
        }}
      >
        {/* <CardMedia
          component="img"
          height="140"
          image={cardBackgroundImage()}
          alt="survey image"
        /> */}
        <CardContent
          sx={{
            backgroundColor: theme.palette.background.paper,
            mt: theme.spacing(2),
          }}
        >
          <Grid container direction="column" spacing={2}>
            <Grid item xs>
              <Typography
                variant="h3"
                fontWeight="bold"
                sx={{ color: colors.grey[100] }}
              >
                {faculty.faculty}
              </Typography>
            </Grid>
            <Grid item container>
              <Grid item xs>
                <Typography variant="h5" color="text.secondary">
                  College:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography
                  variant="h5"
                  sx={{ color: colors.yellowAccent[400] }}
                >
                  {faculty.college}
                </Typography>
              </Grid>
            </Grid>
            <Grid item container>
              <Grid item xs>
                <Typography variant="h5" color="text.secondary">
                  Department:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography
                  variant="h5"
                  sx={{ color: colors.yellowAccent[400] }}
                >
                  {faculty.department}
                </Typography>
              </Grid>
            </Grid>
            {/* not student */}
            {faculty.eval_type ? (
              <Grid item container>
                <Grid item xs>
                  <Typography variant="h5" color="text.secondary">
                    Type:
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography
                    variant="h5"
                    fontWeight={700}
                    sx={{ color: cardBackgroundColor() }}
                  >
                    {faculty.eval_type} Evaluation
                  </Typography>
                </Grid>
              </Grid>
            ) : (
              <>
                <Grid item container>
                  <Grid item xs>
                    <Typography variant="h5" color="text.secondary">
                      Subject:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography
                      variant="h5"
                      sx={{ color: colors.yellowAccent[400] }}
                    >
                      {faculty.subject}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item container>
                  <Grid item xs>
                    <Typography variant="h5" color="text.secondary">
                      Stub:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography
                      variant="h5"
                      sx={{ color: colors.yellowAccent[400] }}
                    >
                      {faculty.stub_code}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item container>
                  <Grid item xs>
                    <Typography variant="h5" color="text.secondary">
                      Class Time:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography
                      variant="h5"
                      sx={{ color: colors.yellowAccent[400] }}
                    >
                      {faculty.class_time}
                    </Typography>
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
        </CardContent>
        <CardActions>
          <Grid container justifyContent="flex-end">
            <Grid item>
              {faculty.isCompleted ? (
                <Button
                  disabled
                  size="small"
                  variant="outlined"
                  sx={{
                    backgroundColor: colors.grey[700],
                    color: colors.grey[100],
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  Completed
                </Button>
              ) : (
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => setOpen(true)}
                  sx={{
                    backgroundColor: colors.blueAccent[700],
                    color: colors.grey[100],
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  EVALUATE
                </Button>
              )}
            </Grid>
          </Grid>
        </CardActions>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Data Privacy</DialogTitle>
        <DialogContent>
          <DialogContentText>
            CPU believes in the sanctity of personal information and the rights
            of individuals to Data Privacy per Republic Act 10173 (Data Privacy
            Act of 2012). Thus, CPU is committed to the protection and
            responsible use of such information. CPU will only collect, use, and
            disclose personal information with the student’s or if applicable,
            guardian’s or parent‘s knowledge and consent. For further
            information, you may access Data Privacy Act of 2012 at
            https://privacy.gov.ph/data-privacy-act/
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              // if (auth.role === "Student") {
              //   navigate("/survey/surveyForm", {
              //     state: {
              //       faculty: faculty,
              //       questionCategories: questionCategories,
              //     },
              //   });
              // }
              navigate("/survey/surveyForm", {
                state: {
                  faculty: faculty,
                  questionCategories: questionCategories,
                },
              });
              setOpen(false);
            }}
            sx={{
              color: colors.yellowAccent[500],
            }}
          >
            Agree
          </Button>
          <Button
            sx={{
              color: colors.yellowAccent[500],
            }}
            onClick={handleClose}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
