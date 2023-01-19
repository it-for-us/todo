import React, { useState } from "react";
import MainLayoutNav from "../components/navbar/MainLayoutNav";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Home from "./Home";

export default function MainLayout() {
  const [toggle, setToggle] = useState(false);
  const isOpen = () => {
    setToggle(!toggle);
  };
  return (
    <div className="main-layout">
      <MainLayoutNav />
      <div
        className="sidebar"
        style={{ transform: toggle ? "translateX(0%)" : null }}
      >
        {toggle ? (
          <ArrowBackIosNewIcon
            onClick={isOpen}
            style={{
              color: "gray",
              position: "absolute",
              right: "6%",
              top: "3%",
              cursor: "pointer",
            }}
          />
        ) : (
          <ArrowForwardIosIcon
            onClick={isOpen}
            style={{
              color: "gray",
              position: "absolute",
              right: "-5%",
              top: "3%",
              cursor: "pointer",
              // display: toggle ? "none" : "block",
            }}
          />
        )}
        <h2>Workspaces</h2>

        <div className="side-bar-boards">
          <h5>
            <DashboardIcon />
            Boards
          </h5>
          <p style={{ color: "#7E34CF", cursor: "pointer" }}>boardName</p>
        </div>
        <h5>Settings</h5>
      </div>
      <main>
        <div className="content1">content1</div>
        <div className="content2">content2</div>
        <div className="content3">content3</div>
      </main>

      {/* <div className="workspaces">
        <div
          style={{ transform: toggle ? "translateX(0%)" : null }}
          // style={{ left: toggle ? "0" : null, right: toggle ? "0" : null }}
          className="side-bar"
        >
          {toggle ? (
            <ArrowBackIosNewIcon
              onClick={isOpen}
              style={{
                color: "gray",
                position: "absolute",
                right: "6%",
                top: "3%",
                cursor: "pointer",
              }}
            />
          ) : (
            <ArrowForwardIosIcon
              onClick={isOpen}
              style={{
                color: "gray",
                position: "absolute",
                right: "-5%",
                top: "3%",
                cursor: "pointer",
                // display: toggle ? "none" : "block",
              }}
            />
          )}

          <h2>Workspaces</h2>

          <div className="side-bar-boards">
            <h5>
              <DashboardIcon />
              Boards
            </h5>
            <p style={{ color: "#7E34CF", cursor: "pointer" }}>boardName</p>
          </div>
          <h5>Settings</h5>
        </div>
        <Home />
      </div> */}
    </div>
  );
}
