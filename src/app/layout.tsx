// RootLayout.tsx
import "./globals.css";
import { Inter } from "next/font/google";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import ReduxProvider from "@/redux/ReduxProvider";
import SessionProvider  from "@/redux/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextauth";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions); 

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <ReduxProvider>
            <header>
              <LanguageSwitcher />
              <Navbar />
            </header>
            <main>{children}</main>
            <ToastContainer />
            <footer></footer>
          </ReduxProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
