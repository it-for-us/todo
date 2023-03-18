import React, { useEffect } from 'react';
import MainLayoutNav from '../../components/navbar/MainLayoutNav';
import { styled, useTheme } from '@mui/material/styles';
import { ListItemText, ListItemIcon, ListItemButton, ListItem, IconButton, Divider, Typography, Popover, List, CssBaseline, Drawer, Box } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import { Link, Outlet, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getBoards } from './core/workspace.slice';
import { useSelector } from 'react-redux';
import Board from './components/Board';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

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
    path: '/boards',
    icon: <DashboardCustomizeIcon />,
    hasBottomDivider: false,
    hasTopDivider: false,
    subItems: null,
  },
];

export default function Workspace() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);

  };
  console.log(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const openn = Boolean(anchorEl);
  const id = openn ? 'simple-popover' : undefined;

  const { workspaceId } = useParams();
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.workspace.boards);
  const workspace = useSelector((state) => state.workspace);
  console.log(workspace);

  useEffect(() => {
    if (workspaceId) {
      dispatch(
        getBoards({
          workspaceId,
        })
      );
    }
  }, [dispatch, workspaceId]);


  const closeBoard = () => { }

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

            <ListItem disablePadding>
              <ListItemButton>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                  <Link key={i} to={`/b/${workspace._id}/${board._id}/${board.name}`}>
                    <ListItemText primary={board.name} />
                  </Link>
                  <MoreHorizIcon onClick={handleClick} />

                </div>

              </ListItemButton>
              <Popover
                id={id}
                open={openn}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <Typography onClick={closeBoard} sx={{ p: 2, width: '200px', textAlign: 'center', cursor: 'pointer' }}>Close board</Typography>
              </Popover>
            </ListItem>
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
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <Board />
            <Outlet />
          </div>
        </div>
      </Main>
    </Box>
  );
}
