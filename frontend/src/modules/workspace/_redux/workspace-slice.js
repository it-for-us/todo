import { createSlice } from "@reduxjs/toolkit";

const workspaceSlice = createSlice({
  name: "workspace",
  initialState: {
    // id: "string",
    // name: "string",
    // description: "string",
    // createdAt: "2023-02-18T14:30:21.719Z",
    // userIds: ["string"],
    // additionalProp1: {},
    workspaces: [],
    isLoading: false,
    status: "idle", // "idle" | "loading" | "succeeded" | "failed"
    error: null,
  },
  reducers: {
    createWorkspace: (state, action) => {
      state.workspaces = [action.payload, ...state.workspaces];
      state.status = "created/loading";
      state.isLoading = true;
      //   state.id = action.payload.id;
      //   state.name = action.payload.name;
      //   state.description = action.payload.description;
      //   state.createdAt = action.payload.createdAt;
      //   state.userIds = action.payload.userIds;
    },

    createdSuccess: (state, action) => {
      state.status = "created/succeeded";
      state.isLoading = false;
      state.error = null;
    },
    createdFailed: (state, action) => {
      state.status = "created/failed";
      state.isLoading = false;
      state.error = action.payload.error || "Created failed";
    },
  },
});

export const { createWorkspace, createdSuccess, createdFailed } =
  workspaceSlice.actions;
export default workspaceSlice.reducer;
