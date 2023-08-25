import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext } from "../../theme";
// import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
// import SearchIcon from "@mui/icons-material/Search";
import * as React from "react";
import Menu from '@mui/material/Menu';
import MenuItem from "@mui/material/MenuItem";
import useMediaQuery from "@mui/material/useMediaQuery";

const Topbar = ({ onSidebarToggle }) => {
    const theme = useTheme();
    // const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    const isScreenSmall = useMediaQuery(theme.breakpoints.down("md"));

    //popup
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (<Box 
        // position="relative"
        display="flex" 
        justifyContent="space-between" 
        p={2}>
        {/* SEARCH BAR */}
        <Box 
            display="flex" 
            // backgroundColor={colors.primary[400]} 
            // borderRadius="3px"
            >
                {/* <InputBase 
                sx={{ml: 2, flex:1}} 
                placeholder="Search" />
                <IconButton type="button" sx={{p:1}}>
                    <SearchIcon />
                </IconButton> */}
                { isScreenSmall && (
                    <IconButton onClick={onSidebarToggle}>
                        <MenuOutlinedIcon />
                    </IconButton>
                )}
        </Box>

        {/* ICONS */}
        <Box display="flex">
            <IconButton onClick={colorMode.toggleColorMode}>
                {theme.palette.mode === "dark" ? (
                    <DarkModeOutlinedIcon />
                ) : (<LightModeOutlinedIcon />)}
            </IconButton>
            <IconButton>
                <NotificationsOutlinedIcon/>
            </IconButton>
            <IconButton>
                <SettingsOutlinedIcon/>
            </IconButton>
            <IconButton
                id="currentUser"
                aria-controls={open ? "account-topbar" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                >
                
                <AccountCircleOutlinedIcon />
            </IconButton>
            <Menu
                id="account-topbar"
                aria-labelledby="currentUser"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
        </Box>
    </Box>);
}

export default Topbar;

