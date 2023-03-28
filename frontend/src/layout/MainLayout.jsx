import React from "react";
import MainLayoutNav from "../components/navbar/MainLayoutNav";
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
  Button
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import DeveloperBoardIcon from "@mui/icons-material/DeveloperBoard";
import HomeIcon from "@mui/icons-material/Home";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteWorkspace } from "../modules/workspace/core/workspace.slice";

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
    // path: "/templates",
    icon: <DeveloperBoardIcon />,
    hasBottomDivider: false,
    hasTopDivider: false,
    hasSubItems: false,
    subItems: null,
  },
  {
    title: "Home",
    // path: "/starred",
    icon: <HomeIcon />,
    hasBottomDivider: false,
    hasTopDivider: false,
    hasSubItems: false,
    subItems: null,
  },
];
export default function MainLayout({ children }) {

  const { workspaces } = useSelector((state) => state.workspace);
  const dispatch = useDispatch()


  const delWorkspace = (workspaceId) => {
    dispatch(deleteWorkspace(workspaceId))
  }

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
                        <Typography sx={{ width: '100%' }} ><span style={{ color: 'white', background: 'linear-gradient( #0747a6,#008da6)', marginRight: '5px', padding: '10px', borderRadius: '10px', textAlign: 'center' }} >{(workspace.name).slice(0, 1)} </span> {workspace.name}</Typography>
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
                        <ListItem disablePadding>
                          <ListItemButton onClick={() => delWorkspace(workspace._id)} >
                            <Button variant="outlined" color="error" startIcon={<DeleteIcon />}>
                              Delete
                            </Button>
                          </ListItemButton>
                        </ListItem>
                      </AccordionDetails>
                    </Accordion>
                  </ListItemButton>
                </ListItem>
                <Divider />
              </>
            ))}
          </List>
        </Box>
        <div className="workspaces-container">{children}</div>
      </Box>
    </>
  );
}
