import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = false;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state) => {
      state = true;
      return state;
    },

    logOut: (state) => {
      state = false;
      return state;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;
