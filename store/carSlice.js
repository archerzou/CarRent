import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  carRent: [],
};
export const carSlice = createSlice({
  name: 'car',
  initialState,
  reducers: {
    addToRent(state, action) {
      state.carRent.push(action.payload);
    },
    updateRent(state, action) {
      state.carRent = action.payload;
    },
    emptyRent(state, action) {
      state.carRent = [];
    },
  },
});

export const { addToRent, updateRent, emptyRent } = carSlice.actions;

export default carSlice.reducer;
