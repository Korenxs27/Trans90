import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET SINGLE ORDER BY ID
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const order = await db.rentalOrder.findUnique({
      where: { id },
      include: { vehicle: true },
    });

    if (!order) {
      return NextResponse.json(
        { message: "Order tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(order);
  } catch (error: any) {
    return NextResponse.json(
      { message: "Gagal memuat detail order" },
      { status: 500 }
    );
  }
}

// DELETE ORDER BY ID
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await db.rentalOrder.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Order berhasil dihapus" });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Gagal menghapus order" },
      { status: 500 }
    );
  }
}