import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICost } from '../../API/cost/cost';

const initialState: ICost[] = [];

const costsSlice = createSlice({
  name: 'costs',
  initialState,
  reducers: {
    addCosts: (state, action: PayloadAction<ICost[]>) => {
      state = action.payload;
      return state;
    },

    addCost: (state, action: PayloadAction<ICost>) => {
      state.push(action.payload);
      return state;
    },

    deleteCostsOfDeletedCategory: (state, action: PayloadAction<string>) =>
      state.filter((item) => item.categoryId !== action.payload),

    deleteCosts: (state) => {
      state = [];
      return state;
    },
  },
});

export const { addCosts, addCost, deleteCostsOfDeletedCategory, deleteCosts } =
  costsSlice.actions;

export default costsSlice.reducer;
