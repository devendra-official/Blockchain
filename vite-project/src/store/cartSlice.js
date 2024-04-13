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

    removeAllItem: (state, action) => {
      state.items = [];
    },

    adjustQuantity: (state, action) => {
      const { id, increment } = action.payload;
      const item = state.items.find(item => item.id === id);
      item.quantity = Number(item.quantity);

      if (item) {
        if (item.quantity == 1 && increment) {
          item.quantity += 1;
        } else if (item.quantity != 1) {
          item.quantity += increment ? +1 : -1;
        }
      }
    },

  },
});

export const { addItem, removeItem, removeAllItem, adjustQuantity } = cartSlice.actions;

export default cartSlice.reducer;