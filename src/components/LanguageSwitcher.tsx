"use client";
import { memo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { translate } from "@/lib/translations";
import { Cairo } from "next/font/google";

const cairo = Cairo({ subsets: ["latin"], weight: ["400","500","600","700"] });

function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (lang: string) => {
    const pathRoute = pathname.split("/");
    pathRoute[1] = lang;
    router.push(pathRoute.join("/"));
  };

  const currentLang = pathname.split("/")[1] || "en";
  const isArabic = currentLang === "ar";

  return (
    <header
      className={`bg-black text-white px-2 lg:px-20 p-2 flex flex-col sm:flex-row justify-between items-center ${
        isArabic ? cairo.className : ""
      } ${isArabic ? "sm:flex-row-reverse" : ""}`}
    >
      <div className="w-full sm:w-auto text-center sm:text-left mb-2 sm:mb-0">
        {translate(currentLang, "topHeader.title")}{" "}
        <Link
          href={`/${currentLang}/shop`}
          className="text-white underline hover:text-blue-300"
        >
          {translate(currentLang, "topHeader.link")}
        </Link>
      </div>

      <div className="w-full sm:w-auto flex justify-center sm:justify-start">
        <select
          onChange={(e) => switchLanguage(e.target.value)}
          value={currentLang}
          className="bg-black text-white border-0 outline-0 p-1 cursor-pointer"
        >
          <option value="en">English</option>
          <option value="ar">العربية</option>
        </select>
      </div>
    </header>
  );
}

export default memo(Header);

