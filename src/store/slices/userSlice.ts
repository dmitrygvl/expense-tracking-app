import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUser {
  uid: string;
  name: string;
}
const initialState: Partial<IUser> = {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<IUser>) => {
      state = action.payload;
      return state;
    },

    deleteUser: (state) => {
      state = {};
      return state;
    },
  },
});

export const { addUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
