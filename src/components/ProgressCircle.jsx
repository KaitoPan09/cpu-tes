import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from "../theme";
import React from "react";

//progress indicates circle progress
const ProgressCircle = ({ progress = "0.75", size = "40" }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const angle = progress * 360;

    return (
        <Box 
            sx={{ 
                position: "relative",
                width: `${size}px`,
                height: `${size}px`
                }}>
                    <Box
                        sx={{
                            background: `radial-gradient(${colors.darkBlue[400]} 55%,
                                transparent 56%),
                                conic-gradient(transparent 0deg ${angle}deg,
                                    ${colors.redAccent[500]} ${angle}deg 360deg),
                                    ${colors.yellowAccent[500]}`,
                            borderRadius: "50%",
                            width: `${size}px`,
                            height: `${size}px`
                        }}
                        />
                            <Typography
                                variant="h3"
                                sx={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    color: colors.primary,
                                    fontWeight: "bold"
                                }}
                            >
                                {`${Math.round(parseFloat(progress) * 100)}%`}
                            </Typography>
        </Box>
        // <Box
        //     sx={{
        //         background: `radial-gradient(${colors.darkBlue[400]} 55%,
        //             transparent 56%),
        //             conic-gradient(transparent 0deg ${angle}deg,
        //                 ${colors.redAccent[500]} ${angle}deg 360deg),
        //                 ${colors.yellowAccent[500]}`,
        //         borderRadius: "50%",
        //         width: `${size}px`,
        //         height: `${size}px`
        //     }}
        //     />
    )

}

export default ProgressCircle

