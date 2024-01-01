import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  userInfo: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
    },
    increaseQuantity: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload);
      if (item) {
        item.quantity++;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload);
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    deleteItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload
      );
    },
    resetCart: (state) => {
      state.products = [];
    },
    setuserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    UserSignOut: (state) => {
      state.userInfo = null;
    },
  },
});
export const {
  addToCart,
  deleteItem,
  resetCart,
  increaseQuantity,
  decreaseQuantity,
  setuserInfo,
  UserSignOut,
} = cartSlice.actions;
export default cartSlice.reducer;
