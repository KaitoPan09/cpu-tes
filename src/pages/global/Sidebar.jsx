import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import 'react-pro-sidebar/dist/css/styles.css'
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import CorporateFareOutlinedIcon from '@mui/icons-material/CorporateFareOutlined';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import PollOutlinedIcon from '@mui/icons-material/PollOutlined';
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined';
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const Item = ({ title, to, icon, selected, setSelected,}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <MenuItem 
            active={selected === title} 
            style={{color: colors.grey[100]}}
            onClick={()=> setSelected(title)}
            icon={icon}
            >
            <Typography>{title}</Typography>
            <Link to={to}/>
        </MenuItem>
    )
}


const Sidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");
    
    return (
        <Box
            sx={{
                "& .pro-sidebar-inner": {background: `${colors.darkBlue[400]} !important`,},
                "& .pro-icon-wrapper": { backgroundColor: "transparent !important",},
                "& .pro-inner-item": {padding: "5px 35px 5px 20px !important",},
                "& .pro-inner-item:hover": {color: `${colors.yellowAccent[200]} !important`,},
                "& .pro-menu-item.active": {color:`${colors.yellowAccent[400]} !important`,},
                // "& .pro-inner-item:hover": {color: "#868dfb !important",},
                // "& .pro-menu-item.active": {color:"#6870fa !important",},
                }}
            >
            <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape="square">
                    <MenuItem
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                            style={{
                                margin: "10px 0 20px 0",
                                color: colors.grey[100],
                            }}
                            >
                            {!isCollapsed && (
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    ml="15px"
                                    >
                                        <img
                                        alt="cpu-logo"
                                        width="50px"
                                        height="50px"
                                        src={`../../assets/cpu-logo.png`}
                                        style={{ cursor: "pointer", borderRadius: "50%"}}
                                        />
                                    {/* <Typography variant="h3" color={colors.grey[100]}>
                                        HRD
                                    </Typography> */}
                                    <IconButton 
                                        onClick={() => setIsCollapsed(!isCollapsed)}
                                        >
                                        <MenuOutlinedIcon />
                                    </IconButton>
                                </Box>
                                )}
                            </MenuItem>
                        {!isCollapsed && (
                            <Box mb="25px">
                                {/* <Box 
                                    display="flex" 
                                    justifyContent="center" 
                                    alignItems="center"
                                    >
                                    <img
                                        alt="cpu-logo"
                                        width="75px"
                                        height="75px"
                                        src={`../../assets/cpu-logo.png`}
                                        style={{ cursor: "pointer", borderRadius: "50%"}}
                                        />
                                </Box> */}
                                <Box textAlign="center">
                                    <Typography 
                                        variant="h5" 
                                        color={colors.grey[100]}
                                        fontWeight="bold"
                                        mt="10px"
                                        >
                                            Central Philippine University
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        color={colors.yellowAccent[500]}
                                        >
                                            Teacher Evaluation System
                                    </Typography>
                                </Box>
                            </Box>
                        )}
                        {/* MENU ITEMS */}
                        <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                            <Item 
                            title="Dashboard"
                            to="/"
                            icon={<HomeOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            />

                            {/* <Typography 
                                variant="h6"
                                color={colors.gray[300]}
                                sx={{ m: "15px 0 5px 20px" }}>
                                Data
                            </Typography> */}
                            <Item 
                                title="Academic Year"
                                to="/academicyear"
                                icon={<SchoolOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                                />
                            <Item 
                                title="Users"
                                to="/users"
                                icon={<PeopleOutlineOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                                />
                            <Item 
                                title="Department"
                                to="/department"
                                icon={<CorporateFareOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                                />

                            {/* <Typography 
                                variant="h6"
                                color={colors.gray[300]}
                                sx={{ m: "15px 0 5px 20px" }}>
                                Pages
                            </Typography> */}
                            <Item 
                                title="Questionnaire"
                                to="/questionnaire"
                                icon={<QuizOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                                />
                            <Item 
                                title="Evaluation"
                                to="/evaluation"
                                icon={<PollOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                                />
                            <Item 
                                title="Survey"
                                to="/survey"
                                icon={<BallotOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                                />

                            {/* <Typography 
                                variant="h6"
                                color={colors.gray[300]}
                                sx={{ m: "15px 0 5px 20px" }}>
                                Charts
                            </Typography> */}
                            <Item 
                                title="Reports"
                                to="/reports"
                                icon={<TimelineOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                                />
                            <Item 
                                title="About"
                                to="/about"
                                icon={<InfoOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                                />
                            {/* <Item 
                                title="Line Chart"
                                to="/line"
                                icon={<TimelineOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                                />
                            <Item 
                                title="Geography Chart"
                                to="/geography"
                                icon={<MapOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                                /> */}
                        </Box>
                        {/* <Box 
                            paddingLeft={isCollapsed ? undefined : "10%"}
                            // paddingBottom={isCollapsed ? undefined : "10%"}
                            // display="flex"
                            bottom="0"
                            position="sticky"
                            >
                            <Item 
                                title="About"
                                to="/about"
                                icon={<InfoOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                                />
                        </Box> */}
                </Menu>
            </ProSidebar>
        </Box>
    )
}

export default Sidebar;