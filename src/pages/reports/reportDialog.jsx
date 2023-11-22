import React, { useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  ListItemText,
  Typography,
  List,
  ListItem,
  Divider,
  Grid,
  Tab,
  Tabs,
  CircularProgress,
} from "@mui/material";
import BarGraph from "../../components/BarGraph";
import { dummyBarBreakdown } from "../../data/dummyData";
import useFetch from "../../hooks/useFetch";
import { height } from "@mui/system";
import { Skeleton } from "survey-react-ui";
import { useParams } from "react-router";

const ReportDialog = ({ open, setOpen, handleClose, dialogData }) => {
  const { evalId } = useParams();
  const { loading, request } = useFetch();
  useEffect(() => {
    const response = request(
      `/api/evaluations/individual_result?evaluation_id=${evalId}&faculty_id=${dialogData?.id}`
    );
  }, []);
  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="lg">
      <DialogTitle>
        <Grid container spacing={2} justifyContent={"flex-start"}>
          <Grid item>
            <Typography variant="h6" color={"text.secondary"}>
              Evaluation Results:
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" color={"primary"}>
              {dialogData?.faculty}
            </Typography>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        {loading ? (
          <Grid
            container
            justifyContent={"center"}
            alignContent={"center"}
            sx={{ height: "60vh" }}
          >
            <CircularProgress />
          </Grid>
        ) : (
          <>
            <Grid container spacing={2} sx={{ height: "60vh" }}>
              <Grid item xs={12}>
                <Tabs
                  // value={value}
                  // onChange={handleChange}
                  indicatorColor="secondary"
                  textColor="secondary"
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  <Tab label="Overall" />
                  <Tab label="By Class" />
                </Tabs>
              </Grid>
              <Grid item xs={12} md={4}>
                <List sx={{ width: "100%", maxWidth: 360 }}>
                  {dummyBarBreakdown.map((item, index) => (
                    <div key={item.category}>
                      <ListItem alignItems="flex-start">
                        <ListItemText
                          primary={
                            index === 2
                              ? `${item.category} (30%)`
                              : index === 4
                              ? `${item.category} (10%)`
                              : `${item.category} (20%)`
                          }
                          sx={{ textAlign: "left" }}
                        />
                        <ListItemText
                          primary={item.score.toFixed(2)}
                          sx={{ textAlign: "right" }}
                        />
                      </ListItem>
                      <Divider />
                    </div>
                  ))}
                </List>
              </Grid>
              <Grid item xs={12} md={8}>
                <Box height="50vh">
                  <BarGraph reportDetails={true} />
                </Box>
              </Grid>
            </Grid>
            <Divider />
            <Grid item xs={12} container justifyContent="center">
              <Tabs
                // value={value}
                // onChange={handleChange}
                indicatorColor="secondary"
                textColor="secondary"
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab label="Student" sx={{ marginRight: 10 }} />
                <Tab label="Supervisor" sx={{ marginRight: 10 }} />
                <Tab label="Peer" sx={{ marginRight: 10 }} />
                <Tab label="Self" sx={{ marginRight: 10 }} />
                <Tab label="Sentiment" sx={{ marginRight: 10 }} />
              </Tabs>
            </Grid>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReportDialog;
