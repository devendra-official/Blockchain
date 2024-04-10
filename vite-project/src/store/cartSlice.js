import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    addItem: (state, action) => {

      const { id } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        // existingItem.quantity++;
      } else {
        state.items.push(action.payload);
      }
    },

    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },

    adjustQuantity: (state, action) => {
      const { id, increment } = action.payload;
      const item = state.items.find(item => item.id === id);
      item.quantity = Number(item.quantity);

      if (item) {
        item.quantity += increment ? 1 : -1;
        if (item.quantity === 0) {
          state.items = state.items.filter((item) => item.id !== id);
        }
      }
    },

  },
});

export const { addItem, removeItem, adjustQuantity } = cartSlice.actions;

export default cartSlice.reducer;