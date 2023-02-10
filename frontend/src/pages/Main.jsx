import React from "react";
import MainLayout from "../components/layout/MainLayout";
import MainLayoutNavCreateBtn from "../components/navbar/MainLayoutNavCreateBtn";

export default function Main() {
  return (
    <MainLayout>
      <h3>Your workspaces</h3>
      <div className="boards-container">
        <div className="boards">Dart</div>
        <div className="create-new-board">
          <MainLayoutNavCreateBtn />
        </div>
      </div>

      {/* <div className="main-layout">
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

        <div className="workspaces">
          <h3>Your workspaces</h3>
          <div className="boards-container">
            <div className="boards">Dart</div>
            <div className="create-new-board">
              <MainLayoutNavCreateBtn />
            </div>
          </div>
        </div>
      </div> */}
    </MainLayout>
  );
}
