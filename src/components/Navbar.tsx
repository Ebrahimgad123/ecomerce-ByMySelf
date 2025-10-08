"use client";
import Link from "next/link";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { memo } from "react";
import { CiHeart } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { translate } from "@/lib/translations";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useSession, signIn, signOut } from "next-auth/react";

function Navbar() {
  const { items } = useSelector((state: RootState) => state.wishlist);
  const { items: cartItems } = useSelector((state: RootState) => state.cart);
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const path = usePathname();
  const currentLanguage = path.split("/")[1];
  const { data: session, status } = useSession();
  return (
    <nav className="bg-white border-b border-gray-200 px-7 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-around ">
      <div className="flex items-center justify-between w-full sm:w-auto">
        <Link href="/" className="text-black font-bold text-lg">
          {translate(currentLanguage, "header.title")}
        </Link>

        <button
          className="sm:hidden text-black focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖️" : "☰"}
        </button>
      </div>

      {/* الروابط */}
      <div
        className={`flex flex-col sm:flex-row items-center w-full sm:w-auto mt-3 sm:mt-0 ${
          menuOpen ? "flex" : "hidden sm:flex"
        }`}
      >
        <Link href="/" className="text-black px-4 py-1 hover:text-blue-500">
          {translate(currentLanguage, "header.main")}
        </Link>
        <Link
          href="/contact"
          className="text-black px-4 py-1 hover:text-blue-500"
        >
          {translate(currentLanguage, "header.contact")}
        </Link>
        <Link
          href="/about"
          className="text-black px-4 py-1 hover:text-blue-500"
        >
          {translate(currentLanguage, "header.about")}
        </Link>
        {status === "authenticated" ? (
          <>
            <Link
              href="/profile"
              className="text-black px-4 py-1 hover:text-blue-500"
            >
              {session.user.name || session.user.email}
            </Link>
            <button
              onClick={() => signOut()}
              className="text-black px-4 py-1 hover:text-blue-500"
            >
              {translate(currentLanguage, "header.logout")}
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => signIn()}
              className="text-black px-4 py-1 hover:text-blue-500"
            >
              {translate(currentLanguage, "header.login")}
            </button>
            <Link
              href="/signup"
              className="text-black px-4 py-1 hover:text-blue-500"
            >
              {translate(currentLanguage, "header.signUp")}
            </Link>
          </>
        )}
      </div>

      {/* البحث */}
      <div className="flex items-center gap-2 ">
        <div className="relative w-full sm:w-auto mt-3 sm:mt-0">
          <input
            type="text"
            placeholder="What are you looking for?"
            className="w-full sm:w-64 p-2 pl-3 rounded-md text-black border border-gray-300 focus:outline-none focus:border-blue-500 placeholder:text-sm placeholder:text-gray-400"
          />

          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer">
            <CiSearch size={20} />
          </span>
        </div>
        <button
          onClick={() => {
            router.push("/wishlist");
          }}
          className="cursor-pointer relative"
        >
          <CiHeart size={32} />
          {items.length > 0 && (
            <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
              {items.length}
            </span>
          )}
        </button>
         <div className="relative">
           <button onClick={() => router.push("/cart")} className="cursor-pointer ">
          <IoCartOutline size={32} />
          {cartItems.length > 0 && (
            <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
              {cartItems.length}
            </span>
          )}
        </button>
         </div>
      </div>
    </nav>
  );
}

export default memo(Navbar);
