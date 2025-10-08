"use client";
import { signIn } from "next-auth/react";
import React, { useCallback } from "react";
import Image from "next/image";

const Button = () => {
  const handleGoogleSignIn = useCallback(() => {
    signIn("google", { callbackUrl: "/" });
  }, []);

  return (
    <div>
      <button
        type="button"
        onClick={handleGoogleSignIn}
        className="w-full border border-gray-400 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition"
      >
        <Image src="/google.png" alt="Google" width={30} height={30} priority />
        Login with Google
      </button>
    </div>
  );
};

export default Button;
