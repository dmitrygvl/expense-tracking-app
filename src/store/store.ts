import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import categoriesReducer from './slices/categoriesSlice';
import costReducer from './slices/costsSlice';

const store = configureStore({
  reducer: {
    // auth: authReducer,
    user: userReducer,
    categories: categoriesReducer,
    costs: costReducer,
  },
});

export type IRootState = ReturnType<typeof store.getState>;
export type IAppDispatch = typeof store.dispatch;

export default store;
