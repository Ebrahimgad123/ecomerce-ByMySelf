"use client";
import { Provider, useDispatch } from "react-redux";
import { store } from "./store";
import { useEffect } from "react";
import { setWishlist } from "./wishlistSlice";
import { setCart } from "./cartSlice";

function InitLocalStorage() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    const storedCart = localStorage.getItem("cart");

    if (storedWishlist) {
      dispatch(setWishlist(JSON.parse(storedWishlist)));
    }
    if (storedCart) {
      dispatch(setCart(JSON.parse(storedCart)));
    }
  }, [dispatch]);

  // ✅ حفظ البيانات في localStorage عند أي تغيير
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      localStorage.setItem("wishlist", JSON.stringify(state.wishlist.items));
      localStorage.setItem("cart", JSON.stringify(state.cart.items));
    });
    return unsubscribe;
  }, []);

  return null;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <InitLocalStorage />
      {children}
    </Provider>
  );
}
