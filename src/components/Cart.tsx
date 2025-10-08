"use client";
import React, { memo, useMemo, useCallback } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { removeFromCart, updateQuantity } from "@/redux/cartSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const total = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  const handleRemove = useCallback(
    (id:number) => {
      dispatch(removeFromCart(id));
    },
    [dispatch]
  );

  const handleQuantityChange = useCallback(
    (id:number, quantity: number) => {
      dispatch(updateQuantity({ id, quantity }));
    },
    [dispatch]
  );

  return (
    <div className="container mx-auto p-6">
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-center">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="py-3 px-4 border-b">Product</th>
              <th className="py-3 px-4 border-b">Price</th>
              <th className="py-3 px-4 border-b">Quantity</th>
              <th className="py-3 px-4 border-b">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="py-4 px-4 flex items-center justify-center gap-3">
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={18} />
                  </button>
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={70}
                    height={70}
                    className="rounded"
                  />
                  <span className="font-medium">{item.name}</span>
                </td>
                <td className="py-4 px-4 text-gray-700">${item.price}</td>
                <td className="py-4 px-4">
                  <select
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id , Number(e.target.value))
                    }
                    className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num.toString().padStart(2, "0")}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="py-4 px-4 font-semibold">
                  ${item.price * item.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mt-8 gap-4">
        <button className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition">
          Apply Coupon
        </button>
        <div className="flex flex-col items-end">
          <div className="text-lg font-semibold mb-3">
            Total: <span className="text-red-600">${total}</span>
          </div>
          <button className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(CartPage);
