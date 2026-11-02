import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  // 1. Ambil cookie auth_token (bukan admin_token)
  const token = req.cookies.get("auth_token")?.value;
  const { pathname } = req.nextUrl;

  // 2. Jika sudah login dan mencoba buka halaman login admin (/admin/login atau /login)
  if ((pathname === "/admin/login" || pathname === "/login") && token) {
    const payload = await verifyToken(token);
    if (payload) {
      const redirectUrl =
        payload.role === "ADMIN" || payload.role === "SUPER_ADMIN"
          ? "/admin"
          : "/dashboard";
      return NextResponse.redirect(new URL(redirectUrl, req.url));
    }
  }

  // 3. Proteksi Halaman Admin (/admin dan seluruh sub-halamannya)
  if (pathname.startsWith("/admin")) {
    // Biarkan akses ke /admin/login jika belum login
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }

    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const payload = await verifyToken(token);
    
    // Jika token tidak valid ATAU role bukan Admin -> lempar balik
    if (!payload || (payload.role !== "ADMIN" && payload.role !== "SUPER_ADMIN")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // 4. Proteksi Halaman User (/dashboard)
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/login"],
};