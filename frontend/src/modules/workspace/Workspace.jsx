import React, { useEffect } from 'react';
import MainLayoutNav from '../../components/navbar/MainLayoutNav';
import { styled, useTheme } from '@mui/material/styles';
import { ListItemText, ListItemIcon, ListItemButton, ListItem, IconButton, Divider, List, CssBaseline, Drawer, Box } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import { Accordion, Dropdown, ButtonGroup, Button } from 'react-bootstrap';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getBoards } from './core/workspace.slice';
import { useSelector } from 'react-redux';
import Board from './components/Board';
import { deleteBoard } from './core/workspace.slice';


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

  const { workspaceId } = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.workspace.boards);
  const workspace = useSelector((state) => state.workspace);

  useEffect(() => {
    if (workspaceId) {
      dispatch(getBoards({ workspaceId, })
      );
    }
  }, [dispatch, workspaceId]);


  const closeBoard = (boardId) => {
    dispatch(deleteBoard(boardId))
    //sayfa yenilenince güncelleme yapiliyor ,saga da islem yapilmali
    navigate(0)
  }

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

            <Accordion className='w-100 ' defaultActiveKey={['0']} alwaysOpen>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Workspaces</Accordion.Header>
                <Accordion.Body>
                  {boards?.length > 0 &&
                    boards.map((board, i) => (
                      <Dropdown className='w-100 p-1' key={i} as={ButtonGroup}>
                        <Button onClick={() => navigate(`/b/${workspace._id}/${board._id}/${board.name}`)} variant="secondary">{board.name}</Button>
                        <Dropdown.Toggle split variant="secondary" id="dropdown-split-basic" />
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => closeBoard(board._id)}>Close board</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    ))}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

          </ListItem>

        </List>

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
