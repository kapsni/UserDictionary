// src/redux/usersSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  selectedUser: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    selectUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
});

export const { setUsers, selectUser } = usersSlice.actions;

export const selectAllUsers = (state) => state.users.users;
export const selectSelectedUser = (state) => state.users.selectedUser;

export default usersSlice.reducer;
