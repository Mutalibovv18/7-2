import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  value: 0,
};

let counter = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});
export default counter.reducer;
export let { increment, decrement, reset } = counter.actions;
