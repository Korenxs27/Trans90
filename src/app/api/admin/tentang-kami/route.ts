import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const dynamic = "force-dynamic";

// GET: Ambil Konten Terpadu Halaman Tentang Kami
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get("key") || "tentang-kami-all";

    const pageData = await prisma.pageContent.findUnique({
      where: { pageKey: key },
    });

    return NextResponse.json(
      {
        success: true,
        content: pageData?.sections || null,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Gagal mengambil data Tentang Kami:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data dari database" },
      { status: 500 }
    );
  }
}

// POST: Simpan / Update Seluruh Konten Terpadu Halaman Tentang Kami
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { pageKey, title, sections } = body;

    const targetKey = pageKey || "tentang-kami-all";

    const updatedPage = await prisma.pageContent.upsert({
      where: { pageKey: targetKey },
      update: {
        title: title || "Halaman Tentang Kami (Terpadu)",
        sections: sections,
      },
      create: {
        pageKey: targetKey,
        title: title || "Halaman Tentang Kami (Terpadu)",
        sections: sections,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Seluruh konten Tentang Kami berhasil diperbarui!",
        data: updatedPage,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Gagal menyimpan data Tentang Kami:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menyimpan data ke database" },
      { status: 500 }
    );
  }
}