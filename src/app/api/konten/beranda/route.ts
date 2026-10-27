import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// WAJIB: Paksa route ini agar diproses dinamis (mencegah error build prerender Vercel)
export const dynamic = "force-dynamic";

// 1. GET CONFIG BERANDA
export async function GET() {
  try {
    const content = await db.pageContent.findUnique({
      where: { pageKey: "beranda" },
    });

    return NextResponse.json(
      content || {
        pageKey: "beranda",
        title: "Beranda Utama Corporate",
        sections: {
          heroCarousel: [],
          sectionOrder: ["hero", "rentals", "sales", "whyUs", "news"],
        },
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error: any) {
    console.error("GET Content Beranda Error:", error);
    return NextResponse.json(
      { message: "Gagal mengambil data konfigurasi beranda" },
      { status: 500 }
    );
  }
}

// 2. PUT / UPDATE CONFIG BERANDA
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { title, sections } = body;

    const updated = await db.pageContent.upsert({
      where: { pageKey: "beranda" },
      update: {
        title: title || "Beranda Utama Corporate",
        sections: sections || {},
      },
      create: {
        pageKey: "beranda",
        title: title || "Beranda Utama Corporate",
        sections: sections || {},
      },
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error("PUT Content Beranda Error:", error);
    return NextResponse.json(
      { message: error.message || "Gagal memperbarui konfigurasi beranda" },
      { status: 500 }
    );
  }
}