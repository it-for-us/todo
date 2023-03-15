import React from "react";
import MainLayoutNav from "../navbar/MainLayoutNav";
import {
  ListItemText,
  ListItemIcon,
  Box,
  ListItemButton,
  Divider,
  CssBaseline,
  ListItem,
  List,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import DeveloperBoardIcon from "@mui/icons-material/DeveloperBoard";
import HomeIcon from "@mui/icons-material/Home";
import { useSelector } from "react-redux";
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
  const { workspaces } = useSelector((state) => state.workspace);

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
            <Divider />
            {workspaces.map((workspace, i) => (
              <>
                <Divider />
                <ListItem disablePadding>
                  <ListItemButton>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>{workspace.name}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Link key={i} to={`/w/${workspace.name}/home`}>
                          <ListItem disablePadding>
                            <ListItemButton>
                              <ListItemIcon>
                                <DashboardCustomizeIcon />
                              </ListItemIcon>
                              <ListItemText primary="Boards" />
                            </ListItemButton>
                          </ListItem>
                        </Link>
                      </AccordionDetails>
                    </Accordion>
                  </ListItemButton>
                </ListItem>
                <Divider />
              </>
            ))}
          </List>
        </Box>
        <div className="workspaces">{children}</div>
      </Box>
    </>
  );
}
