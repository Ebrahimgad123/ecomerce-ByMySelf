import React from "react";
import Hero from "@/components/Hero";
import TodayComponent from "@/components/TodayComponent";
import Categories from "@/components/Categories";
import "@/components/Marquee.css";
const page = () => {
  return (
    <div>
      <div className="marquee-container">
        <div className="marquee-text ">
          we are under development please wait until we are all done
        </div>
      </div>
      <Hero />
      <TodayComponent />
      <Categories />
    </div>
  );
};

export default page;
