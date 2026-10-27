import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Memulai seeding data awal...");

  // 1. Seed User Super Admin
  const admin = await prisma.user.upsert({
    where: { email: "admin@autocorp.id" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@autocorp.id",
      password: "adminpassword123", // Jangan lupa hashing bcrypt di production
      role: "Admin" as any,
    },
  });
  console.log(`Admin dibuat: ${admin.email}`);

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
  console.log("Chart of Accounts (COA) berhasil di-seed!");

  // 3. Seed Data Kendaraan Contoh (Sewa & Jual Beli)
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
      description: "Unit nyaman, sangat irit bahan bakar, cocok untuk keluarga dan perjalanan operasional.",
    },
    {
      title: "Honda HR-V 1.5 SE CVT 2022",
      slug: "honda-hrv-se-2022",
      type: "JUAL_BELI" as any,
      category: "MOBIL" as any,
      subCategory: "SUV Compact",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d",
      images: ["https://images.unsplash.com/photo-1552519507-da3b142c6e3d"],
      status: "READY" as any,
      transmission: "Automatic",
      fuel: "Bensin",
      seats: 5,
      mileage: "24.000 KM",
      year: "2022",
      plateNumber: "B 5678 XYZ",
      price: 345000000,
      priceUnit: null,
      description: "Kondisiistimewa, servis rutin bengkel resmi, bebas dari kecelakaan dan banjir.",
    },
  ];

  for (const v of vehicleData) {
    await prisma.vehicle.upsert({
      where: { slug: v.slug },
      update: {},
      create: v,
    });
  }

  console.log("Kendaraan contoh berhasil ditambahkan!");
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