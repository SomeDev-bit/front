import { createSlice } from "@reduxjs/toolkit";
import { getCartsFromLocal, removeCartsFromLocal, setCartsToLocal } from "../../app/local";





export const cartSlice = createSlice({
  name: 'cartSlice',
  initialState: {
    carts: getCartsFromLocal()
  },
  reducers: {
    setCart: (state, action) => {
      const isExist = state.carts.find((cart) => cart.id === action.payload.id);

      if (isExist) {
        state.carts = state.carts.map((cart) => cart.id === action.payload.id ? action.payload : cart);
        setCartsToLocal(state.carts);
      } else {
        state.carts = [...state.carts, action.payload];
        setCartsToLocal(state.carts);
      }



    },
    singleRemoveCart: (state, action) => {
      state.carts.splice(action.payload, 1);
      setCartsToLocal(state.carts);
    },
    removeCarts: (state, action) => {
      state.carts = [];
      removeCartsFromLocal();
    },
  }
});


export const { setCart, removeCarts, singleRemoveCart } = cartSlice.actions;