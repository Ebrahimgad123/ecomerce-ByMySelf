"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  discount?: number;
}

interface WishlistState {
  items: Product[];
}

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },
    addToWishlist: (state, action: PayloadAction<Product>) => {
      const exists = state.items.some((p) => p.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((p) => p.id !== action.payload);
    },
    clearWishlist: (state) => {
      state.items = [];
    },
  },
});

export const { setWishlist, addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
