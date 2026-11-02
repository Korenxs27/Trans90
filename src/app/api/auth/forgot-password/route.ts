import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Alamat email wajib diisi!" },
        { status: 400 }
      );
    }

    // 1. Cek keberadaan user di Database Prisma
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Demi keamanan, jika user tidak ditemukan, jangan tampilkan error eksplisit "User tidak ada"
    // (Cukup berikan respon sukses umum agar tidak terjadi email enumeration attack)
    if (!user) {
      return NextResponse.json(
        { message: "Jika email terdaftar, instruksi reset kata sandi telah dikirimkan." },
        { status: 200 }
      );
    }

    // 2. Cek jika user terdaftar via Google OAuth (password: null)
    if (!user.password) {
      return NextResponse.json(
        { message: "Akun ini terdaftar menggunakan Google OAuth. Silakan masuk menggunakan tombol Google." },
        { status: 400 }
      );
    }

    // 3. Kirim Email Reset Password via Supabase Auth
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${new URL(req.url).origin}/auth/reset-password`,
    });

    if (error) {
      console.error("Supabase Reset Password Error:", error.message);
      return NextResponse.json(
        { message: "Gagal mengirimkan email reset password. Coba lagi nanti." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Instruksi reset kata sandi telah dikirim ke email Anda. Silakan periksa inbox/spam!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Forgot Password API Error:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server!" },
      { status: 500 }
    );
  }
}