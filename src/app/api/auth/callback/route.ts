import { NextResponse } from "next/server";
import { PrismaClient, Role } from "@prisma/client";
import { createToken } from "@/lib/auth";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    // 1. Tukar auth code dari Google dengan session Supabase
    const { data: sessionData, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && sessionData.user) {
      const googleUser = sessionData.user;
      const email = googleUser.email!;
      const name = googleUser.user_metadata.full_name || googleUser.user_metadata.name || "Google User";

      // 2. Cek apakah user sudah terdaftar di DB Prisma kamu
      let user = await prisma.user.findUnique({
        where: { email },
      });

      // 3. Jika belum terdaftar, otomatis buatkan record User baru (Default: USER)
      if (!user) {
        user = await prisma.user.create({
          data: {
            name,
            email,
            password: null, // User OAuth tidak menggunakan password lokal
            role: Role.USER,
          },
        });
      }

      // 4. Generate JWT auth token aplikasi kamu
      const token = await createToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      // 5. Redirect user ke halaman tujuan sesuai Role
      const redirectPath = user.role === Role.ADMIN || user.role === Role.SUPER_ADMIN ? "/admin" : "/dashboard";
      const response = NextResponse.redirect(`${origin}${redirectPath}`);

      // Set cookie HTTP-only auth_token
      response.cookies.set("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 1 hari
        path: "/",
      });

      return response;
    }
  }

  // Jika gagal, kembalikan ke halaman login dengan parameter error
  return NextResponse.redirect(`${origin}/login?error=OAuthFailed`);
}