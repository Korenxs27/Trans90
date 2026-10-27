import { db } from "@/lib/db";
import Link from "next/link";

interface PageProps {
  searchParams: Promise<{ q?: string; category?: string }>;
}

export default async function KatalogSewaPage({ searchParams }: PageProps) {
  const { q, category } = await searchParams;

  // Filter dinamis Prisma berdasarkan input dari HeroSearch
  const whereClause: any = {
    type: "SEWA",
    status: "READY",
  };

  if (q) {
    whereClause.title = {
      contains: q,
      mode: "insensitive", // Biar search tidak bedain huruf kapital/kecil
    };
  }

  if (category && category !== "SEMUA") {
    whereClause.category = category; // MOBIL / MOTOR
  }

  const vehicles = await db.vehicle.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-30 pb-16 px-4 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2A5B]">
          Katalog Kendaraan Sewa
        </h1>
        {q && (
          <p className="text-xs text-slate-500 mt-1">
            Menampilkan hasil pencarian untuk: <span className="font-bold text-[#1E4FA3]">"{q}"</span>
          </p>
        )}
      </div>

      {vehicles.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
          <p className="text-sm font-bold text-slate-700">Unit kendaraan tidak ditemukan</p>
          <p className="text-xs text-slate-400 mt-1">Coba gunakan kata kunci pencarian atau kategori lain.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((item) => (
            <div key={item.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between">
              <div>
                <img src={item.image} alt={item.title} className="h-48 w-full object-cover" />
                <div className="p-5">
                  <span className="text-[10px] font-bold uppercase bg-blue-50 text-[#1E4FA3] px-2 py-0.5 rounded border border-blue-100">
                    {item.category} • {item.subCategory || "Unit"}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-2">{item.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{item.transmission} • {item.fuel}</p>
                </div>
              </div>
              <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between mt-4">
                <div>
                  <span className="text-[10px] text-slate-400">Harga Sewa</span>
                  <p className="text-base font-extrabold text-[#0B2A5B]">
                    Rp {Number(item.price).toLocaleString("id-ID")}<span className="text-xs font-normal text-slate-500">{item.priceUnit || "/hari"}</span>
                  </p>
                </div>
                <Link href={`/bisnis/sewa/${item.slug}`} className="bg-[#0B2A5B] text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-[#1E4FA3] transition">
                  Detail
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}