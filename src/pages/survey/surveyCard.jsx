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
} from "@mui/material";
import React from "react";
import { tokens } from "../../theme";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

export const SurveyCard = ({ faculty, questionCategories }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { auth } = useAuth();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  return (
    <>
      <Card
        variant="elevation"
        sx={{
          minWidth: 340,
          maxWidth: 580,
          backgroundColor: colors.darkBlue[400],
        }}
      >
        <CardContent>
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
            {faculty.eval_type ? (
              <Grid item>
                <Typography
                  variant="h5"
                  sx={{ color: colors.yellowAccent[400] }}
                >
                  {faculty.eval_type}
                </Typography>
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
                    // backgroundColor: colors.blueAccent[700],
                    // color: colors.grey[100],
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
            information, you may access Data Privacy Act of 2012at
            https://privacy.gov.ph/data-privacy-act/
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              if (auth.role === "Student") {
                navigate("/survey/surveyForm", {
                  state: {
                    faculty: faculty,
                    questionCategories: questionCategories,
                  },
                });
              }
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
