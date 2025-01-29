import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  value: [],
};

let todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    add: (state, action) => {
      state.value.push(action.payload);
    },
    remove: (state, action) => {
      state.value = state.value.filter((value) => {
        return value.id != action.payload;
      });
    },
    changeStatus: (state, action) => {
      state.value = state.value.map((value) => {
        if (value.id == action.payload) {
          return { ...value, completed: !value.completed };
        }
        return value;
      });
    },
  },
});

export default todoSlice.reducer;
export let { add, remove, changeStatus } = todoSlice.actions;
