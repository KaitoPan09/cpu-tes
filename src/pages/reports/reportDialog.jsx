import React from 'react';
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
    Tabs
} from "@mui/material";
import BarGraph from "../../components/BarGraph";
import { dummyBarBreakdown } from "../../data/dummyData";

const ReportDialog = ({ open, setOpen, handleClose, dialogData }) => {
    console.log('dialogData in ReportDialog:', dialogData);

    return (
    <Dialog 
        open={open} 
        onClose={() => setOpen(false)} 
        fullWidth maxWidth="lg"
        PaperProps={{ 
            sx: {
                maxWidth: "100%",
                width: "100%",
                animation: "none",
            }
        }}
        >
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
        </DialogTitle>
        <DialogContent
            sx={{ height: "1000px", width: "100%", }} >
            <Box display="flex" height="100%" width="100%">
                <Box height="100%" width="35%">
                    <List sx={{ width: "100%", maxWidth: 360 }}>
                        {dummyBarBreakdown.map((item, index) => (
                        <div key={item.category}>
                        <ListItem alignItems="flex-start">
                            <ListItemText
                                primary={
                                index === 2 ? `${item.category}(30%)` 
                                : index === 4 ? `${item.category}(10%)`
                                : `${item.category}(20%)`
                            }
                                sx={{ textAlign: "left" }}
                            />
                        <ListItemText
                            primary={item.score}
                            sx={{ textAlign: "right" }}
                            />
                        </ListItem>
                        <Divider />
                        </div>
                        ))}
                    </List>
                </Box>
                <Box height="100%" width="100%">
                    <BarGraph reportDetails={true} />
                </Box>
            </Box>
        </DialogContent>
        <Divider />
        <Grid container justifyContent="center">
            <Tabs
                        // value={value}
                        // onChange={handleChange}
                        indicatorColor="secondary"
                        textColor="secondary"
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        <Tab label="Student" sx={{ marginRight: 10 }}/>
                        <Tab label="Supervisor" sx={{ marginRight: 10 }}/>
                        <Tab label="Peer" sx={{ marginRight: 10 }}/>
                        <Tab label="Self" sx={{ marginRight: 10 }}/>
                        <Tab label="Sentiment" sx={{ marginRight: 10 }}/>
            </Tabs>
        </Grid>
        {/* <Tabs
                    // value={value}
                    // onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="secondary"
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    <Tab label="Student" />
                    <Tab label="Supervisor" />
                    <Tab label="Peer" />
                    <Tab label="Self" />
                    <Tab label="Sentiment" />
        </Tabs> */}
    <DialogActions>
        <Button
            variant="outlined"
            onClick={handleClose}
        >
            Close
        </Button>
    </DialogActions>
    </Dialog>
    );
};

export default ReportDialog;
