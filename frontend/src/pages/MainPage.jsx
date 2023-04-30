import React, { useEffect } from 'react';
import MainLayout from '../layout/MainLayout';
import CreateWorkspace from '../modules/workspace/components/CreateWorkspace';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { getWorkspaces } from '../modules/workspace/core/workspace.slice';



export default function Main() {

  const workspaces = useSelector((state) => state.workspace.workspaces);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getWorkspaces())
  }, [dispatch])


  return (
    <MainLayout>
      <h3>Your workspaces</h3>

      {workspaces.length > 0 ? <div className="workspace-container">
        {workspaces && workspaces.map((workspace, i) =>

          <div key={i} className="workspaces" >
            <h3>{workspace.name}</h3>

            <div className="boards-container">
              {workspace.boards.map((board, i) =>
                <Link to={`/b/${workspace._id}/${board._id}/${board.name}`}>
                  <div
                    key={board._id}
                    style={{ background: i % 2 === 0 ? '#6c9cd3' : '#0747a6' }}
                    className="boards"
                  >
                    <div className="board-headline">
                      <h5>{board.name}</h5>
                      <span>{moment(board.createdAt).fromNow()} </span>
                    </div>

                  </div>
                </Link>
              )}
              <div className="create-new-board">
                <CreateWorkspace />
              </div>
            </div>
          </div>
        )}
      </div> : <p style={{ fontStyle: 'italic', color: 'gray', fontWeight: 'bold' }}>Please click the create button above to create a workspace.</p>}
    </MainLayout>
  );
}
