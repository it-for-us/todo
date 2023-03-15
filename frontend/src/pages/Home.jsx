import React, { useEffect } from "react";
import MainLayout from "../components/layout/MainLayout";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getBoards } from "../modules/workspace/core/workspace.slice";
import { useSelector } from "react-redux";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import CreateWorkspace from "../modules/workspace/components/CreateWorkspace";

export default function Home() {
  const { name } = useParams();
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.workspace.boards);
  const { workspaces } = useSelector((state) => state.workspace);

  const workspace = workspaces.find((workspace) => workspace.name === name);

  const workspaceId = workspace._id;

  useEffect(() => {
    if (workspaceId) {
      dispatch(
        getBoards({
          workspaceId,
        })
      );
    }
  }, [dispatch, workspaceId]);

  return (
    <MainLayout>
      <div className="board-container">
        <div className="board-header ">
          <h3 style={{ fontSize: "2rem" }}>{name}</h3>
        </div>
        <hr />
        <div className="board-body">
          <div className="body-header d-flex gap-3">
            <Person2OutlinedIcon />
            <h5>Your boards</h5>
          </div>
          <div className="boards-container">
            {boards &&
              boards.map((board, i) => (
                // <Link to={`/workspace/${workspace._id}`}>
                <div
                  key={board._id}
                  style={{ background: i % 2 === 0 ? "#6c9cd3" : "#0747a6" }}
                  className="boards"
                >
                  {board.name}
                  {/* <span>{moment(board.createdAt).fromNow()} </span> */}
                </div>
                // </Link>
              ))}
            <div className="create-new-board">
              <CreateWorkspace />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
