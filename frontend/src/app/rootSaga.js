import { all } from "redux-saga/effects";

import { authSaga } from "../modules/auth/_redux/saga";
import { workspaceSaga } from "../modules/workspace/_redux/saga";

export function* rootSaga() {
  yield all([
    // Add your sagas here
    authSaga(),
    workspaceSaga(),
  ]);
}
