import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategory } from '../../API/category/category';

const initialState: Record<string, ICategory> = {};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategories: (
      state,
      action: PayloadAction<Record<string, ICategory>>,
    ) => {
      state = { ...action.payload };
      return state;
    },

    addCategory: (state, action: PayloadAction<Record<string, ICategory>>) => {
      state = { ...state, ...action.payload };
      return state;
    },

    deleteCategory: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
      return state;
    },
  },
});

export const { addCategories, addCategory, deleteCategory } =
  categoriesSlice.actions;

export default categoriesSlice.reducer;
