"use client";
import type { Swiper as SwiperType } from "swiper";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Camera, Laptop, Headphones,Phone,Computer, Smartphone,Tv } from "lucide-react";
import TopComps from "./TopCompos";

const categories = [
  { id: 1, name: "Camera", icon: Camera },
  { id: 2, name: "Laptop", icon: Laptop },
  { id: 3, name: "Headphones", icon: Headphones },
  { id: 4, name: "More", icon: Camera },
  { id: 5, name: "Phone", icon: Phone },
  { id: 6, name: "Computer", icon: Computer },
  { id: 7, name: "Smartphone", icon: Smartphone },
  { id: 8, name: "Headphones", icon: Headphones },
  { id: 9, name: "TV", icon: Tv },
];

export default function CategorySwiper() {
     const swiperRef = useRef<SwiperType | null>(null);
  return (
    <div className=" py-10 ">
         <div>
        <TopComps swiperRef={swiperRef} topTitle="Categories" topSubTitle="Browse By Category"  />
    </div >
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="w-[85%] mx-auto"
        slidesPerView={6}
        spaceBetween={0}
        breakpoints={{
          320: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 6 },
        }}
      >
        {categories.map((cat) => (
          <SwiperSlide key={cat.id}>
            <div className="w-[170px] h-[145px] flex flex-col  items-center justify-center rounded-md border hover:bg-[#DB4444] transition">
              <cat.icon className="w-8 h-8 text-black mb-3" />
              <p className="text-black font-medium">{cat.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
       <div className="h-[1px] w-[85%] mx-auto bg-gray-200 mb-20 mt-20">
        </div>
    </div>
  );
}
