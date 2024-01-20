import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUser {
  uid: string;
  name: string;
}

const initialState: Partial<IUser> = {};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<IUser>) => {
      state = action.payload;
      return state;
    },

    logOut: (state) => {
      state = {};
      return state;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;
