import axios from 'axios';
import { call, put, takeEvery, select, fork } from 'redux-saga/effects';
import { LOCAL_EXPRESS_API_URL } from '../../../lib/constants';

import {
  createWorkspace,
  createdSuccess,
  createdFailed,
  getWorkspacesSuccess,
  getWorkspacesFailed,
  createdBoardSuccess,
  createBoard,
  createdBoardFailed,
  getBoards,
  getBoardsSuccess,
  getBoardsFailed,
  getWorkspaces,
  deleteWorkspace,
  deleteWorkspaceSuccess,
  deleteWorkspacesFailed,
  deleteBoardSuccess,
  deleteWBoardFailed,
  deleteBoard
} from './workspace.slice';

function* workCreateWorkspace(action) {
  try {
    const userId = yield select((state) => state.auth.user.id);
    const token = yield select((state) => state.auth.token);
    const { name, description } = action.payload;
    yield call(() =>
      axios.post(
        LOCAL_EXPRESS_API_URL + '/workspaces',
        {
          name,
          description: description || '',
          owner: userId,
          boards: [],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    );
    yield put(createdSuccess());
    yield fork(workGetWorkspaces);
  } catch (error) {
    if (error.response) {
      yield put(createdFailed({ error: error.response.data }));
    } else {
      yield put(createdFailed({ error: error.message || 'Created failed' }));
    }
  }
}

function* workGetWorkspaces() {
  try {
    const token = yield select((state) => state.auth.token);
    const response = yield call(() =>
      axios.get(LOCAL_EXPRESS_API_URL + '/workspaces', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
    yield put(getWorkspacesSuccess(response.data));
  } catch (error) {
    if (error.response) {
      yield put(getWorkspacesFailed({ error: error.response.data }));
    } else {
      yield put(getWorkspacesFailed({ error: error.message || 'Get workspaces failed' }));
    }
  }
}

function* workCreateBoard(action) {
  try {
    const token = yield select((state) => state.auth.token);
    const { name, description, workspaceId } = action.payload;
    const newBoard = {
      name,
      workspaceId,
      description: description || '',
      lists: [],
    };
    yield call(() =>
      axios.post(LOCAL_EXPRESS_API_URL + '/boards', newBoard, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
    yield put(createdBoardSuccess());
    yield fork(workGetBoards, { payload: { workspaceId } });

  } catch (error) {
    if (error.response) {
      yield put(createdBoardFailed({ error: error.response.data }));
    } else {
      yield put(createdBoardFailed({ error: error.message || 'Created board failed' }));
    }
  }
}

function* workGetBoards(action) {
  try {
    const token = yield select((state) => state.auth.token);
    const { workspaceId } = action.payload;
    const url = new URL(LOCAL_EXPRESS_API_URL + '/boards');
    url.searchParams.append('workspaceId', workspaceId);
    // url.searchParams.append('fields', 'name,id');
    const response = yield call(() =>
      axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
    yield put(getBoardsSuccess(response.data));
    yield fork(workGetWorkspaces);
  } catch (error) {
    if (error.response) {
      yield put(getBoardsFailed({ error: error.response.data }));
    } else {
      yield put(getBoardsFailed({ error: error.message || 'Get boards failed' }));
    }
  }
}

function* workDeleteWorkspace(action) {
  try {
    const workspaceId = action.payload;
    const token = yield select((state) => state.auth.token);
    yield call(() =>
      axios.delete(LOCAL_EXPRESS_API_URL + `/workspaces/${workspaceId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    )
    yield put(deleteWorkspaceSuccess())
    yield fork(workGetWorkspaces)

  } catch (error) {
    if (error.response) {
      yield put(deleteWorkspacesFailed({ error: error.response.data }));
    } else {
      yield put(deleteWorkspacesFailed({ error: error.message || 'Delete workspace failed' }));
    }
  }
}

function* workDeleteBoard(action) {
  try {
    const boardId = action.payload
    const token = yield select((state) => state.auth.token);
    console.log(boardId);
    yield call(() =>
      axios.delete(LOCAL_EXPRESS_API_URL + `/boards/${boardId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    )
    yield put(deleteBoardSuccess())
    // yield fork(workGetBoards, { payload: { boardId } });
    // yield fork(workGetBoards)
    yield fork(workGetWorkspaces)
  } catch (error) {
    if (error.response) {
      yield put(deleteWBoardFailed({ error: error.response.data }));
    } else {
      yield put(deleteWBoardFailed({ error: error.message || 'Delete workspace failed' }));
    }
  }
}

export function* workspaceSaga() {
  yield takeEvery(createWorkspace.type, workCreateWorkspace);
  yield takeEvery(getWorkspaces.type, workGetWorkspaces);
  yield takeEvery(createBoard.type, workCreateBoard);
  yield takeEvery(getBoards.type, workGetBoards);
  yield takeEvery(deleteWorkspace.type, workDeleteWorkspace)
  yield takeEvery(deleteBoard.type, workDeleteBoard)
}
