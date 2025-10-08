import "next-auth";
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "USER" | "ADMIN";
      accessToken: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role: "USER" | "ADMIN";
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "USER" | "ADMIN";
    accessToken: string;
    refreshToken: string;
  }
}
