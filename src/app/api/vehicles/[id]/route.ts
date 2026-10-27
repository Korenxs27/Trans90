import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

// GET: Ambil Detail Kendaraan Berdasarkan ID atau Slug
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID atau Slug tidak valid" },
        { status: 400 }
      );
    }

    // Cari di Prisma berdasarkan ID ATAU Slug
    const vehicle = await db.vehicle.findFirst({
      where: {
        OR: [
          { id: id },
          { slug: id }
        ]
      }
    });

    if (!vehicle) {
      return NextResponse.json(
        { success: false, message: "Unit kendaraan tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(vehicle);
  } catch (error: any) {
    console.error("Error fetch vehicle detail:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Gagal mengambil detail kendaraan" },
      { status: 500 }
    );
  }
}

// PUT: Update Kendaraan
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const updatedVehicle = await db.vehicle.update({
      where: { id },
      data: {
        title: body.title,
        slug: body.slug,
        type: body.type,
        category: body.category,
        subCategory: body.subCategory || null,
        image: body.image,
        images: body.images && body.images.length > 0 ? body.images : [body.image],
        status: body.status,
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

    return NextResponse.json({ success: true, data: updatedVehicle });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Gagal mengupdate kendaraan" },
      { status: 500 }
    );
  }
}

// DELETE: Hapus Kendaraan
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Cek apakah ada riwayat order terikat dengan unit ini
    const relatedOrders = await db.rentalOrder.count({
      where: { vehicleId: id },
    });

    if (relatedOrders > 0) {
      return NextResponse.json(
        {
          success: false,
          message: `Unit tidak bisa dihapus karena memiliki ${relatedOrders} riwayat pesanan sewa. Silakan ubah status unit menjadi MAINTENANCE atau SOLD.`,
        },
        { status: 400 }
      );
    }

    await db.vehicle.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Kendaraan berhasil dihapus" });
  } catch (error: any) {
    console.error("Error delete vehicle:", error);
    return NextResponse.json(
      { success: false, message: "Gagal menghapus kendaraan dari database" },
      { status: 500 }
    );
  }
}