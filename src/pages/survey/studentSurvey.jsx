import React from 'react'; 
import { Box } from "@mui/material";
// import { tokens } from "../../theme";
import Header from "../../components/Header";
// import { useTheme } from "@emotion/react";

const StudentSurvey = () => {
    // const theme = useTheme();
    // const colors = tokens(theme.palette.mode);

    return (<Box m="20px">
        <Box 
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            >
            <Header title="SURVEY FORM" subtitle="placeholder placeholder placeholder" />
        </Box>
    </Box>
    )
}

export default StudentSurvey;

