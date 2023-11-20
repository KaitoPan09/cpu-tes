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
