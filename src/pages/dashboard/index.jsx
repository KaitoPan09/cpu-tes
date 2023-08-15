import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import SurveyBox from '../../components/SurveyBox';

const Dashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)

    return (<Box m="20px">
            <Box 
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                >
                <Header title="DASHBOARD" subtitle="Welcome" />
            </Box>

            {/* GRIDS & CHARTS */}
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
                >
                {/* ROW 1 */}
                <Box
                    gridColumn="span 3"
                    backgroundColor = {colors.darkBlue[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    >
                        <SurveyBox
                            title="CCS Dept Head"
                            subtitle="College of Computer Studies"
                            surveyType="Supervisor Evaluation"
                            />
                </Box>
                <Box
                    gridColumn="span 3"
                    backgroundColor = {colors.darkBlue[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    >
                        <SurveyBox
                            title="CBA Dept Head"
                            subtitle="College of Business and Accounting"
                            surveyType="Supervisor Evaluation"
                            />
                </Box>
                <Box
                    gridColumn="span 3"
                    backgroundColor = {colors.darkBlue[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    >
                        <SurveyBox
                            title="CAS Dept Head"
                            subtitle="College of Arts and Sciences"
                            surveyType="Supervisor Evaluation"
                            />
                </Box>
                <Box
                    gridColumn="span 3"
                    backgroundColor = {colors.darkBlue[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    >
                        <SurveyBox
                            title="Joshua Nguyen"
                            subtitle="College of Engineering"
                            surveyType="Supervisor Evaluation"
                            />
                </Box>

                {/* ROW 2 */}
                
            </Box>
        </Box>
    )
}

export default Dashboard;