import { useState } from "react";
import { Menu, ProSidebar, MenuItem} from "react-pro-sidebar";
import 'react-pro-sidebar/dist/css/styles.css'
import { useTheme, Box, Typography, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../../theme";

import { useSidebarContext } from "./sidebarContext";

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

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import SwitchRightOutlinedIcon from "@mui/icons-material/SwitchRightOutlined";
import SwitchLeftOutlinedIcon from "@mui/icons-material/SwitchLeftOutlined";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
      routerLink={<Link to={to} />}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("Dashboard");
  const { sidebarRTL, setSidebarRTL, sidebarImage } = useSidebarContext();
  const { collapseSidebar, toggleSidebar, collapsed, broken } = ProSidebar();
//   const { collapseSidebar, toggleSidebar, collapsed, broken } = useProSidebar();
  return (
    <Box
      sx={{
        position: "sticky",
        display: "flex",
        height: "100vh",
        top: 0,
        bottom: 0,
        zIndex: 10000,
        // "& .sidebar": {
        //   border: "none",
        // },
        // "& .menu-icon": {
        //   backgroundColor: "transparent !important",
        // },
        // "& .menu-item": {
        //   // padding: "5px 35px 5px 20px !important",
        //   backgroundColor: "transparent !important",
        // },
        // "& .menu-anchor": {
        //   color: "inherit !important",
        //   backgroundColor: "transparent !important",
        // },
        // "& .menu-item:hover": {
        //   color: `${colors.blueAccent[500]} !important`,
        //   backgroundColor: "transparent !important",
        // },
        // "& .menu-item.active": {
        //   color: `${colors.greenAccent[500]} !important`,
        //   backgroundColor: "transparent !important",
        // },
        "& .pro-sidebar-inner": {background: `${colors.darkBlue[400]} !important`,},
        "& .pro-icon-wrapper": { backgroundColor: "transparent !important",},
        "& .pro-inner-item": {padding: "5px 35px 5px 20px !important",},
        "& .pro-inner-item:hover": {color: `${colors.yellowAccent[200]} !important`,},
        "& .pro-menu-item.active": {color:`${colors.yellowAccent[400]} !important`,},
      }}
    >
      <ProSidebar
        breakPoint="md"
        // rtl={sidebarRTL}
        // backgroundColor={colors.primary[400]}
        // image={sidebarImage}
      >
        <Menu iconshape="square">
          <MenuItem
            icon={
              collapsed ? (
                <MenuOutlinedIcon onClick={() => collapseSidebar()} />
              ) : undefined
            //   : sidebarRTL ? (
            //     <SwitchLeftOutlinedIcon
            //       onClick={() => setSidebarRTL(!sidebarRTL)}
            //     />
            //   ) : (
            //     <SwitchRightOutlinedIcon
            //       onClick={() => setSidebarRTL(!sidebarRTL)}
            //     />
            //   )
            }
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!collapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                {/* <Typography variant="h3" color={colors.grey[100]}>
                  ADMINIS
                </Typography> */}
                <img
                    alt="cpu-logo"
                    width="50px"
                    height="50px"
                    src={`../../assets/cpu-logo.png`}
                    style={{ cursor: "pointer", borderRadius: "50%"}}
                    />
                <IconButton
                  onClick={
                    broken ? () => toggleSidebar() : () => collapseSidebar()
                  }
                >
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {!collapsed && (
            <Box mb="25px">
              {/* <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  "& .avater-image": {
                    backgroundColor: colors.primary[500],
                  },
                }}
              >
                <img
                  className="avater-image"
                  alt="profile user"
                  width="100px"
                  height="100px"
                  src={"../../assets/user.png"}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
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
          <Box paddingLeft={collapsed ? undefined : "10%"}>
            <Item
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
                />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
