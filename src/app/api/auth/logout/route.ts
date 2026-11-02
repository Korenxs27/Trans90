import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();

    // Hapus cookie auth utama
    cookieStore.delete("auth_token");

    // Hapus fallback/legacy cookie (jika ada)
    cookieStore.delete("admin_token");

    return NextResponse.json(
      { message: "Logout berhasil!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Logout API Error:", error);
    return NextResponse.json(
      { message: "Gagal logout!" },
      { status: 500 }
    );
  }
}