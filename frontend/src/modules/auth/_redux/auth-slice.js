import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    token: null,
    user: null,
    isLoading: false,
    error: null,
    status: 'idle', // "idle" | "loading" | "succeeded" | "failed"
  },
  reducers: {
    clearStore: (state, action) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      state.isLoading = false;
      state.error = null;
      state.status = 'idle';
    },
    // Login actions
    login: (state, action) => {
      // auth/login
      state.status = 'loading';
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.status = 'succeeded';
      state.isLoading = false;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user || null;
    },
    loginFailed: (state, action) => {
      state.status = 'failed';
      state.isLoading = false;
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      state.error = action.payload.error || 'Login failed';
    },

    // Logout actions
    logout: (state) => {
      state.status = 'loading';
      state.isLoading = true;
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      state.isLoading = false;
      state.error = null;
      state.status = 'idle';
    },
    logoutFailed: (state, action) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      state.isLoading = false;
      state.error = action.payload.error || 'Logout failed';
      state.status = 'idle';
    },

    // Register actions
    register: (state, action) => {
      state.status = 'register/loading';
      state.isLoading = true;
    },
    registerSuccess: (state, action) => {
      state.status = 'register/succeeded';
      state.isLoading = false;
      state.error = null;
    },
    registerFailed: (state, action) => {
      state.status = 'register/failed';
      state.isLoading = false;
      state.error = action.payload.error || 'Register failed';
    },
    registerReset: (state) => {
      state.status = 'idle';
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const { login, loginFailed, loginSuccess } = authSlice.actions;
export const { logout, logoutFailed, logoutSuccess } = authSlice.actions;
export const { register, registerSuccess, registerFailed, registerReset } = authSlice.actions;

export default authSlice.reducer;
