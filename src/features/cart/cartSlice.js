import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter(
        ({ pizzaId }) => pizzaId !== action.payload,
      );
    },
    increaseItemQuanity(state, action) {
      const item = state.cart.find(({ pizzaId }) => pizzaId === action.payload);
      item.quantity += 1;
      item.totalPrice = item.totalPrice + item.unitPrice;
    },
    decreaseItemQuanity(state, action) {
      const item = state.cart.find(({ pizzaId }) => pizzaId === action.payload);
      item.quantity -= 1;
      item.totalPrice = item.totalPrice - item.unitPrice;

      if (item.quantity === 0) {
        cartSlice.caseReducers.deleteItem(state, action);
      }
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuanity,
  decreaseItemQuanity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (state) => state.cart.cart;

export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((acc, item) => acc + item.quantity, 0);

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((acc, item) => acc + item.totalPrice, 0);

export const getCurrentQuantityById = (pizzaId) => {
  return (state) =>
    state.cart.cart.find((item) => item.pizzaId === pizzaId)?.quantity ?? 0;
};
