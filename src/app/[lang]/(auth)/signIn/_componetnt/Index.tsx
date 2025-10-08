"use client";
import React, { useState } from 'react'
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/app/validation/auth";
import { signIn } from 'next-auth/react';
const Index = () => {
     const router = useRouter();
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [error, setError] = useState("");
      const [loading, setLoading] = useState(false);
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
    
        const validate = loginSchema.safeParse({ email, password });
        if (!validate.success) {
          setError(validate.error.issues[0].message);
          setLoading(false);
          return;
        }
    
        try {
          const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
          });
    
          if (res?.error) {
            if (res.error === "CredentialsSignin") {
              setError("Invalid credentials");
            } else {
              setError(res.error);
            }
          } else {
            toast.success("Logged in successfully");
            router.push("/");
          }
        } catch (err) {
          const message =
            err instanceof Error ? err.message : "Something went wrong";
          setError(message);
        } finally {
          setLoading(false);
        }
      };
  return (
    <div>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {error && <p className="text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
    </div>
  )
}

export default Index