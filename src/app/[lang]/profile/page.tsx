"use client";
import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import LogoutButton from "@/components/LogoutButton";

export default function EditProfileForm() {
  const session=useSession();
  const first=session.data?.user?.name?.split(" ")[0];
  const last=session.data?.user?.name?.split(" ")[1];
  const [firstName, setFirstName] = useState(first);
  const [lastName, setLastName] = useState(last);
  const [email, setEmail] = useState(session.data?.user?.email??"");
  const [address, setAddress] = useState("");;
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("تم حفظ التغييرات");
  };

  return (
    <div>
      <div className="flex justify-between px-30 py-5">
        {" "}
        <ol className="text-sm text-gray-500 mb-4">
          <li>
            <Link href="/">Home</Link>{" "}
            <span className="font-bold">/ My Account</span>
          </li>
        </ol>
        <h2 className="text-sm text-gray-500 mb-4">Welcome  {session.data?.user?.name}</h2>
      </div>
      <div className="container mx-auto p-4 flex  min-h-screen bg-white">
        <nav className="w-1/4 pr-8">
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="font-semibold mb-4">Manage My Account</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <div className="w-[80%] mx-auto">
                <li className="cursor-pointer hover:underline">My Profile</li>
                <li className="hover:text-gray-800 cursor-pointer">
                  Address Book
                </li>
                <li className="hover:text-gray-800 cursor-pointer">
                  My Payment Options
                </li>
              </div>

              {/* Section Title */}
              <li className="mt-4 text-gray-700 font-bold text-lg">
                My Orders
              </li>
              <div className="w-[80%] mx-auto">
                <li className="hover:text-gray-800 cursor-pointer">My Returns</li>
              <li className="hover:text-gray-800 cursor-pointer">
                My Cancellations
              </li>
              </div>

              {/* Section Title */}
              <li className="mt-4 text-gray-700 font-bold text-lg">
                My Wishlist
              </li>
            </ul>
          </div>
        </nav>

        {/* النموذج الرئيسي لتحرير الملف الشخصي */}
        <main className="w-3/4">
          <div className="bg-white border rounded p-6">
            <h2 className="text-xl font-bold mb-4 text-red-500">
              Edit Your Profile
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
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
                  className="w-full bg-gray-100 rounded px-3 py-2 mb-2 block focus:outline-none"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full rounded bg-gray-100 px-3 py-2 mb-2 block focus:outline-none"
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className="w-full bg-gray-100 rounded px-3 py-2 focus:outline-none"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Save Changes
                </button>
                <LogoutButton/>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
