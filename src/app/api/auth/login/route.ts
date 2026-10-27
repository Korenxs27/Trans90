import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { createToken } from "@/lib/auth";
import bcrypt from "bcryptjs";

// Paksa route ini agar diproses dinamis (mencegah error build prerender Vercel)
export const dynamic = "force-dynamic";

const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email dan password wajib diisi!" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Email atau password salah!" },
        { status: 401 }
      );
    }

    // Verifikasi Password Hash dengan bcrypt.compare
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Email atau password salah!" },
        { status: 401 }
      );
    }

    // Buat JWT Token
    const token = await createToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const response = NextResponse.json({
      message: "Login berhasil!",
      user: { name: user.name, email: user.email, role: user.role },
    });

    // Set HTTP-only Cookie
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 hari
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login API Error:", error);
    return NextResponse.json(
      { message: "Server error!" },
      { status: 500 }
    );
  }
}