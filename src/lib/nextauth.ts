import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { NextAuthOptions } from "next-auth";
import { generateTokens } from "./jwt";
import type { JWT } from "next-auth/jwt";
// أسرار التوكن
const ACCESS_SECRET = process.env.ACCESS_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_SECRET!;

// شكل التوكن اللي هنشتغل عليه
type TokenData = JWT & {
  userId?: string;
  accessToken?: string;
  refreshToken?: string;
  role?: "USER" | "ADMIN";
};

// نموذج المستخدم
type AppUser = {
  id: string;
  email: string;
  name?: string | null;
  image?: string | null;
  role: "USER" | "ADMIN";
  accessToken: string;
};

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      // authorize مع النوعية الصحيحة
      authorize: async (
        credentials?: Record<"email" | "password", string> | undefined
      ): Promise<AppUser | null> => {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name ?? "",
          image: user.image ?? "",
          role: user.role as "USER" | "ADMIN",
          accessToken: "", // Initialize accessToken to an empty string
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid email profile",
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 15 * 60, // 15 دقيقة
  },

  callbacks: {
    // jwt callback
    async jwt({ token, user, account }) {
      const tokenData = token as TokenData;
     
      if (user) {
        const userId = user.id;
        const userRole =
          account?.provider === "google"
            ? "USER"
            : (user.role as "USER" | "ADMIN");
        const { accessToken, refreshToken } = generateTokens(userId, userRole);

        // تشفير قبل التخزين
        const hashedRefresh = await bcrypt.hash(refreshToken, 12);
        await prisma.user.update({
          where: { id: userId },
          data: { refreshToken: hashedRefresh ,image:user.image},
        });

        tokenData.userId = userId;
        tokenData.accessToken = accessToken;
        tokenData.refreshToken = refreshToken;
        tokenData.role = userRole;
        tokenData.image = user.image;

        return tokenData;
      }

      // تحقق من صلاحية التوكن
      if (tokenData.accessToken) {
        try {
          jwt.verify(tokenData.accessToken, ACCESS_SECRET);
          return tokenData;
        } catch (err) {
          console.log("Access token expired:", err);
        }
      }

      // تحقق من التوكن المنعش
      if (!tokenData.userId || !tokenData.refreshToken) return tokenData;

      try {
        const dbUser = await prisma.user.findUnique({
          where: { id: tokenData.userId },
        });
        if (!dbUser || !dbUser.refreshToken) return tokenData;

        const refreshPayload = jwt.verify(
          tokenData.refreshToken,
          REFRESH_SECRET
        ) as { userId: string; role: "USER" | "ADMIN" }; 
        const isValid = await bcrypt.compare(
          tokenData.refreshToken,
          dbUser.refreshToken
        );

        if (!isValid || refreshPayload.userId !== tokenData.userId) {
          await prisma.user.update({
            where: { id: tokenData.userId },
            data: { refreshToken: null },
          });
          return tokenData;
        }

        const { accessToken: newAccess, refreshToken: newRefresh } =
          generateTokens(tokenData.userId, refreshPayload.role);
        const newHashedRefresh = await bcrypt.hash(newRefresh, 12);

        await prisma.user.update({
          where: { id: tokenData.userId },
          data: { refreshToken: newHashedRefresh },
        });

        tokenData.accessToken = newAccess;
        tokenData.refreshToken = newRefresh;
        tokenData.role = refreshPayload.role;

        return tokenData;
      } catch (err) {
        console.error("JWT refresh error:", err);
        if (tokenData.userId) {
          await prisma.user.update({
            where: { id: tokenData.userId },
            data: { refreshToken: null },
          });
        }
        return tokenData;
      }
    },

    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.email = token.email as string;
      session.user.image = token.image as string;
      session.user.name = token.name as string;
      session.user.accessToken = token.accessToken as string;
      session.user.role = token.role as "USER" | "ADMIN";
      return session;
    },
  },

  pages: {
    signIn: "/signIn",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
