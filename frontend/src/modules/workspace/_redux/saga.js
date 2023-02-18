import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";

import {
  createWorkspace,
  createdSuccess,
  createdFailed,
} from "./workspace-slice";

function* workWorkspace(action) {
  try {
    const { name, description, createdAt } = action.payload;
    yield call(() =>
      axios.post("/workspaces", {
        name,
        description,
        createdAt,
      })
    );
    yield put(createdSuccess());
  } catch (error) {
    if (error.response) {
      yield put(createdFailed({ error: error.response.data }));
    } else {
      yield put(createdFailed({ error: error.message || "Created failed" }));
    }
  }
}

export function* workspaceSaga() {
  yield takeEvery(createWorkspace.type, workWorkspace);
}
