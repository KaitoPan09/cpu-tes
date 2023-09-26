import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext } from "../../theme";
// import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
// import SearchIcon from "@mui/icons-material/Search";
import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import { useProSidebar } from "react-pro-sidebar";
const Topbar = () => {
  const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const isScreenSmall = useMediaQuery(theme.breakpoints.down("sm"));
  //popup
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  const colors = tokens(theme.palette.mode);
  const { toggleSidebar, broken } = useProSidebar();
  return (
    <Box
      // position="relative"
      display="flex"
      justifyContent="space-between"
      p={2}
    >
      {/* SEARCH BAR */}
      <Box display="flex">
        <IconButton
          onClick={() => toggleSidebar()}
          sx={{
            display: broken ? "block" : "none",
          }}
        >
          <MenuOutlinedIcon />
        </IconButton>
        {/* <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mx="15px"
        >
          <img
            alt="cpu-logo"
            width="50px"
            height="50px"
            src={`../../assets/cpu-logo.png`}
            style={{ cursor: "pointer", borderRadius: "50%" }}
          />
        </Box>
        <Box>
          <Box textAlign="space-between">
            <Typography
              variant="h5"
              color={colors.grey[100]}
              fontWeight="bold"
              mt="5px"
            >
              CENTRAL PHILIPPINE UNIVERSITY
            </Typography>
            <Typography
              variant="h6"
              color={colors.yellowAccent[500]}
              sx={{
                letterSpacing: "0.25rem",
                fontSize: "0.80rem",
                fontWeight: "700",
                // display: { xs: "none", md: "block" },
                // color: "#424242",
              }}
            >
              TEACHER EVALUATION SYSTEM
            </Typography>
          </Box>
        </Box> */}
        {/* <InputBase 
                sx={{ml: 2, flex:1}} 
                placeholder="Search" />
                <IconButton type="button" sx={{p:1}}>
                    <SearchIcon />
                </IconButton> */}
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton
          id="currentUser"
          aria-controls={open ? "account-topbar" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <AccountCircleOutlinedIcon />
        </IconButton>
        <Menu
          id="account-topbar"
          aria-labelledby="currentUser"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Topbar;
