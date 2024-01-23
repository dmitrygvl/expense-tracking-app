import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import categoriesReducer from './slices/categoriesSlice';
import costsReducer from './slices/costsSlice';
import rangeReducer from './slices/rangeSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    categories: categoriesReducer,
    costs: costsReducer,
    range: rangeReducer,
  },
});

export type IRootState = ReturnType<typeof store.getState>;
export type IAppDispatch = typeof store.dispatch;

export default store;
