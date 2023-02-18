import React from "react";
import MainLayout from "../components/layout/MainLayout";
import MainLayoutNavCreateBtn from "../components/navbar/MainLayoutNavCreateBtn";
import { useSelector } from "react-redux";

export default function Main() {
  const { workspaces } = useSelector((state) => state.workspaceReducer);
  //

  console.log(workspaces);
  return (
    <MainLayout>
      <h3>Your workspaces</h3>
      <div className="boards-container">
        {workspaces &&
          workspaces.map((workspace, i) => (
            <div
              key={i}
              style={{ background: i % 2 === 0 ? "#6c9cd3" : "#0747a6" }}
              className="boards"
            >
              {workspace.name}
            </div>
          ))}
        <div className="create-new-board">
          <MainLayoutNavCreateBtn />
        </div>
      </div>
    </MainLayout>
  );
}
