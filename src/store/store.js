import { configureStore } from "@reduxjs/toolkit";
import modal from "./modal";
import counter from './counter';
import todo from "./todo";

export const store = configureStore({
  reducer: {
    counter: counter,
    modal: modal,
    todo: todo,
  },
});
