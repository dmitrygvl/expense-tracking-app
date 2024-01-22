import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISpending } from '../../API/spending/spending';

const initialState: ISpending[] = [];

const spendingsSlice = createSlice({
  name: 'spendings',
  initialState,
  reducers: {
    addSpendings: (state, action: PayloadAction<ISpending[]>) => {
      state = action.payload;
      return state;
    },

    addSpending: (state, action: PayloadAction<ISpending>) => {
      state.push(action.payload);
      return state;
    },

    deleteSpendingsOfDeletedCategory: (state, action: PayloadAction<string>) =>
      state.filter((item) => item.categoryId !== action.payload),

    deleteSpendings: (state) => {
      state = [];
      return state;
    },
  },
});

export const {
  addSpendings,
  addSpending,
  deleteSpendingsOfDeletedCategory,
  deleteSpendings,
} = spendingsSlice.actions;

export default spendingsSlice.reducer;
