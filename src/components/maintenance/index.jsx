import { Box, Typography, CircularProgress } from "@mui/material";

export default function MaintenancePage() {

    return (
        <Box
        sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#2f4c6a"
        }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    p: 4,
                    borderRadius: 4,
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#3f658d"
                }}
            >
                <img
                    src="https://cdn.pixabay.com/photo/2023/07/04/19/43/man-8106958_1280.png"
                    // https://pixabay.com/illustrations/girl-dog-rain-cute-dancing-splash-8371776/
                    alt="Maintenance"
                    width="30%"
                    // height={400}
                />
                <Typography variant="h1" component="h1" align="center" color="black">
                    We'll Be Back Soon!
                </Typography>
                <Typography variant="body1" align="center" my={2} color="black">
                    We apologize for the inconvenience. The website is currently
                    undergoing maintenance. Please check back later.
                </Typography>
                <Typography variant="h5" align="center" my={2} color="black">
                    - TES Team
                </Typography>
                <CircularProgress color="primary" />
            </Box>
        </Box>
    );
}
