import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// 1. GET SINGLE NEWS BY ID
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Un-wrap Promise params sesuai standar Next.js 15+
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "ID artikel tidak valid" },
        { status: 400 }
      );
    }

    const news = await db.news.findUnique({
      where: { id },
    });

    if (!news) {
      return NextResponse.json(
        { message: "Artikel berita tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(news);
  } catch (error: any) {
    console.error("GET Single News Error:", error);
    return NextResponse.json(
      { message: "Gagal mengambil detail berita" },
      { status: 500 }
    );
  }
}

// 2. PUT / UPDATE NEWS BY ID
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { title, slug, content, labels, category, status, publishedAt } = body;

    const categoryValue =
      category ||
      (Array.isArray(labels) && labels.length > 0 ? labels[0] : "Berita");

    const updatedNews = await db.news.update({
      where: { id },
      data: {
        title,
        slug,
        content,
        category: categoryValue,
        status,
        publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
      } as any,
    });

    return NextResponse.json(updatedNews);
  } catch (error: any) {
    console.error("PUT News Error:", error);
    return NextResponse.json(
      { message: error.message || "Gagal memperbarui berita" },
      { status: 500 }
    );
  }
}

// 3. DELETE NEWS BY ID
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "ID artikel tidak valid" },
        { status: 400 }
      );
    }

    await db.news.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Berita berhasil dihapus" });
  } catch (error: any) {
    console.error("DELETE News Error:", error);
    return NextResponse.json(
      { message: error.message || "Gagal menghapus berita dari database" },
      { status: 500 }
    );
  }
}