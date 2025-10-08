"use client";
import React, { useState, useCallback, FormEvent, memo, useTransition } from "react";
import { registerSchema } from "@/app/validation/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setError("");

      const validate = registerSchema.safeParse(formData);
      if (!validate.success) {
        setError(validate.error.issues[0].message);
        return;
      }

      startTransition(async () => {
        try {
          const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(formData),
          });

          const data = await res.json();

          if (!res.ok) {
            setError(data.error || "Something went wrong");
            return;
          }

          toast.success("Account created successfully");

          // await signIn("credentials", {
          //   email: formData.email,
          //   password: formData.password,
          //   redirect: false,
          // });

          setFormData({ name: "", email: "", password: "" });
          router.push("/signIn");
        } catch (err) {
          const message = err instanceof Error ? err.message : "Something went wrong";
          setError(message);
        }
      });
    },
    [formData, router]
  );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      {["name", "email", "password"].map((field) => (
        <input
          key={field}
          type={field === "password" ? "password" : field}
          name={field}
          placeholder={field[0].toUpperCase() + field.slice(1)}
          value={(formData as Record<string, string>)[field]}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ))}

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className={`bg-black text-white py-3 rounded-lg transition ${
          isPending ? "opacity-70 cursor-not-allowed" : "hover:bg-gray-800"
        }`}
      >
        {isPending ? "Creating..." : "Sign up"}
      </button>
    </form>
  );
};

RegisterForm.displayName = "RegisterForm";

export default memo(RegisterForm);
