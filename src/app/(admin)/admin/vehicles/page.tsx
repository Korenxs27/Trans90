import Image from "next/image";
import Link from "next/link";
import { Plus, Search, Filter } from "lucide-react";
import { db } from "@/lib/db";
import { formatRupiah } from "@/lib/utils";

export default async function AdminVehiclesPage() {
  const vehicles = await db.vehicle.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header Page */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Manajemen Kendaraan
          </h1>
          <p className="text-sm text-slate-500">
            Kelola unit armada sewa dan stok unit jual beli AutoCorp.
          </p>
        </div>
        <Link
          href="/admin/vehicles/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 hover:bg-blue-700 transition"
        >
          <Plus className="h-4 w-4" />
          Tambah Kendaraan
        </Link>
      </div>

      {/* Filter & Table Container - Clean White */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {/* Table Controls */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-3 justify-between items-center bg-slate-50/50">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama atau plat nomor..."
              className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 transition shadow-sm">
              <Filter className="h-3.5 w-3.5 text-slate-500" /> Filter Tipe
            </button>
          </div>
        </div>

        {/* Vehicle Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="border-b border-slate-100 bg-slate-50/80 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-4">Unit</th>
                <th className="px-6 py-4">Tipe / Kategori</th>
                <th className="px-6 py-4">Harga</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Plat Nomor</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {vehicles.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-400 text-xs">
                    Belum ada data kendaraan.
                  </td>
                </tr>
              ) : (
                vehicles.map((item: any) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-16 overflow-hidden rounded-lg border border-slate-200 bg-slate-100 shrink-0">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{item.title}</div>
                          <div className="text-xs text-slate-400">
                            {item.subCategory || "Unit"} • {item.year || "-"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-medium text-slate-800">{item.type}</span>
                        <span className="text-xs text-slate-400">
                          {item.category} ({item.subCategory || "-"})
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-900">
                      {formatRupiah(Number(item.price))}
                      <span className="text-xs font-normal text-slate-400">
                        {" "}
                        {item.priceUnit || ""}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          item.status === "READY"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : item.status === "TERSEWA"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-red-50 text-red-700 border border-red-200"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-500">
                      {item.plateNumber || "-"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/admin/vehicles/${item.id}`}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition"
                      >
                        Detail & Edit
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}