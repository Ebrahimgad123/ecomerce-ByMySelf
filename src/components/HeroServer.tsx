import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "@/components/Link";
import { MdKeyboardArrowRight } from "react-icons/md";

import { translate } from "@/lib/translations";
const products = [
  { id: 1, name: "Clothes Banner", image: "/11.png" },
  { id: 2, name: "Shoes Banner", image: "/22.png" },
  { id: 3, name: "Cosmetics Banner", image: "/33.png" },
];

const links = [
  { id: 1, url: "https://example.com", text: "hero.link1" },
  { id: 2, url: "https://example.com/2", text: "hero.link2" },
  { id: 3, url: "https://example.com/3", text:"hero.link3" },
  { id: 4, url: "https://example.com/4", text: "hero.link4"  },
  { id: 5, url: "https://example.com/5", text: "hero.link5"  },
  { id: 6, url: "https://example.com/6", text: "hero.link6"  },
  { id: 7, url: "https://example.com/7", text: "hero.link7"  },
  { id: 8, url: "https://example.com/8", text: "hero.link8"  },
  { id: 9, url: "https://example.com/9", text: "hero.link9"  },
];

const Hero = ({ currentLanguage}:{currentLanguage:string}) => {
      
  return (
    <div className="flex flex-col md:flex-row mt-10 gap-2 mb-10">
      {/* Links Section */}
      <div className="w-full md:w-2/6 flex justify-center items-center border-gray-300 border-r-2 mb-[-100px] md:mb-[100px]">
        <ul className="list-none p-4 w-full">
          {links.map((link,index) => (
            <li key={link.id} className="mb-2">
              <Link
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center text-black hover:underline"
              >
                <span className="w-50">{translate(currentLanguage,link.text)}</span>
                {/* {(link.text === "Woman’s Fashion" ||
                  link.text === "Men’s Fashion") && <MdKeyboardArrowRight  size={20}/>} */}
                  {index >1 ? "":  <MdKeyboardArrowRight  size={20}/> }
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Swiper Section */}
      <div className="w-[90%] mx-auto md:w-4/6">
        <Swiper
          pagination={{ clickable: true }}
          modules={[Autoplay]}
          autoplay={{ delay: 3000 }}
          loop={true}
          className=" w-full h-full"
        >
          {products.map((product) => (
            <SwiperSlide
              key={product.id}
              className="flex justify-center items-center"
            >
              <div className="relative w-full h-[400px]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  className="object-contain rounded-lg w-full h-full"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Hero;
