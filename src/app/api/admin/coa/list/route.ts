import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const accounts = await prisma.chartOfAccount.findMany({
      where: {
        isHeader: false, // Hanya ambil akun detail yang bisa diposting transaksi
      },
      select: {
        id: true,
        code: true,
        name: true,
        type: true,
      },
      orderBy: { code: "asc" },
    });

    return NextResponse.json({ accounts }, { status: 200 });
  } catch (error: any) {
    console.error("GET COA List Error:", error);
    return NextResponse.json(
      { message: "Gagal mengambil daftar akun COA", error: error.message },
      { status: 500 }
    );
  }
}