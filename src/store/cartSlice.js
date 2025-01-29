import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.products.find(item => item.id === newItem.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.products.push(newItem);
      }
    },
    removeItem: (state, action) => {
      const id = action.payload;
      state.products = state.products.filter(item => item.id !== id);
    },
    incrementQuantity: (state, action) => {
      const id = action.payload;
      const item = state.products.find(item => item.id === id);
      if (item) item.quantity += 1;
    },
    decrementQuantity: (state, action) => {
      const id = action.payload;
      const item = state.products.find(item => item.id === id);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.products = state.products.filter(product => product.id !== id);
        }
      }
    },
  },
});

export const { addItem, removeItem, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;
