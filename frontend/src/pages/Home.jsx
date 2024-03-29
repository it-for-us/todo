import React, { useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getBoards, selectWorkspaceByName } from "../modules/workspace/core/workspace.slice";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import moment from 'moment';
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import CreateWorkspace from "../modules/workspace/components/CreateWorkspace";


export default function Home() {

  const { name } = useParams();
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.workspace.boards);

  const { _id: workspaceId } = useSelector((state) => selectWorkspaceByName(state, name));


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
            <div className="create-new-board">
              <CreateWorkspace />
            </div>
            {boards &&
              boards.map((board, i) => (
                <Link to={`/b/${workspaceId}/${board._id}/${board.name}`}>
                  <div
                    key={board._id}
                    style={{ background: i % 2 === 0 ? "#6c9cd3" : "#0747a6" }}
                    className="boards"
                  >
                    {board.name}
                    <span>{moment(board.createdAt).fromNow()} </span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
