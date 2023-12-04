import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
// import "react-pro-sidebar/dist/css/styles.css";
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
import { Link, useLocation } from "react-router-dom";
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
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import { useAuth } from "../../context/AuthContext";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { ChevronLeftOutlined } from "@mui/icons-material";
import { useEffect } from "react";

const Item = ({ title, to, icon }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { toggleSidebar } = useProSidebar();
  const location = useLocation();
  return (
    <MenuItem
      active={location.pathname === to}
      style={{ color: colors.grey[100] }}
      onClick={() => {
        toggleSidebar();
      }}
      icon={icon}
      routerLink={<Link to={to} />}
    >
      <Typography sx={{ fontSize: "1.25rem" }}>{title}</Typography>
    </MenuItem>
  );
};

const ProSidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { auth, userInfo } = useAuth();
  const { toggleSidebar, broken } = useProSidebar();
  const iconStyle = { fontSize: '2rem' };

  const sideBarList = [
    {
      access: [
        "Admin",
        "Dean",
        "Department Head",
        "Secretary",
        "Teacher",
        "Student",
      ],
      name: "Dashboard",
      path: "/",
      icon: <HomeOutlinedIcon sx={{ fontSize: iconStyle }}/>,
    },
    {
      access: ["Admin"],
      name: "Academic Year",
      path: "/acad_years",
      icon: <SchoolOutlinedIcon sx={{ fontSize: iconStyle }}/>,
    },
    {
      access: ["Admin"],
      name: "Users",
      path: "/users",
      icon: <PeopleOutlineOutlinedIcon sx={{ fontSize: iconStyle }}/>,
    },
    {
      access: ["Admin"],
      name: "Colleges",
      path: "/colleges",
      icon: <CorporateFareOutlinedIcon sx={{ fontSize: iconStyle }}/>,
    },
    {
      access: ["Dean"],
      name: "College",
      path: `/colleges/${userInfo.college_id}/manage`,
      icon: <CorporateFareOutlinedIcon sx={{ fontSize: iconStyle }}/>,
    },
    {
      access: ["Dean"],
      name: "Departments",
      path: `/colleges/${userInfo.college_id}/departments`,
      icon: <CorporateFareOutlinedIcon sx={{ fontSize: iconStyle }}/>,
    },
    {
      access: ["Department Head"],
      name: "Department",
      path: `/departments/${userInfo.dept_id}/manage`,
      icon: <CorporateFareOutlinedIcon sx={{ fontSize: iconStyle }}/>,
    },
    {
      access: ["Admin"],
      name: "Questionnaire",
      path: "/questionnaire",
      icon: <QuizOutlinedIcon sx={{ fontSize: iconStyle }}/>,
    },
    {
      access: ["Admin"],
      name: "Evaluations",
      path: "/evaluations",
      icon: <PollOutlinedIcon sx={{ fontSize: iconStyle }}/>,
    },
    {
      access: ["Dean", "Department Head", "Secretary"],
      name: "Evaluation",
      path: `/evaluations/${userInfo.college_id}/view`,
      icon: <PollOutlinedIcon sx={{ fontSize: iconStyle }}/>,
    },
    {
      access: ["Admin", "Dean", "Department Head", "Teacher", "Student"],
      name: "Survey",
      path: "/survey",
      icon: <BallotOutlinedIcon sx={{ fontSize: iconStyle }}/>,
    },
    {
      access: ["Admin", "Dean", "Department Head", "Secretary"],
      name: "Reports",
      path: "/reports",
      icon: <TimelineOutlinedIcon sx={{ fontSize: iconStyle }}/>,
    },
    // {
    //   access: ["Dean", "Department Head"],
    //   name: "Reports",
    //   path: `/reports/${userInfo.college_id}/reportDetails`,
    //   icon: <TimelineOutlinedIcon />,
    // },
    {
      access: ["Admin", "Dean", "Department Head", "Secretary"],
      name: "FAQ",
      path: `/faq`,
      icon: <HelpOutlinedIcon sx={{ fontSize: iconStyle }}/>,
    },
  ];
  return (
    <Box
      sx={{
        position: "sticky",
        display: "flex",
        height: "100vh",
        top: 0,
        bottom: 0,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        "& .sidebar": {
          border: "none",
        },
        "& .menu-icon": {
          backgroundColor: "transparent !important",
        },
        "& .menu-item": {
          // padding: "5px 35px 5px 20px !important",
          backgroundColor: "transparent !important",
        },
        "& .menu-anchor": {
          color: "inherit !important",
          backgroundColor: "transparent !important",
        },
        "& .menu-item:hover": {
          color: `${colors.yellowAccent[200]} !important`,
          backgroundColor: "transparent !important",
        },
        "& .menu-item.active": {
          color: `${colors.yellowAccent[400]} !important`,
          backgroundColor: "transparent !important",
        },
        // "& .pro-sidebar-inner": {
        //   background: `${colors.darkBlue[400]} !important`,
        // },
        // "& .pro-icon-wrapper": { backgroundColor: "transparent !important" },
        // "& .pro-inner-item": { padding: "5px 35px 5px 20px !important" },
        // "& .pro-inner-item:hover": {
        //   color: `${colors.yellowAccent[200]} !important`,
        // },
        // "& .pro-menu-item.active": {
        //   color: `${colors.yellowAccent[400]} !important`,
        // },
        // "& .pro-inner-item:hover": {color: "#868dfb !important",},
        // "& .pro-menu-item.active": {color:"#6870fa !important",},
      }}
    >
      {/* <ProSidebar collapsed={isCollapsed}> */}
      {/* <ProSidebar collapsed={toggled || isCollapsed}> */}
      <Sidebar
        //toggled={toggle}
        breakPoint="lg"
        backgroundColor={colors.darkBlue[400]}
      >
        <Menu>
          {/* {collapsed && (
            <MenuItem
              onClick={() => collapseSidebar()}
              icon={<MenuOutlinedIcon />}
              style={{
                margin: "10px 0 20px 0",
                color: colors.grey[100],
              }}
            />
          )} */}
          <Grid
            container
            mb={"15px"}
            mt={broken ? "0" : "20px"}
            justifyContent="flex-start"
            alignItems="center"
            direction={"column"}
            // display={isCollapsed ? "none" : "flex"}
          >
            {broken && (
              <Grid item container justifyContent={"flex-end"}>
                <IconButton
                  onClick={() => {
                    toggleSidebar();
                  }}
                  sx={{ fontSize: "1.5rem" }}
                >
                  <ChevronLeftOutlined />
                </IconButton>
              </Grid>
            )}
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
          <Divider />
          {/* MENU ITEMS */}
          <Box mt={"10px"} paddingLeft={"10%"}>
            {sideBarList.map((sideBar) =>
              sideBar.access.includes(auth.role) ? (
                <Item
                  key={sideBar.name}
                  title={sideBar.name}
                  // to={
                  //   auth.role === "Department Head"
                  //     ? sideBar.name === "Department"
                  //       ? `/colleges/${userInfo.dept_id}` + sideBar.path
                  //       : sideBar.path
                  //     : sideBar.path
                  // }
                  to={sideBar.path}
                  icon={sideBar.icon}
                />
              ) : null
            )}
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default ProSidebar;
