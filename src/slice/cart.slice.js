import { createSlice } from "@reduxjs/toolkit";
import { getItem, setItem, removeItem } from "../helpers/persistence-storage";

const initialState = {
  items: [],
  userId: null,
  // totalQuantity: 0,
  // totalAmount: 0,
  // tax: 0,
  // shippingFee: 0,
  // grandTotal: 0,
  // isLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setUserId(state, action) {
      const newUserId = action.payload;
      state.userId = newUserId;

      //  Guest cartni olib kelamiz
      const guestCart = getItem("cart_guest") || [];

      //  User cartni olib kelamiz
      const userCart = getItem(`cart_${newUserId}`) || [];

      //  Merge qilamiz
      const mergedCart = [...userCart];
      guestCart.forEach((guestItem) => {
        const existing = mergedCart.find((i) => i._id === guestItem._id);
        if (existing) {
          existing.quantity += guestItem.quantity;
        } else {
          mergedCart.push(guestItem);
        }
      });

      //  User cart sifatida saqlaymiz
      state.items = mergedCart;
      setItem(`cart_${newUserId}`, mergedCart);

      //  Guest cartni tozalaymiz
      removeItem("cart_guest");
    },

    addToCart(state, action) {
      const product = action.payload;
      const existing = state.items.find((item) => item._id === product._id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }

      const storageKey = state.userId ? `cart_${state.userId}` : "cart_guest";
      setItem(storageKey, state.items);
    },

    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item._id !== action.payload);
      const storageKey = state.userId ? `cart_${state.userId}` : "cart_guest";
      setItem(storageKey, state.items);
    },

    clearCart(state) {
      state.items = [];
      const storageKey = state.userId ? `cart_${state.userId}` : "cart_guest";
      removeItem(storageKey);
    },

    resetCartState: (state) => {
      state.items = [];
      state.error = null;
    },
    

    increaseQuantity(state, action) {
      const item = state.items.find((i) => i._id === action.payload);
      if (item) {
        item.quantity += 1;
        const storageKey = state.userId ? `cart_${state.userId}` : "cart_guest";
        setItem(storageKey, state.items);
      }
    },

    decreaseQuantity(state, action) {
      const item = state.items.find((i) => i._id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        const storageKey = state.userId ? `cart_${state.userId}` : "cart_guest";
        setItem(storageKey, state.items);
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  resetCartState,
  increaseQuantity,
  decreaseQuantity,
  setUserId,
} = cartSlice.actions;

export default cartSlice.reducer;
