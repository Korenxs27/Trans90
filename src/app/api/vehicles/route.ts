import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// POST: Tambah Kendaraan Baru
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const vehicle = await db.vehicle.create({
      data: {
        title: body.title,
        slug: body.slug,
        type: body.type, // "SEWA" | "JUAL_BELI"
        category: body.category, // "MOBIL" | "MOTOR"
        subCategory: body.subCategory || null,
        image: body.image,
        images: body.images && body.images.length > 0 ? body.images : [body.image],
        status: body.status || "READY",
        transmission: body.transmission || null,
        fuel: body.fuel || null,
        seats: body.seats ? Number(body.seats) : null,
        mileage: body.mileage || null,
        year: body.year || null,
        plateNumber: body.plateNumber || null,
        price: Number(body.price),
        priceUnit: body.priceUnit || null,
        description: body.description || null,
      },
    });

    return NextResponse.json({ success: true, data: vehicle }, { status: 201 });
  } catch (error: any) {
    console.error("Error create vehicle:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Gagal menambah kendaraan" },
      { status: 500 }
    );
  }
}