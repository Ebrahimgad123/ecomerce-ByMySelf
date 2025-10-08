"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function UnauthorizedPage() {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    // Redirect authenticated users away from this page
    if (status === "authenticated") {
      router.push("/"); // Redirect to home or another appropriate page
    }
  }, [status, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold text-red-600 mb-4">403 - Unauthorized Access</h1>
      <p className="text-lg text-gray-700 mb-8">You do not have permission to view this page.</p>
      <button
        onClick={() => router.push("/")}
        className="px-6 py-3 bg-blue-600 text-white rounded-md text-lg hover:bg-blue-700 transition duration-300"
      >
        Go to Homepage
      </button>
    </div>
  );
}
