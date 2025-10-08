"use client"; // مهم جدا

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import React from "react";

interface SessionProviderProps {
  children: React.ReactNode;
  session?: Session | null; 
}

const SessionProvider = ({ children, session }: SessionProviderProps) => {
  return (
    <NextAuthSessionProvider session={session}>
      {children}
    </NextAuthSessionProvider>
  );
};

export default SessionProvider;
