import { NextResponse } from "next/server";
import { PrismaClient, Role } from "@prisma/client";
import { createToken } from "@/lib/auth";
import bcrypt from "bcryptjs";

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

    const envAdminEmail = process.env.ADMIN_EMAIL;
    const envAdminPassword = process.env.ADMIN_PASSWORD;

    let user;

    // 1. CEK DULU APAKAH USER ADALAH ADMIN DARI .ENV
    if (envAdminEmail && envAdminPassword && email === envAdminEmail && password === envAdminPassword) {
      const hashedPassword = await bcrypt.hash(password, 10);

      // Auto Upsert ke database agar akun admin dari .env terdaftar secara sah di DB
      user = await prisma.user.upsert({
        where: { email: envAdminEmail },
        update: {
          role: Role.ADMIN,
          password: hashedPassword,
        },
        create: {
          email: envAdminEmail,
          name: "Admin Trans90",
          password: hashedPassword,
          role: Role.ADMIN,
        },
      });
    } else {
      // 2. JIKA BUKAN HARDCODED .ENV ADMIN, CEK USER BIASA DI DATABASE
      user = await prisma.user.findUnique({
        where: { email },
      });

      // Cek jika user tidak ada atau terdaftar via Google OAuth (password = null)
      if (!user || !user.password) {
        return NextResponse.json(
          { message: "Email atau password salah! (Atau coba login dengan Google)" },
          { status: 401 }
        );
      }

      // Verifikasi Password Hash
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return NextResponse.json(
          { message: "Email atau password salah!" },
          { status: 401 }
        );
      }
    }

    // 3. BUAT JWT TOKEN & SET COOKIE
    const token = await createToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const response = NextResponse.json({
      message: "Login berhasil!",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    // Set Cookie HTTP-Only universal (auth_token)
    response.cookies.set("auth_token", token, {
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
      { message: "Terjadi kesalahan pada server!" },
      { status: 500 }
    );
  }
}