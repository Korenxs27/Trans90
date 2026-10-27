import "dotenv/config"; // <-- WAJIB: Supaya pasti baca .env lokal kamu!
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Memulai seeding data awal...");

  const adminEmail = process.env.ADMIN_EMAIL || "trans90@gmail.com";
  const rawPassword = process.env.ADMIN_PASSWORD || "Trans902026";

  // Hash Password
  const hashedPassword = await bcrypt.hash(rawPassword, 10);

  // Upsert Super Admin (Update password jika email sudah ada)
  const admin = await prisma.user.upsert({
    where: { 
      email: adminEmail 
    },
    update: {
      password: hashedPassword,
    },
    create: {
      email: adminEmail,
      password: hashedPassword,
      role: "ADMIN",
      name: "Admin Trans 90",
    },
  });

  console.log("User Super Admin berhasil di-seed/update:", admin.email);

  // 2. Seed Chart of Accounts (COA) Akuntansi
  const coaData = [
    { code: "101.01", name: "Kas Utama", type: "ASSET" },
    { code: "101.02", name: "Bank BCA Operasional", type: "ASSET" },
    { code: "102.00", name: "Piutang Usaha", type: "ASSET" },
    { code: "103.00", name: "Persediaan Kendaraan (Jual Beli)", type: "ASSET" },
    { code: "104.00", name: "Aset Tetap - Armada Sewa", type: "ASSET" },
    { code: "201.00", name: "Hutang Usaha", type: "LIABILITY" },
    { code: "301.00", name: "Modal Pemilik", type: "EQUITY" },
    { code: "401.00", name: "Pendapatan Sewa Kendaraan", type: "REVENUE" },
    { code: "402.00", name: "Pendapatan Penjualan Kendaraan", type: "REVENUE" },
    { code: "501.00", name: "Beban Perbaikan & Servis", type: "EXPENSE" },
    { code: "502.00", name: "Beban Bahan Bakar & Tol", type: "EXPENSE" },
  ];

  for (const item of coaData) {
    await prisma.chartOfAccount.upsert({
      where: { code: item.code },
      update: {},
      create: {
        code: item.code,
        name: item.name,
        type: item.type as any,
      },
    });
  }

  // 3. Seed Data Kendaraan Contoh
  const vehicleData = [
    {
      title: "Toyota Innova Zenix 2.0 HV 2023",
      slug: "toyota-innova-zenix-2023",
      type: "SEWA" as any,
      category: "MOBIL" as any,
      subCategory: "MPV Hybrid",
      image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341",
      images: ["https://images.unsplash.com/photo-1549399542-7e3f8b79c341"],
      status: "READY" as any,
      transmission: "Automatic",
      fuel: "Hybrid",
      seats: 7,
      year: "2023",
      plateNumber: "B 1234 ABC",
      price: 850000,
      priceUnit: "/hari",
      description: "Unit nyaman, irit bahan bakar, cocok untuk operasional.",
    },
  ];

  for (const v of vehicleData) {
    await prisma.vehicle.upsert({
      where: { slug: v.slug },
      update: {},
      create: v,
    });
  }

  console.log("Seeding selesai dengan sukses!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Error saat seeding:", e);
    await prisma.$disconnect();
    process.exit(1);
  });