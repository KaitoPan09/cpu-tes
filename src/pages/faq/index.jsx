import React from 'react'
import { Box, useTheme, Typography } from "@mui/material";
import Header from "../../components/Header"
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";

const FAQ = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return <Box m="20px">
        <Header title="FAQ" subtitle="Frquently Asked Questions Page" />

        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary 
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1bh-content"
                id="panel1bh-header">
                <Typography 
                    color={colors.greenAccent[500]}
                    variant="h5"
                    >
                        Where is the Monitoring Page?
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                Go to the "Evaluation" link in the sidebar. Inside the Evaluation Page, click on the "Magnefying Glass" icon
                to view the current status of your college's surveys.
            </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
            <AccordionSummary 
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel2bh-content"
                id="panel2bh-header">
                <Typography 
                    color={colors.greenAccent[500]}
                    variant="h5"
                    >
                        How Do I Check Which Student/Teacher Has Answered Their Surveys?
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    Under the Student or Teacher Column, click on the "Magnefying Glass" Icon next to the number where you can see
                    the current survey count of that specific teacher.
                </Typography>
            </AccordionDetails>
        </Accordion>

        <Accordion  expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
            <AccordionSummary 
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel3bh-content"
                id="panel3bh-header">
                <Typography 
                    color={colors.greenAccent[500]}
                    variant="h5"
                    >
                        How Can I Quickly Find The Specific Teacher Whose Survey I Want To Check?
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    Click on the filter button above the faculty header then type the name of teacher you want to check on.
                </Typography>
            </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
            <AccordionSummary 
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel4bh-content"
                id="panel4bh-header">
                <Typography 
                    color={colors.greenAccent[500]}
                    variant="h5"
                    >
                        What If I Just Want To See A List Of Students Who Have Not Answered Their Surveys?
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    Click on the "STUDENTS" tab next to the faculty, it will show a list of all students with pending surveys.
                    Note that this list does not include students who have completed all of their surveys.
                </Typography>
            </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
            <AccordionSummary 
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel5bh-content"
                id="panel5bh-header">
                <Typography 
                    color={colors.greenAccent[500]}
                    variant="h5"
                    >
                        Can I Have A Soft Copy Of These Lists For Our Records?
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                Yes! Above each table, there is a "Generate Report" button that you can use to download a 
                PDF file of the tables visible in this web system.
                </Typography>
            </AccordionDetails>
        </Accordion>

        {/* <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
            <AccordionSummary 
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel6bh-content"
                id="panel6bh-header">
                <Typography 
                    color={colors.greenAccent[500]}
                    variant="h5"
                    >
                        What If We Have More Questions?
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    If you have more question, please don't be afraid to ask us for our help directly.
                </Typography>
            </AccordionDetails>
        </Accordion> */}
    </Box>
}

export default FAQ;