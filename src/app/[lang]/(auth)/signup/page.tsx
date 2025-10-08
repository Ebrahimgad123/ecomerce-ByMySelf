import React from "react";
import Image from "next/image";
import ImageSide from "../../../../../public/Side Image.png";
import Link from "@/components/Link";
import Index from "./_component/Index";
import Button from "./_component/Button";
const Page = () => {
  return (
    <div className="flex flex-col md:flex-row mt-10 px-5 md:px-20">
      <div className="hidden md:flex w-2/5 justify-center items-center">
        <Image
          src={ImageSide}
          width={500}
          height={500}
          priority
          alt="Side Image"
          className="rounded-lg"
        />
      </div>

      <div className="w-full md:w-3/5 flex justify-center items-center">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-2">Create an account</h1>
          <p className="text-gray-500 mb-6">Enter your details below</p>

            <Index/>

          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-gray-500">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

           <Button/>

          <p className="mt-6 text-center text-gray-600">
            Already have an account?{" "}<Link href="/signIn" className="text-blue-500 hover:underline">
            Sign in
          </Link>
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default Page;
