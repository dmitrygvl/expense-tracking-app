import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const now = new Date().getTime();

export interface IRange {
  startDate: number;
  endDate: number;
}

const initialState: IRange = {
  startDate: now,
  endDate: now,
};

const rangeSlice = createSlice({
  name: 'range',
  initialState,
  reducers: {
    updateRange: (state, action: PayloadAction<IRange>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { updateRange } = rangeSlice.actions;

export default rangeSlice.reducer;
