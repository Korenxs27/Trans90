import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShieldCheck, PhoneCall, Calendar, Gauge, Fuel, Cog } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function DetailJualBeliPage({ params }: PageProps) {
  const { slug } = await params;

  // Fetch detail kendaraan dari Prisma berdasarkan slug
  const vehicle = await db.vehicle.findUnique({
    where: { slug, type: "JUAL_BELI" },
  });

  if (!vehicle) {
    notFound();
  }

  // Format Pesan WhatsApp untuk Negosiasi / Pembelian
  const waNumber = "6281234567890"; // Ganti dengan nomor WhatsApp admin sales
  const waMessage = encodeURIComponent(
    `Halo Admin AutoCorp, saya tertarik dengan unit kendaraan dijual:\n\n*${vehicle.title}*\nHarga: Rp ${Number(vehicle.price).toLocaleString("id-ID")}\nLink: https://autocorp.id/bisnis/jual-beli/${vehicle.slug}\n\nApakah unit ini masih ready? Mohon info selengkapnya.`
  );
  const waLink = `https://wa.me/${waNumber}?text=${waMessage}`;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-30 pb-16 px-4 max-w-7xl mx-auto">
      {/* BREADCRUMB / BACK BUTTON */}
      <div className="mb-6">
        <Link
          href="/bisnis/jual-beli"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#0B2A5B] transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Katalog Jual Beli
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* KIRI: GALERI GAMBAR & SPESIFIKASI */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Image */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <img
              src={vehicle.image}
              alt={vehicle.title}
              className="w-full h-[360px] sm:h-[420px] object-cover"
            />
          </div>

          {/* Additional Gallery Images */}
          {vehicle.images && vehicle.images.length > 0 && (
            <div className="grid grid-cols-4 gap-3">
              {vehicle.images.map((img, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-slate-200 overflow-hidden h-20">
                  <img src={img} alt={`Galeri ${idx + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}

          {/* Detail Deskripsi */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
            <h2 className="text-sm font-bold text-[#0B2A5B] uppercase tracking-wider border-b border-slate-100 pb-3">
              Deskripsi & Kondisi Unit
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
              {vehicle.description || "Kondisi unit sangat terawat, bodi mulus, mesin kering halus, interior bersih tidak bau rokok, kelistrikan dan fitur berfungsi normal 100%. Bebas banjir & tabrakan."}
            </p>
          </div>
        </div>

        {/* KANAN: RINGKASAN HARGA & AKSEN PEMBELIAN */}
        <div className="lg:col-span-5 space-y-6 sticky top-24">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-md space-y-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-[#1E4FA3] px-2.5 py-1 rounded-md border border-blue-100">
                {vehicle.category} • {vehicle.subCategory || "Bekas Mulus"}
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-3">
                {vehicle.title}
              </h1>
              <p className="text-xs text-slate-400 mt-1">Plat Nomor Rahasia Admin • Siap Balik Nama</p>
            </div>

            {/* HARGA CASH */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-500 font-semibold">Harga Cash Nett/Nego</span>
              <p className="text-2xl font-extrabold text-[#0B2A5B] mt-0.5">
                Rp {Number(vehicle.price).toLocaleString("id-ID")}
              </p>
            </div>

            {/* GRID SPESIFIKASI UTAMA */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center gap-2.5">
                <Calendar className="h-4 w-4 text-[#1E4FA3]" />
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold">Tahun</p>
                  <p className="text-xs font-bold text-slate-800">{vehicle.year || "-"}</p>
                </div>
              </div>

              <div className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center gap-2.5">
                <Gauge className="h-4 w-4 text-[#1E4FA3]" />
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold">Kilometer</p>
                  <p className="text-xs font-bold text-slate-800">{vehicle.mileage || "Low KM"}</p>
                </div>
              </div>

              <div className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center gap-2.5">
                <Cog className="h-4 w-4 text-[#1E4FA3]" />
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold">Transmisi</p>
                  <p className="text-xs font-bold text-slate-800">{vehicle.transmission || "Automatic"}</p>
                </div>
              </div>

              <div className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center gap-2.5">
                <Fuel className="h-4 w-4 text-[#1E4FA3]" />
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold">Bahan Bakar</p>
                  <p className="text-xs font-bold text-slate-800">{vehicle.fuel || "Bensin"}</p>
                </div>
              </div>
            </div>

            {/* KEUNGGULAN JUAL BELI */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Dokumen BPKB, STNK & Faktur Lengkap</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                <ShieldCheck className="h-4 w-4 text-blue-600 shrink-0" />
                <span>Bebas Lolos Inspeksi Bebas Banjir / Tabrakan</span>
              </div>
            </div>

            {/* TOMBOL REDIRECT KE WHATSAPP */}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#0B2A5B] hover:bg-[#1E4FA3] text-white py-3.5 px-5 text-xs font-bold shadow-md shadow-[#0B2A5B]/20 transition active:scale-95"
            >
              <PhoneCall className="h-4 w-4" />
              <span>Hubungi Sales & Negosiasi via WA</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}