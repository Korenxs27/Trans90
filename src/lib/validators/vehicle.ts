import { z } from "zod";

export const vehicleSchema = z.object({
  title: z.string().min(3, "Judul minimal 3 karakter"),
  slug: z.string().min(3, "Slug minimal 3 karakter"),
  type: z.enum(["SEWA", "JUAL_BELI"]),
  category: z.enum(["MOBIL", "MOTOR"]),
  subCategory: z.string().optional(),
  image: z.string().url("URL gambar tidak valid"),
  images: z.array(z.string().url()).min(1, "Minimal 1 foto pendukung"),
  status: z.enum(["READY", "TERSEWA", "SOLD", "MAINTENANCE"]).default("READY"),
  transmission: z.string().optional(),
  fuel: z.string().optional(),
  seats: z.number().nullable().optional(),
  mileage: z.string().optional(),
  year: z.string().optional(),
  plateNumber: z.string().optional(),
  price: z.number().positive("Harga harus lebih dari 0"),
  priceUnit: z.string().nullable().optional(),
  description: z.string().optional(),
});

export type VehicleInput = z.infer<typeof vehicleSchema>;