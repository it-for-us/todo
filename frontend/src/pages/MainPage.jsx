import React from "react";
import MainLayout from "../components/layout/MainLayout";
import CreateWorkspace from "../modules/workspace/components/CreateWorkspace";
import { useSelector } from "react-redux";
import moment from "moment";

export default function Main() {
  const { workspaces } = useSelector((state) => state.workspaceReducer);

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
              <span>{moment(workspace.createdAt).fromNow()} </span>
            </div>
          ))}

        <div className="create-new-board">
          <CreateWorkspace />
        </div>
      </div>
    </MainLayout>
  );
}
