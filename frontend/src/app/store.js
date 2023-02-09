import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'reduxjs-toolkit-persist/lib/storage/session';
import { authApi } from './services/auth-api';

import { rootSaga } from './rootSaga';
import authReducer from '../modules/auth/_redux/auth-slice';

const persistAuthConfig = {
  key: 'dart-todo-app-auth',
  storage,
  whitelist: ['isAuthenticated', 'token', 'user'],
};

const persistAuthApiConfig = {
  key: 'dart-todo-app-auth-api',
  storage,
  whitelist: [],
};

const saga = createSagaMiddleware();

const store = configureStore({
  reducer: {
    auth: persistReducer(persistAuthConfig, authReducer),
    [authApi.reducerPath]: persistReducer(persistAuthApiConfig, authApi.reducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(saga)
      .concat(authApi.middleware),
  devTools: true,
  //   devTools: process.env.NODE_ENV !== 'production',
});

const persistor = persistStore(store);

export { store, persistor };

saga.run(rootSaga);
