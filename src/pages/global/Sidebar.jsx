import React, { useState } from "react";
import { ProSidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import {
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import CorporateFareOutlinedIcon from "@mui/icons-material/CorporateFareOutlined";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
import BallotOutlinedIcon from "@mui/icons-material/BallotOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useAuth } from "../../context/AuthContext";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { ChevronLeftOutlined } from "@mui/icons-material";

const Item = ({ title, to, icon, selected, setSelected, setToggle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => {
        setSelected(title);
        setToggle(false);
      }}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = ({ toggle, setToggle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const { auth, userInfo } = useAuth();
  // const { collapseSidebar, toggleSidebar, collapsed, broken } = useProSidebar();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const sideBarList = [
    {
      access: ["Admin", "Department Head", "Teacher", "Student"],
      name: "Dashboard",
      path: "/",
      icon: <HomeOutlinedIcon />,
    },
    {
      access: ["Admin"],
      name: "Academic Year",
      path: "acad_years",
      icon: <SchoolOutlinedIcon />,
    },
    {
      access: ["Admin"],
      name: "Users",
      path: "users",
      icon: <PeopleOutlineOutlinedIcon />,
    },
    {
      access: ["Admin", "Department Head"],
      name: "Departments",
      path: "departments",
      icon: <CorporateFareOutlinedIcon />,
    },
    {
      access: ["Admin"],
      name: "Questionnaire",
      path: "questionnaire",
      icon: <QuizOutlinedIcon />,
    },
    {
      access: ["Admin", "Department Head"],
      name: "Evaluation",
      path: "evaluation",
      icon: <PollOutlinedIcon />,
    },
    {
      access: ["Admin", "Department Head", "Teacher", "Student"],
      name: "Survey",
      path: "survey",
      icon: <BallotOutlinedIcon />,
    },
    {
      access: ["Admin", "Department Head"],
      name: "Reports",
      path: "reports",
      icon: <TimelineOutlinedIcon />,
    },
  ];
  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.darkBlue[400]} !important`,
        },
        "& .pro-icon-wrapper": { backgroundColor: "transparent !important" },
        "& .pro-inner-item": { padding: "5px 35px 5px 20px !important" },
        "& .pro-inner-item:hover": {
          color: `${colors.yellowAccent[200]} !important`,
        },
        "& .pro-menu-item.active": {
          color: `${colors.yellowAccent[400]} !important`,
        },
        // "& .pro-inner-item:hover": {color: "#868dfb !important",},
        // "& .pro-menu-item.active": {color:"#6870fa !important",},
      }}
    >
      {/* <ProSidebar collapsed={isCollapsed}> */}
      {/* <ProSidebar collapsed={toggled || isCollapsed}> */}
      <ProSidebar collapsed={isCollapsed} toggled={toggle} breakPoint="sm">
        <Menu iconShape="square">
          {isCollapsed && (
            <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={<MenuOutlinedIcon />}
              style={{
                margin: "10px 0 20px 0",
                color: colors.grey[100],
              }}
            />
          )}
          <Grid
            container
            mb={"15px"}
            // mt={"10px"}
            justifyContent="flex-start"
            alignItems="center"
            direction={"column"}
            display={isCollapsed ? "none" : "flex"}
          >
            <Grid item container justifyContent={"flex-end"}>
              <IconButton
                onClick={() => {
                  isSmallScreen
                    ? setToggle(!toggle)
                    : setIsCollapsed(!isCollapsed);
                }}
              >
                <ChevronLeftOutlined
                  sx={{
                    display: {
                      sm: "none",
                      md: "block",
                      lg: "none",
                    },
                  }}
                />
              </IconButton>
            </Grid>
            <Grid item>
              <Avatar
                src={`../../assets/cpu-logo.png`}
                sx={{
                  cursor: "pointer",
                  border: "1px solid #fff",
                  width: "64px",
                  height: "64px",
                  mb: "10px",
                }}
              />
            </Grid>
            <Grid item>
              <Typography
                color={colors.grey[100]}
                sx={{
                  fontSize: "1rem",
                  fontWeight: "700",
                }}
              >
                CENTRAL PHILIPPINE UNIVERSITY
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                color={colors.yellowAccent[500]}
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: "500",
                  letterSpacing: "0.16rem",
                }}
              >
                TEACHER'S EVALUATION SYSTEM
              </Typography>
            </Grid>
          </Grid>
          {/* {!isLargeScreen && (
            <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
              <MenuOutlinedIcon />
            </IconButton>
          )} */}
          <Divider />
          {/* MENU ITEMS */}
          <Box mt={"10px"} paddingLeft={isCollapsed ? undefined : "10%"}>
            {sideBarList.map((sideBar) =>
              sideBar.access.includes(auth.role) ? (
                <Item
                  key={sideBar.name}
                  title={sideBar.name}
                  to={sideBar.path}
                  icon={sideBar.icon}
                  selected={selected}
                  setSelected={setSelected}
                  setToggle={setToggle}
                />
              ) : // <ListItem key={sideBar.name} disablePadding>
              //   <ListItemButton onClick={() => navigate(sideBar.path)}>
              //     <ListItemIcon sx={{ color: "#1565c0" }}>
              //       {sideBar.icon}
              //     </ListItemIcon>
              //     <ListItemText primary={sideBar.name} />
              //   </ListItemButton>
              // </ListItem>
              null
            )}
            {/* <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
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
            /> */}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
