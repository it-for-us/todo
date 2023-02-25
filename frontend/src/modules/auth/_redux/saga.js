import axios from 'axios';
import {authAxios} from '../../../app/setup-axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import {
  loginFailed,
  loginSuccess,
  login,
  logoutSuccess,
  logoutFailed,
  logout,
  registerSuccess,
  registerFailed,
  register,
} from './auth-slice';

function* workLogin(action) {
  try {
    const { email, password } = action.payload;
    const resLogin = yield call(() =>
      axios.post('/signin', {
        email,
        password,
      })
    );
    const { token, user } = resLogin.data;
    if (!token) {
      throw new Error('token not found');
    }
    yield put(loginSuccess({ token, user }));
  } catch (error) {
    if (error.response) {
      yield put(loginFailed({ error: error.response.data }));
    } else {
      yield put(loginFailed({ error: error.message || 'login failed' }));
    }
  }
}

function* workRegister(action) {
  try {
    const { email, password, username, role } = action.payload;
    yield call(() =>
      axios.post('/signup', {
        email,
        password,
        username,
        role,
      })
    );
    yield put(registerSuccess());
  } catch (error) {
    if (error.response) {
      yield put(registerFailed({ error: error.response.data }));
    } else {
      yield put(registerFailed({ error: error.message || 'Register failed' }));
    }
  }
}

function* workLogout(action) {
  try {
    // const { token } = action.payload;
    // const token = yield select((state) => state.auth.token);
    yield call(() => authAxios().put('/users/logout'));
    yield put(logoutSuccess());
  } catch (error) {
    if (error.response) {
      yield put(logoutFailed({ error: error.response.data }));
    } else {
      yield put(logoutFailed({ error: error.message || 'logout failed' }));
    }
  }
}

export function* authSaga() {
  yield takeEvery(login.type, workLogin);
  yield takeEvery(logout.type, workLogout);
  yield takeEvery(register.type, workRegister);
}
