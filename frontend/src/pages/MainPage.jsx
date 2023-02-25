import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import CreateWorkspace from '../modules/workspace/components/CreateWorkspace';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';

export default function Main() {
  const { workspaces } = useSelector((state) => state.workspace);
  console.log(workspaces);
  return (
    <MainLayout>
      <h3>Your workspaces</h3>
      <div className="boards-container">
        {workspaces &&
          workspaces.map((workspace, i) => (
            <div
              key={workspace._id}
              style={{ background: i % 2 === 0 ? '#6c9cd3' : '#0747a6' }}
              className="boards"
            >
              <Link to={`/workspace/${workspace._id}`}>
                {workspace.name}
                <span>{moment(workspace.createdAt).fromNow()} </span>
              </Link>
            </div>
          ))}

        <div className="create-new-board">
          <CreateWorkspace />
        </div>
      </div>
    </MainLayout>
  );
}
