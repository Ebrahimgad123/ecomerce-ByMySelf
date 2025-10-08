import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.ACCESS_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_SECRET!;

export function generateTokens(userId: string, role: "USER" | "ADMIN") {
  const accessToken = jwt.sign({ userId, role }, ACCESS_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ userId, role }, REFRESH_SECRET, { expiresIn: "7d" });
  return { accessToken, refreshToken };
}

