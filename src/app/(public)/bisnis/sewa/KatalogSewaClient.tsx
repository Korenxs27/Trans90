"use client";

import { useState } from "react";
import VehicleCard from "@/components/public/VehicleCard";

interface VehicleItem {
  id: string;
  title: string;
  slug: string;
  type: string;
  category: string;
  subCategory?: string | null;
  image: string;
  images: string[];
  transmission?: string | null;
  fuel?: string | null;
  seats?: number | null;
  year?: string | null;
  price: number;
  priceUnit?: string | null;
  description?: string | null;
}

export default function KatalogSewaClient({
  initialVehicles,
}: {
  initialVehicles: VehicleItem[];
}) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("semua");
  const [transmission, setTransmission] = useState("semua");

  // Filtering data realtime dari database
  const filteredVehicles = initialVehicles.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "semua" ||
      item.category.toLowerCase() === category.toLowerCase();

    const matchesTransmission =
      transmission === "semua" ||
      (item.transmission &&
        item.transmission.toLowerCase() === transmission.toLowerCase());

    return matchesSearch && matchesCategory && matchesTransmission;
  });

  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-8">
          <span className="text-xs font-bold text-[#1E4FA3] uppercase tracking-wider">
            Layanan Rental
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0B2A5B] mt-1">
            Katalog Sewa Kendaraan
          </h1>
          <p className="text-xs sm:text-sm text-[#586678] mt-1">
            Pilihan armada mobil & motor harian, bulanan, atau kontrak korporasi dengan kondisi siap pakai.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-xl border border-[#E3E8EF] shadow-sm mb-8 grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-6">
            <label className="block text-[10px] font-bold uppercase text-[#586678] mb-1">
              Cari Nama Kendaraan
            </label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Ketik Innova, HR-V, Fortuner..."
              className="w-full bg-[#F8FAFC] border border-[#E3E8EF] rounded-lg px-3.5 py-2 text-xs text-[#1A2233] focus:outline-none focus:border-[#0B2A5B]"
            />
          </div>

          <div className="sm:col-span-3">
            <label className="block text-[10px] font-bold uppercase text-[#586678] mb-1">
              Jenis Kendaraan
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-[#F8FAFC] border border-[#E3E8EF] rounded-lg px-3 py-2 text-xs text-[#1A2233] focus:outline-none focus:border-[#0B2A5B]"
            >
              <option value="semua">Semua Jenis</option>
              <option value="mobil">Mobil</option>
              <option value="motor">Motor</option>
            </select>
          </div>

          <div className="sm:col-span-3">
            <label className="block text-[10px] font-bold uppercase text-[#586678] mb-1">
              Transmisi
            </label>
            <select
              value={transmission}
              onChange={(e) => setTransmission(e.target.value)}
              className="w-full bg-[#F8FAFC] border border-[#E3E8EF] rounded-lg px-3 py-2 text-xs text-[#1A2233] focus:outline-none focus:border-[#0B2A5B]"
            >
              <option value="semua">Semua Transmisi</option>
              <option value="automatic">Automatic</option>
              <option value="manual">Manual</option>
            </select>
          </div>
        </div>

        {/* Grid Katalog Data Database */}
        {filteredVehicles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-12 text-center border border-[#E3E8EF]">
            <p className="text-sm font-bold text-[#1A2233]">Unit tidak ditemukan</p>
            <p className="text-xs text-[#586678] mt-1">
              Coba gunakan kata kunci atau opsi filter lainnya.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
