import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Timer from "@/components/Timer";
import type { Swiper as SwiperType } from "swiper";

interface TopCompsProps {
  swiperRef: React.MutableRefObject<SwiperType | null>;
  topTitle?: string;
  topSubTitle?: string;
  timer?: boolean;
}

const TopComps = ({
  swiperRef,
  topTitle,
  topSubTitle,
  timer,
}: TopCompsProps) => {
  return (
    <div className="flex flex-col  sm:flex-row items-center w-[90%] sm:w-[85%] mx-auto justify-between my-6 gap-4 sm:gap-0">
      {/* Left Title */}
      <div className="flex-col  lg:flex-col  sm:text-left">
        <div className="flex justify-center sm:justify-start gap-2 items-center">
          <span className="w-2 h-6 bg-red-500"></span>
          <h2 className="text-lg sm:text-xl font-semibold text-red-500">{topTitle}</h2>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold mt-1">{topSubTitle}</h1>
      </div>

      {/* Timer */}
      {timer && (
        <div className="order-3 sm:order-none">
          <Timer />
        </div>
      )}

      {/* right in small screen */}
      <div className="flex space-x-4 justify-end">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
        >
          <ArrowLeft className="w-5 h-5 text-black" />
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
        >
          <ArrowRight className="w-5 h-5 text-black" />
        </button>
      </div>
    </div>
  );
};

export default TopComps;
