"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, XCircle, Clock, ShieldCheck, Car, User, Phone, Mail, MapPin } from "lucide-react";
import { toast } from "sonner";
import { formatRupiah } from "@/lib/utils";

export default function OrderDetailClient({ order }: { order: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(order.status);

  const handleUpdateStatus = async (newStatus: string) => {
    setLoading(true);

    try {
      const res = await fetch(`/api/orders/${order.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal memperbarui status pesanan");

      setCurrentStatus(newStatus);
      toast.success(`Status pesanan berhasil diubah menjadi ${newStatus}`);
      router.refresh();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/pesanan-sewa"
            className="p-2 rounded-xl border border-slate-800 bg-slate-900 text-slate-400 hover:text-white transition"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">Detail Pesanan Sewa</h1>
            <p className="text-xs text-slate-400">ID Pesanan: {order.id}</p>
          </div>
        </div>

        {/* Status Badge */}
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
            currentStatus === "PENDING"
              ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
              : currentStatus === "CONFIRMED" || currentStatus === "ACTIVE"
              ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
              : currentStatus === "COMPLETED"
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
              : "bg-red-500/10 text-red-400 border border-red-500/20"
          }`}
        >
          {currentStatus}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Info Pemesan & Unit (2 Col) */}
        <div className="md:col-span-2 space-y-6">
          {/* Data Pemesan */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center gap-2">
              <User className="h-4 w-4 text-blue-400" /> Informasi Penyewa
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-500 uppercase font-semibold block mb-0.5">Nama Lengkap</span>
                <span className="text-slate-200 font-medium text-sm">{order.customerName}</span>
              </div>
              <div>
                <span className="text-slate-500 uppercase font-semibold block mb-0.5">Nomor WhatsApp</span>
                <span className="text-slate-200 font-medium text-sm">{order.customerPhone}</span>
              </div>
              <div>
                <span className="text-slate-500 uppercase font-semibold block mb-0.5">Email</span>
                <span className="text-slate-200 font-medium">{order.customerEmail || "-"}</span>
              </div>
              <div>
                <span className="text-slate-500 uppercase font-semibold block mb-0.5">Nomor KTP / SIM</span>
                <span className="text-slate-200 font-mono font-medium">{order.customerNik || "-"}</span>
              </div>
            </div>
          </div>

          {/* Data Unit */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center gap-2">
              <Car className="h-4 w-4 text-blue-400" /> Informasi Unit Disewa
            </h2>
            {order.vehicle ? (
              <div className="flex items-center gap-4">
                <img
                  src={order.vehicle.image}
                  alt={order.vehicle.title}
                  className="h-20 w-28 rounded-xl object-cover border border-slate-800"
                />
                <div>
                  <h3 className="font-bold text-white text-base">{order.vehicle.title}</h3>
                  <p className="text-xs text-slate-400">{order.vehicle.category} • {order.vehicle.transmission}</p>
                  <p className="text-xs font-semibold text-blue-400 mt-1">
                    {formatRupiah(order.vehicle.price)} {order.vehicle.priceUnit}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500">Unit kendaraan sudah dihapus dari sistem.</p>
            )}
          </div>
        </div>

        {/* Panel Aksi Status Admin (1 Col) */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
              Rincian & Aksi Order
            </h2>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-800/50">
                <span className="text-slate-400">Total Biaya</span>
                <span className="font-bold text-white text-sm">{formatRupiah(order.totalPrice)}</span>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase block">Ubah Status Order:</span>
              <button
                disabled={loading}
                onClick={() => handleUpdateStatus("CONFIRMED")}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-blue-500 transition disabled:opacity-50"
              >
                <CheckCircle2 className="h-4 w-4" /> Setujui / Konfirmasi
              </button>
              <button
                disabled={loading}
                onClick={() => handleUpdateStatus("COMPLETED")}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-emerald-500 transition disabled:opacity-50"
              >
                <ShieldCheck className="h-4 w-4" /> Tandai Selesai
              </button>
              <button
                disabled={loading}
                onClick={() => handleUpdateStatus("CANCELLED")}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-2.5 text-xs font-semibold text-red-400 hover:bg-red-500/20 transition disabled:opacity-50"
              >
                <XCircle className="h-4 w-4" /> Batalkan Pesanan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}