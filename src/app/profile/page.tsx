"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login"); // Redirect to login page if not authenticated
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session) {
    return (
      <div>
        <h1>Profile Page</h1>
        <p>Welcome, {session.user?.name || session.user?.email}!</p>
        <p>Your role: {session.user?.role}</p>
        {/* Display other user information as needed */}
      </div>
    );
  }

  return null; // Should not reach here if redirection works
}
