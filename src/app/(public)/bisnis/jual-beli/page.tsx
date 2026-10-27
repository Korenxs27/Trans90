import { db } from "@/lib/db";
import Link from "next/link";

interface PageProps {
  searchParams: Promise<{ q?: string; category?: string }>;
}

export default async function KatalogJualBeliPage({ searchParams }: PageProps) {
  const { q, category } = await searchParams;

  // Filter dinamis Prisma khusus tipe JUAL_BELI
  const whereClause: any = {
    type: "JUAL_BELI",
    status: "READY",
  };

  if (q) {
    whereClause.title = {
      contains: q,
      mode: "insensitive", // Pencarian tidak sensitif huruf besar/kecil
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
      {/* HEADER SECTION */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <span className="text-xs font-bold text-[#1F9D55] uppercase tracking-wider">
            Katalog Jual Beli
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2A5B] mt-1">
            Kendaraan Dijual Siap Pakai
          </h1>
          {q ? (
            <p className="text-xs text-slate-500 mt-1">
              Menampilkan hasil pencarian untuk: <span className="font-bold text-[#1E4FA3]">"{q}"</span>
            </p>
          ) : (
            <p className="text-xs sm:text-sm text-[#586678] mt-1">
              Pilihan mobil & motor bekas terawat dengan kelengkapan surat terjamin.
            </p>
          )}
        </div>
      </div>

      {/* KATALOG GRID */}
      {vehicles.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
          <p className="text-sm font-bold text-slate-700">Unit kendaraan tidak ditemukan</p>
          <p className="text-xs text-slate-400 mt-1">Coba gunakan kata kunci pencarian atau filter kategori lain.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="h-48 bg-slate-100 overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 text-[10px] font-bold uppercase bg-white/90 backdrop-blur-sm text-[#0B2A5B] px-2.5 py-1 rounded-md border border-slate-200 shadow-sm">
                    {item.category} • {item.subCategory || "Bekas Mulus"}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[11px] font-semibold text-slate-500">
                      Tahun {item.year || "-"}
                    </span>
                    <span className="text-xs font-bold text-slate-600">
                      {item.mileage || "Low KM"}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {item.transmission || "Automatic"} • {item.fuel || "Bensin"}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between mt-4">
                <div>
                  <span className="text-[10px] text-slate-400">Harga Cash</span>
                  <p className="text-base font-extrabold text-[#0B2A5B]">
                    Rp {Number(item.price).toLocaleString("id-ID")}
                  </p>
                </div>
                <Link
                  href={`/bisnis/jual-beli/${item.slug}`}
                  className="bg-[#0B2A5B] hover:bg-[#1E4FA3] text-white text-xs font-bold px-4 py-2 rounded-lg transition"
                >
                  Detail Unit
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}