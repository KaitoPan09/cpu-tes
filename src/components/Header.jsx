import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Header = ( { title, subtitle} ) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
      <Box mb="20px">
        <Typography
          variant="h1"
          color={colors.grey[100]}
          fontWeight="bold"
          sx={{ mb: "5px" }}
        >
          {title}
        </Typography>
        <Typography
          variant="h4"
          fontWeight="bold"
          color={colors.yellowAccent[400]}
        >
          {subtitle}
        </Typography>
      </Box>
    );
}

export default Header;