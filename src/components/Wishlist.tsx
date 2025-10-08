"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { removeFromWishlist } from "@/redux/wishlistSlice";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { addToCart } from "@/redux/cartSlice";
const WishlistPage = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state: RootState) => state.wishlist.items);

  const handleRemove = (id: number) => {
    dispatch(removeFromWishlist(id));
  };

  return (
    <div className="w-[90%] mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold mb-4">
          Wishlist ({wishlist.length})
        </h1>
        <button className="text-black py-2 px-4 rounded border border-[#000000] opacity-50">
          Move all to the Bag
        </button>
      </div>

      {wishlist.length === 0 ? (
        <p className="text-gray-500">There is no product in your wishlist</p>
      ) : (
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="group rounded-lg p-4 flex flex-col items-center text-center relative"
            >
              <button
                onClick={() => handleRemove(product.id)}
                className="absolute top-6 right-6 bg-white text-black rounded-full w-8 h-8 flex items-center justify-center transition hover:bg-gray-200"
              >
                <Trash2 />
              </button>

              <Image
                src={product.image}
                alt={product.name}
                width={800}
                height={800}
                className="object-cover mb-2 rounded-lg"
              />

              {/* الزرار اللي هيظهر عند hover */}
              <button
              onClick={()=>{
                dispatch(addToCart(product))
              }}
                className="w-[90%] absolute bottom-17 left-1/2 -translate-x-1/2 bg-black text-white px-2 py-2 rounded opacity-0 
                  group-hover:opacity-100 transition duration-300"
              >
                Add To Cart
              </button>

              <h2 className="font-semibold">{product.name}</h2>

              <div className="flex gap-2">
                <p className="text-red-400">{product.price}</p>
                <p className="text-gray-500 line-through">
                  {product.discount
                    ? product.price + (product.price * product.discount) / 100
                    : ""}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
