import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  const { pathname } = req.nextUrl;

  // Proteksi halaman /admin
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  // Jika sudah login tapi buka halaman /admin/login -> redirect ke /admin
  if (pathname === "/admin/login" && token) {
    const payload = await verifyToken(token);
    if (payload) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};