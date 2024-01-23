import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IConvertCategory } from '../../utils/convertCategories';

const initialState: IConvertCategory[] = [];

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategories: (state, action: PayloadAction<IConvertCategory[]>) => {
      state = action.payload;
      return state;
    },

    addCategory: (state, action: PayloadAction<IConvertCategory>) => {
      state.push(action.payload);
      return state;
    },

    deleteCategory: (state, action: PayloadAction<string>) =>
      state.filter((item) => item.id !== action.payload),

    deleteCategories: (state) => {
      state = [];
      return state;
    },
  },
});

export const { addCategories, addCategory, deleteCategory, deleteCategories } =
  categoriesSlice.actions;

export default categoriesSlice.reducer;
