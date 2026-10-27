import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET ALL ORDERS / RENTALS
export async function GET() {
  try {
    const orders = await db.rentalOrder.findMany({
      include: {
        vehicle: true, // Sertakan data kendaraan jika ada relasinya
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(orders, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error: any) {
    console.error("GET Orders Error:", error);
    // Jika data masih kosong atau belum ada record, kembalikan array kosong
    return NextResponse.json([]);
  }
}

// POST / CREATE ORDER
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newOrder = await db.rentalOrder.create({
      data: { ...body },
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error: any) {
    console.error("POST Order Error:", error);
    return NextResponse.json(
      { message: error.message || "Gagal membuat order" },
      { status: 500 }
    );
  }
}