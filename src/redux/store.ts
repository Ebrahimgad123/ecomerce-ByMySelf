// redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "./wishlistSlice";
import cartSlice  from "./cartSlice";

export const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
      cart: cartSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
