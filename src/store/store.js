import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter';
import modalReducer from './modal';
import todoReducer from './todo';
import cartReducer from './cartSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    modal: modalReducer,
    todo: todoReducer,
    cart: cartReducer, 
  },
});

export default store;
