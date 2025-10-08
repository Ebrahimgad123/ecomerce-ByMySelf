"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Heart, Eye } from "lucide-react";
import Image from "next/image";
import TopComps from "./TopCompos";
import products  from "../data/data";  
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addToWishlist, removeFromWishlist } from "@/redux/wishlistSlice";
import { FaHeart } from "react-icons/fa";
import { addToCart } from "@/redux/cartSlice";

export default function TodayComponent() {
  const swiperRef = useRef<SwiperType | null>(null);
  const dispatch = useDispatch();
  const wishlist = useSelector((state: RootState) => state.wishlist.items);
  const cart = useSelector((state: RootState) => state.cart.items);

  return (
    <div>
      <TopComps
        swiperRef={swiperRef}
        topTitle="Today's"
        topSubTitle="Flash Sales"
        timer
      />

      <div className="px-8 py-10 w-[90%] mx-auto">
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          spaceBetween={20}
          pagination={{ clickable: true }}
          className="mySwiper"
          breakpoints={{
            0: { slidesPerView: 1 }, // mobile
            640: { slidesPerView: 2 }, // tablet
            1024: { slidesPerView: 3 }, // desktop
            1280: { slidesPerView: 4 }, // large desktop
          }}
        >
          {products.map((product) => {
            const isInWishlist = wishlist.some((p) => p.id === product.id);
            const isInCart = cart.some((p) => p.id === product.id);

            return (
              <SwiperSlide key={product.id}>
                <div className="relative bg-white rounded-2xl transition group">
                  {/* الخصم */}
                  <span className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-sm">
                    -{product.discount}%
                  </span>

                  {/* أيقونات */}
                  <div className="absolute top-2 right-2 flex flex-col gap-2">
                    <button
                      onClick={() =>
                        isInWishlist
                          ? dispatch(removeFromWishlist(product.id))
                          : dispatch(addToWishlist(product))
                      }
                      className={`p-2 rounded-full shadow`}
                    >
                      {isInWishlist ? (
                        <FaHeart className="text-red-600" size={18} />
                      ) : (
                        <Heart size={18} />
                      )}
                    </button>
                    <button className="p-2 bg-white rounded-full shadow hover:bg-gray-100">
                      <Eye size={18} />
                    </button>
                  </div>

                  {/* صورة المنتج */}
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={400}
                    className="w-full h-full object-contain mb-3"
                  />

                  {/* زرار Add To Cart */}
                  <button
                    onClick={() => 
                      isInCart
                        ? null
                        : dispatch(addToCart({ ...product, quantity: 1 }))
                    }
                    className="w-full absolute bottom-20 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded opacity-0 
                    group-hover:opacity-100 transition duration-300"
                  >
                    Add To Cart
                  </button>

                  {/* اسم وسعر */}
                  <h3 className="font-medium">{product.name}</h3>
                  <div className="flex items-center gap-2">
                    <p className="text-red-600 font-semibold">${product.price}</p>
                    <p className="text-gray-400 line-through">
                      ${product.price + (product.discount * product.price) / 100}
                    </p>
                  </div>

                  {/* النجوم */}
                  <div className="flex text-yellow-400 mb-2">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span key={i}>
                        {i < Math.floor(product.rating / 20) ? "★" : "☆"}
                      </span>
                    ))}
                    <span className="ml-2 text-gray-500 text-sm">
                      ({product.rating})
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <div className="flex justify-center mb-10">
        <button className="bg-[#DB4444] text-white px-4 py-2 rounded-sm">
          View all Products
        </button>
      </div>

      <div className="h-[1px] w-[85%] mx-auto bg-gray-200 mb-20"></div>
    </div>
  );
}
