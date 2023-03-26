import { createSlice } from '@reduxjs/toolkit';

const workspaceSlice = createSlice({
  name: 'workspace',
  initialState: {
    workspaces: [],
    boards: [],
    isLoading: false,
    status: 'idle', // "idle" | "loading" | "succeeded" | "failed"
    error: null,
  },
  reducers: {
    // Create workspace
    createWorkspace: (state, action) => {
      state.status = 'created/loading';
      state.isLoading = true;
    },
    createdSuccess: (state, action) => {
      state.status = 'created/succeeded';
      state.isLoading = false;
      state.error = null;
    },
    createdFailed: (state, action) => {
      state.status = 'created/failed';
      state.isLoading = false;
      state.error = action.payload.error || 'Created failed';
    },

    // Get workspaces
    getWorkspaces: (state, action) => {
      state.status = 'get/loading';
      state.isLoading = true;
    },
    getWorkspacesSuccess: (state, action) => {
      state.status = 'get/succeeded';
      state.isLoading = false;
      state.error = null;
      state.workspaces = action.payload;
    },
    getWorkspacesFailed: (state, action) => {
      state.status = 'get/failed';
      state.isLoading = false;
      state.error = action.payload.error || 'Get workspaces failed';
    },
    // Delete Workspace
    deleteWorkspace: (state, action) => {
      const workspaceId = action.payload;
      state.workspaces = state.workspaces.filter((workspace => workspace.id !== workspaceId))

    },
    deleteWorkspaceSuccess: (state, action) => {
      state.status = 'delete/succeeded';
      state.isLoading = false;
      state.error = null;
    },
    deleteWorkspacesFailed: (state, action) => {
      state.status = 'delete/failed';
      state.isLoading = false;
      state.error = action.payload.error || 'Delete workspaces failed';
    },

    // Board actions
    createBoard: (state, action) => {
      state.status = 'createBoard/loading';
      state.isLoading = true;
    },
    createdBoardSuccess: (state, action) => {
      state.status = 'createBoard/succeeded';
      state.isLoading = false;
      state.error = null;
      state.boards = action.payload;
    },
    createdBoardFailed: (state, action) => {
      state.status = 'createBoard/failed';
      state.isLoading = false;
      state.error = action.payload.error || 'Created board failed';
    },

    // Get boards
    getBoards: (state, action) => {
      state.status = 'getBoards/loading';
      state.isLoading = true;
    },
    getBoardsSuccess: (state, action) => {
      state.status = 'getBoards/succeeded';
      state.isLoading = false;
      state.error = null;
      state.boards = action.payload;
    },
    getBoardsFailed: (state, action) => {
      state.status = 'getBoards/failed';
      state.isLoading = false;
      state.error = action.payload.error || 'Get boards failed';
    },
  },
});

export const {
  createWorkspace,
  createdSuccess,
  createdFailed,
  getWorkspaces,
  getWorkspacesSuccess,
  getWorkspacesFailed,
} = workspaceSlice.actions;

export const {
  deleteWorkspace,
  deleteWorkspaceSuccess,
  deleteWorkspacesFailed,
} = workspaceSlice.actions

export const {
  createBoard,
  createdBoardSuccess,
  createdBoardFailed,
  getBoards,
  getBoardsFailed,
  getBoardsSuccess,
} = workspaceSlice.actions;

export const selectWorkspace = (state) => state.workspace;

export const selectWorkspaceByName = (state, name) => {
  return state.workspace.workspaces.find((workspace) => workspace.name === name);
};

export default workspaceSlice.reducer;
