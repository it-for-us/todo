import React, { useEffect } from 'react';
import MainLayoutNav from '../../components/navbar/MainLayoutNav';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import { Link, Outlet, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getBoards } from './core/workspace.slice';
import { useSelector } from 'react-redux';

const drawerWidth = 180;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const sidebarItems = [
  {
    title: 'Boards',
    path: '/workspace',
    icon: <DashboardCustomizeIcon />,
    hasBottomDivider: false,
    hasTopDivider: false,
    subItems: null,
  },
];

export default function Workspace() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const { workspaceId } = useParams();
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.workspace.boards);

  useEffect(() => {
    if (workspaceId) {
      dispatch(
        getBoards({
          workspaceId,
        })
      );
    }
  }, [dispatch, workspaceId]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        className="sidebar"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader className="icon">
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon onClick={handleDrawerOpen} />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List
          style={{
            marginTop: '4vh',
          }}
        >
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
          {boards?.length > 0 &&
            boards.map((board, i) => (
              <Link key={i} to={`/workspace/${workspaceId}/b/${board._id}`}>
                <ListItemText primary={board.name} />
              </Link>
            ))}
        <Divider />
      </Drawer>
      <Main style={{ padding: '0' }} open={open}>
        <MainLayoutNav handleDrawerOpen={handleDrawerOpen} open={open} />
        <div className="workspace">
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <Outlet />
          </div>
        </div>
      </Main>
    </Box>
  );
}
