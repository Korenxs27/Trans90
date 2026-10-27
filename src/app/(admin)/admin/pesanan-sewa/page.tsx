"use client";

import { useState, useEffect } from "react";
import { Search, Eye, CheckCircle2, Clock, XCircle, RefreshCw } from "lucide-react";
import { formatRupiah } from "@/lib/utils";
import { toast } from "sonner";

export default function AdminPesananSewaPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/orders", { cache: "no-store" });
      if (!res.ok) throw new Error("Gagal mengambil data pesanan");
      const data = await res.json();
      if (Array.isArray(data)) {
        setOrders(data);
      }
    } catch (e: any) {
      toast.error(e.message || "Gagal memuat pesanan sewa");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(
    (item) =>
      item.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.bookingCode?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Manajemen Pesanan Sewa
          </h1>
          <p className="text-sm text-slate-500">
            Pantau operasional sewa, verifikasi berkas penyewa, dan kelola status order.
          </p>
        </div>
        <button
          onClick={fetchOrders}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition"
        >
          <RefreshCw className={`h-4 w-4 text-slate-500 ${loading ? "animate-spin" : ""}`} />
          Refresh Data
        </button>
      </div>

      {/* TABLE CONTAINER CLEAN LIGHT MODE */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {/* SEARCH BAR */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama penyewa atau kode booking..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* TABEL DATA */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="border-b border-slate-100 bg-slate-50/80 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-4">Penyewa</th>
                <th className="px-6 py-4">Unit Armada</th>
                <th className="px-6 py-4">Periode Sewa</th>
                <th className="px-6 py-4">Total Biaya</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-slate-400 text-xs">
                    Memuat data pesanan sewa...
                  </td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-slate-400 text-xs">
                    Belum ada pesanan sewa yang masuk.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900">{item.customerName}</div>
                      <div className="text-xs text-slate-400 font-mono">{item.bookingCode || item.id}</div>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-800">
                      {item.vehicle?.name || "Honda PCX 160"}
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-600">
                      {item.startDate ? new Date(item.startDate).toLocaleDateString("id-ID") : "-"} s/d{" "}
                      {item.endDate ? new Date(item.endDate).toLocaleDateString("id-ID") : "-"}
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-900">
                      {formatRupiah(item.totalPrice || 0)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 font-semibold text-xs px-2.5 py-1 rounded-full border ${
                          item.status === "CONFIRMED"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : item.status === "PENDING"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : "bg-rose-50 text-rose-700 border-rose-200"
                        }`}
                      >
                        {item.status === "CONFIRMED" && <CheckCircle2 className="h-3.5 w-3.5" />}
                        {item.status === "PENDING" && <Clock className="h-3.5 w-3.5" />}
                        {item.status === "CANCELLED" && <XCircle className="h-3.5 w-3.5" />}
                        {item.status || "PENDING"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => toast.info(`Detail pesanan: ${item.customerName}`)}
                        className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-blue-600 transition"
                        title="Lihat Detail Pesanan"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
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