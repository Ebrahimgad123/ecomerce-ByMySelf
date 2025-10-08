"use client";
import React from "react";
import HeroServer from "./HeroServer";
import { usePathname } from "next/navigation";
const Hero = () => {
  const path = usePathname();
  const currentLanguage = path.split("/")[1];
  return <HeroServer currentLanguage={currentLanguage} />;
};

export default Hero;
