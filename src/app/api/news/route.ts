import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

// GET ALL NEWS
export async function GET() {
  try {
    const news = await db.news.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json({ message: "Gagal mengambil data berita" }, { status: 500 });
  }
}

// CREATE NEWS
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, slug, content, labels, status, publishedAt, category } = body;

    const newNews = await db.news.create({
      data: {
        title,
        slug,
        content,
        labels: labels || [],
        status: status || "PUBLISHED",
        category: category || (labels && labels.length > 0 ? labels[0] : "Berita"), // Wajib diisi agar tidak error missing category
        publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
      } as any,
    });

    return NextResponse.json(newNews, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Gagal membuat berita" }, { status: 500 });
  }
}