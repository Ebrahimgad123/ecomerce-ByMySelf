// app/api/auth/refresh/route.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { generateTokens } from "@/lib/jwt";

const REFRESH_SECRET = process.env.REFRESH_SECRET!;

export async function POST(req: NextRequest) {
  const refreshToken = req.cookies.get("refreshToken")?.value;
  if (!refreshToken)
    return NextResponse.json({ error: "No refresh token" }, { status: 401 });

  try {
    const payload = jwt.verify(refreshToken, REFRESH_SECRET) as { userId: string };
    const user = await prisma.user.findUnique({ where: { id: payload.userId } });

    if (!user || !user.refreshToken)
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const valid = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!valid)
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    // ✅ إنشاء توكنات جديدة
    const { accessToken, refreshToken: newRefresh } = generateTokens(user.id,user.role);

    // ✅ تشفير refresh token الجديد وتخزينه
    const hashedNewRefresh = await bcrypt.hash(newRefresh, 10);
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: hashedNewRefresh },
    });

    // ✅ إنشاء الرد
    const response = NextResponse.json({ message: "Token refreshed" });

    // ✅ تخزين access token في Cookie قصيرة العمر
    response.cookies.set("accessToken", accessToken, {
      httpOnly: false, // علشان الواجهة تقدر تستخدمه مؤقتًا
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 15 * 60, // 15 دقيقة فقط
    });

    // ✅ تخزين refresh token الآمن
    response.cookies.set("refreshToken", newRefresh, {
      httpOnly: true, // لا يمكن قراءته من المتصفح
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // أسبوع
    });

    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
}
