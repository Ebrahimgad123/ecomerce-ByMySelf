import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

const REFRESH_SECRET = process.env.REFRESH_SECRET!;

export async function POST(req: NextRequest) {
  const refreshToken = req.cookies.get("refreshToken")?.value;

  const res = NextResponse.json({ message: "Logged out" });
  res.cookies.set("accessToken", "", { path: "/", maxAge: 0 });
  res.cookies.set("refreshToken", "", { path: "/", maxAge: 0 });

  if (!refreshToken) return res;

  try {
    const payload = jwt.verify(refreshToken, REFRESH_SECRET) as { userId: string, role: "USER" | "ADMIN" };
    await prisma.user.update({
      where: { id: payload.userId },
      data: { refreshToken: null },
    });
  } catch {}

  return res;
}
