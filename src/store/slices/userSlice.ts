import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUser {
  uid: string | undefined;
  name: string | undefined;
}
const initialState: IUser = {
  uid: undefined,
  name: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<IUser>) => {
      state = action.payload;
      return state;
    },

    deleteUser: (state) => {
      state = {
        uid: undefined,
        name: undefined,
      };
      return state;
    },
  },
});

export const { addUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
