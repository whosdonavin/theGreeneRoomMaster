import { createSlice } from "@reduxjs/toolkit";

const init = {
  cart: [],
  itemStatus: {
    status: "",
    message: "",
  },
  subtotal: null,
  totalItems: null,
};
export const cartSlice = createSlice({
  name: "cart",
  initialState: { value: init },
  reducers: {
    addItem: (state, action) => {
      state.value.cart.push(action.payload);
      sessionStorage.setItem("cart", JSON.stringify(state.value.cart));
    },
    removeItem: (state, action) => {
      state.value.cart.splice(action.payload, 1);
      sessionStorage.setItem("cart", JSON.stringify(state.value.cart));
    },
    updateStatus: (state, action) => {
      state.value.itemStatus = action.payload;
    },
    calculateSubtotal: (state, action) => {
      let total = 0;

      state.value.cart.forEach((item) => {
        let price = item.itemPrice;
        let qty = item.qty;
        let itemTotal = price * qty;
        total += itemTotal;
      });

      state.value.subtotal = total.toFixed(2);
    },
    calculateTotalItems: (state, action) => {
      let total = 0;

      state.value.cart.forEach((item) => {
        let qty = item.qty;
        total += qty;
      });

      state.value.totalItems = total;
    },
  },
});

export const { addItem } = cartSlice.actions;
export const { removeItem } = cartSlice.actions;
export const { updateStatus } = cartSlice.actions;
export const { calculateSubtotal } = cartSlice.actions;
export const { calculateTotalItems } = cartSlice.actions;
export default cartSlice.reducer;
