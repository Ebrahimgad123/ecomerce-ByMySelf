"use client";
import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import LogoutButton from "@/components/LogoutButton";
import Image from "next/image";

export default function EditProfileForm() {
  const session = useSession();
  const first = session.data?.user?.name?.split(" ")[0];
  const last = session.data?.user?.name?.split(" ")[1];
  const [firstName, setFirstName] = useState(first);
  const [lastName, setLastName] = useState(last);
  const [email, setEmail] = useState(session.data?.user?.email ?? "");
  const [address, setAddress] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("تم حفظ التغييرات");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 🔹 Header */}
      <div className="flex flex-col md:flex-row justify-between px-6 md:px-20 py-5 text-gray-500 text-sm">
        <ol className="mb-2 md:mb-0">
          <li>
            <Link href="/">Home</Link>{" "}
            <span className="font-bold">/ My Account</span>
          </li>
        </ol>
        <h2 className="text-center md:text-right">
          Welcome {session.data?.user?.name}
        </h2>
      </div>

      {/* 🔹 Main Content */}
      <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <nav className="lg:w-1/4 w-full">
          <div className="bg-gray-100 p-4 rounded shadow-sm">
            <h3 className="font-semibold mb-4">Manage My Account</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <div className="w-[90%] mx-auto">
                <li className="cursor-pointer hover:underline">My Profile</li>
                <li className="hover:text-gray-800 cursor-pointer">
                  Address Book
                </li>
                <li className="hover:text-gray-800 cursor-pointer">
                  My Payment Options
                </li>
              </div>

              <li className="mt-4 text-gray-700 font-bold text-lg">
                My Orders
              </li>
              <div className="w-[90%] mx-auto">
                <li className="hover:text-gray-800 cursor-pointer">My Returns</li>
                <li className="hover:text-gray-800 cursor-pointer">
                  My Cancellations
                </li>
              </div>

              <li className="mt-4 text-gray-700 font-bold text-lg">
                My Wishlist
              </li>
            </ul>
          </div>
        </nav>

        {/* Form */}
        <main className="lg:w-3/4 w-full">
          <div className="bg-white border rounded p-6 shadow-sm ">
            <h2 className="text-xl font-bold mb-4 text-red-500 text-center lg:text-center">
              Edit Your Profile
            </h2>

            {/* 🔸 Profile Image Section */}
            <div className="flex flex-col items-center lg:items-center mb-6">
              <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-gray-300">
                <Image
                  src={
                    session.data?.user?.image ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="Profile Picture"
                  fill
                  className="object-cover"
                />
              </div>
              <button
                type="button"
                className="mt-3 text-sm text-blue-500 hover:underline"
              >
                Change Profile Picture
              </button>
            </div>

            {/* 🔸 Form Fields */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-gray-100 rounded px-3 py-2 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-gray-100 rounded px-3 py-2 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-100 rounded px-3 py-2 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-gray-100 rounded px-3 py-2 focus:outline-none"
                />
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Password Changes</h3>
                <input
                  type="password"
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full bg-gray-100 rounded px-3 py-2 mb-2 focus:outline-none"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-gray-100 rounded px-3 py-2 mb-2 focus:outline-none"
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className="w-full bg-gray-100 rounded px-3 py-2 focus:outline-none"
                />
              </div>

              {/* 🔸 Buttons */}
              <div className="flex flex-wrap justify-end gap-2 pt-2">
                <button
                  type="button"
                  className="px-4 py-2 border rounded hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Save Changes
                </button>
                <LogoutButton />
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
