import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { createToken } from "@/lib/auth";
import bcrypt from "bcryptjs"; // <-- 1. Import bcryptjs

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Email atau password salah!" },
        { status: 401 }
      );
    }

    // 2. Verifikasi Password dengan bcrypt.compare
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Email atau password salah!" },
        { status: 401 }
      );
    }

    // 3. Buat JWT Token
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
    return NextResponse.json(
      { message: "Server error!" },
      { status: 500 }
    );
  }
}