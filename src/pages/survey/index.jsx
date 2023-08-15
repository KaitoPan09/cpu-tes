import React from 'react'; 
import { Box } from "@mui/material";
import { tokens } from "../../theme";
import NewReleasesOutlinedIcon from '@mui/icons-material/NewReleasesOutlined';
import Header from "../../components/Header";
import { useTheme } from "@emotion/react";
import SurveyBox from '../../components/SurveyBox';

const Survey = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (<Box m="20px">
        <Box 
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            >
            <Header title="SURVEYS" subtitle="Available Surveys" />
        </Box>

        {/* GRID & CHARTS */}
        <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gridAutoRows="140px"
            gap="20px"
            >
            <Box 
                gridColumn="span 3" 
                backgroundColor={colors.darkBlue[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
                >
                    <SurveyBox
                        title="CCS Dept Head"
                        subtitle="College of Computer Studies"
                        surveyType="Supervisor Evaluation"
                        icon={
                            <NewReleasesOutlinedIcon 
                            sx={{ 
                                color: colors.yellowAccent[300], 
                                fontSize: "26px"}} 
                            />
                        }
                        />
            </Box>
            <Box 
                gridColumn="span 3" 
                backgroundColor={colors.darkBlue[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
                >
                    <SurveyBox
                        title="CBA Dept Head"
                        subtitle="College of Business and Accounting"
                        surveyType="Supervisor Evaluation"
                        icon={
                            <NewReleasesOutlinedIcon 
                            sx={{ 
                                color: colors.yellowAccent[600], 
                                fontSize: "26px"}} 
                            />
                        }
                        />
            </Box>
            <Box 
                gridColumn="span 3" 
                backgroundColor={colors.darkBlue[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
                >
                    <SurveyBox
                        title="CAS Dept Head"
                        subtitle="College of Arts and Sciences"
                        surveyType="Supervisor Evaluation"
                        icon={
                            <NewReleasesOutlinedIcon 
                            sx={{ 
                                color: colors.yellowAccent[600], 
                                fontSize: "26px"}} 
                            />
                        }
                        />
            </Box>
            <Box 
                gridColumn="span 3" 
                backgroundColor={colors.darkBlue[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
                >
                    <SurveyBox
                        title="Joshua Nguyen"
                        subtitle="College of Engineering"
                        surveyType="Supervisor Evaluation"
                        icon={
                            <NewReleasesOutlinedIcon 
                            sx={{ 
                                color: colors.yellowAccent[600], 
                                fontSize: "26px"}} 
                            />
                        }
                        />
            </Box>
        </Box>
    </Box>
    )
}

export default Survey;

