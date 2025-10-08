"use client";
import React, { useCallback, useTransition } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";

const GoogleButton: React.FC = () => {
  const [isPending, startTransition] = useTransition();

  const handleSignIn = useCallback(() => {
    startTransition(() => {
      signIn("google", { callbackUrl: "/" });
    });
  }, []);

  return (
    <button
      type="button"
      onClick={handleSignIn}
      disabled={isPending}
      className={`w-full border border-gray-400 py-3 rounded-lg flex items-center justify-center gap-2 transition 
        ${isPending ? "opacity-60 cursor-not-allowed" : "hover:bg-gray-100"}`}
    >
      <Image
        src="/google.png"
        alt="Google"
        width={24}
        height={24}
        priority
        className="object-contain"
      />
      {isPending ? "Signing in..." : "Sign up with Google"}
    </button>
  );
};

GoogleButton.displayName = "GoogleButton";

export default React.memo(GoogleButton);
