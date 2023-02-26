import React from "react";
import MainLayoutNav from "../navbar/MainLayoutNav";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import DeveloperBoardIcon from "@mui/icons-material/DeveloperBoard";
import HomeIcon from "@mui/icons-material/Home";

import { Link } from "react-router-dom";

const sidebarItems = [
  {
    title: "Boards",
    path: "/boards",
    icon: <DashboardCustomizeIcon />,
    hasBottomDivider: false,
    hasTopDivider: false,
    subItems: null,
  },
  {
    title: "Templates",
    path: "/templates",
    icon: <DeveloperBoardIcon />,
    hasBottomDivider: false,
    hasTopDivider: false,
    hasSubItems: false,
    subItems: null,
  },
  {
    title: "Home",
    path: "/starred",
    icon: <HomeIcon />,
    hasBottomDivider: false,
    hasTopDivider: false,
    hasSubItems: false,
    subItems: null,
  },
];
export default function MainLayout({ children }) {
  return (
    <>
      <MainLayoutNav

      // handleDrawerOpen={handleDrawerOpen} open={open}
      />
      <Box className="main-layout">
        <CssBaseline />

        <Box className="side">
          <List>
            {sidebarItems.map((sidebar, i) => (
              <Link key={i} to={sidebar.path}>
                {sidebar.hasTopDivider && <Divider />}
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>{sidebar.icon}</ListItemIcon>
                    <ListItemText primary={sidebar.title} />
                  </ListItemButton>
                </ListItem>
                {sidebar.hasBottomDivider && <Divider />}
              </Link>
            ))}
            <Divider />
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Workspaces" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
        <div className="workspaces">{children}</div>
      </Box>
    </>

 
  );
}
