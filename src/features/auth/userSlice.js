import { createSlice } from "@reduxjs/toolkit";
import { getUserFromLocal, removeUserFromLocal, setUserToLocal } from "../../app/local";




export const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    user: getUserFromLocal()
  },
  reducers: {

    addUser: (state, action) => {
      state.user = action.payload;
      setUserToLocal(action.payload);
    },
    removeUser: (state, action) => {
      state.user = null;
      removeUserFromLocal();
    }
  }
});

export const { addUser, removeUser } = userSlice.actions;