import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import OrderDetailClient from "./OrderDetailClient";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const order = await db.rentalOrder.findUnique({
    where: { id },
    include: { vehicle: true },
  });

  if (!order) {
    notFound();
  }

  // Cast ke 'any' agar TypeScript tidak komplain soal tipe Decimal dari Prisma
  const orderData = order as any;

  const formattedOrder = {
    ...orderData,
    totalPrice: Number(orderData?.totalPrice || orderData?.price || 0),
    vehicle: orderData?.vehicle
      ? {
          ...orderData.vehicle,
          price: Number(orderData.vehicle.price || 0),
        }
      : null,
  };

  return <OrderDetailClient order={formattedOrder} />;
}