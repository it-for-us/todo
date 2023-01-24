import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'reduxjs-toolkit-persist/lib/storage/session';

import { rootSaga } from './rootSaga';
import authReducer from '../modules/auth/_redux/auth-slice';

const persistAuthConfig = {
  key: 'dart-todo-app-auth',
  storage,
  whitelist: ['isAuthenticated', 'token', 'user'],
};

const saga = createSagaMiddleware();

const store = configureStore({
  reducer: {
    auth: persistReducer(persistAuthConfig, authReducer),
  },
  middleware: [saga],
  devTools: true,
//   devTools: process.env.NODE_ENV !== 'production',
});

const persistor = persistStore(store);

export { store, persistor };

saga.run(rootSaga);
