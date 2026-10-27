import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import EditVehicleForm from "./EditVehicleForm";

export default async function EditVehiclePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Await params terlebih dahulu
  const { id } = await params;

  const vehicle = await db.vehicle.findUnique({
    where: { id },
  });

  if (!vehicle) {
    notFound();
  }

  const formattedVehicle = {
    ...vehicle,
    price: Number(vehicle.price),
  };

  return <EditVehicleForm vehicle={formattedVehicle} />;
}