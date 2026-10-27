import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Calendar,
  Fuel,
  Cog,
  Users,
  Car,
  FileText,
  MessageCircle,
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function DetailSewaPage({ params }: PageProps) {
  const { slug } = await params;

  // Fetch detail kendaraan dari Prisma berdasarkan slug
  const vehicle = await db.vehicle.findUnique({
    where: { slug, type: "SEWA" },
  });

  if (!vehicle) {
    notFound();
  }

  // Format Pesan WhatsApp untuk Pertanyaan / Booking Sewa
  const waNumber = "6281234567890"; // Ganti dengan nomor WhatsApp admin rental
  const waMessage = encodeURIComponent(
    `Halo Admin AutoCorp, saya ingin bertanya ketersediaan unit sewa:\n\n*${vehicle.title}*\nHarga: Rp ${Number(vehicle.price).toLocaleString("id-ID")}${vehicle.priceUnit || "/hari"}\nLink: https://autocorp.id/bisnis/sewa/${vehicle.slug}\n\nApakah unit ini ready untuk tanggal sewa dekat ini? Mohon info persyaratannya.`
  );
  const waLink = `https://wa.me/${waNumber}?text=${waMessage}`;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-30 pb-16 px-4 max-w-7xl mx-auto">
      {/* BREADCRUMB / BACK BUTTON */}
      <div className="mb-6">
        <Link
          href="/bisnis/sewa"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#0B2A5B] transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Katalog Sewa
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* KIRI: GALERI GAMBAR & DESKRIPSI SEWA */}
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
                  <img src={img} alt={`Galeri Sewa ${idx + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}

          {/* Deskripsi & Persyaratan Sewa */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
            <h2 className="text-sm font-bold text-[#0B2A5B] uppercase tracking-wider border-b border-slate-100 pb-3">
              Kondisi Unit & Informasi Layanan Sewa
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
              {vehicle.description ||
                "Unit kendaraan dalam kondisi bersih, harum, terawat, dan rutin melakukan servis berkala. Siap digunakan untuk perjalanan dalam maupun luar kota dengan opsi Lepas Kunci atau dengan Driver berpengalaman."}
            </p>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <h3 className="text-xs font-bold text-slate-800">Dokumen Persyaratan Sewa (Lepas Kunci):</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>KTP Asli / e-KTP Penanggung Jawab</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>SIM A (Mobil) / SIM C (Motor) Aktif</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Akun Media Sosial Aktif (Instagram/LinkedIn)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Deposit Jaminan (Dikembalikan setelah sewa)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* KANAN: PRICING & AKSI SEWA */}
        <div className="lg:col-span-5 space-y-6 sticky top-24">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-md space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-[#1E4FA3] px-2.5 py-1 rounded-md border border-blue-100">
                  {vehicle.category} • {vehicle.subCategory || "Rental Populer"}
                </span>
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  ● Unit Ready
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-3">
                {vehicle.title}
              </h1>
            </div>

            {/* HARGA SEWA */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-500 font-semibold">Tarif Sewa Mulai Dari</span>
              <p className="text-2xl font-extrabold text-[#0B2A5B] mt-0.5">
                Rp {Number(vehicle.price).toLocaleString("id-ID")}
                <span className="text-xs font-normal text-slate-500">
                  {vehicle.priceUnit || "/hari"}
                </span>
              </p>
            </div>

            {/* SPESIFIKASI KENDARAAN */}
            <div className="grid grid-cols-2 gap-3">
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

              <div className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center gap-2.5">
  <Users className="h-4 w-4 text-[#1E4FA3]" />
  <div>
    <p className="text-[10px] text-slate-400 font-semibold">Kapasitas</p>
    <p className="text-xs font-bold text-slate-800">
      {vehicle.category === "MOTOR"
        ? "2 Orang"
        : vehicle.seats
        ? `${vehicle.seats} Kursi`
        : "5 Kursi"}
    </p>
  </div>
</div>

              <div className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center gap-2.5">
                <Calendar className="h-4 w-4 text-[#1E4FA3]" />
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold">Tahun Unit</p>
                  <p className="text-xs font-bold text-slate-800">{vehicle.year || "Terbaru"}</p>
                </div>
              </div>
            </div>

            {/* JAMINAN LAYANAN */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                <ShieldCheck className="h-4 w-4 text-blue-600 shrink-0" />
                <span>Asuransi All-Risk & Layanan Darurat 24 Jam</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                <Car className="h-4 w-4 text-[#1E4FA3] shrink-0" />
                <span>Gratis Antar-Jemput Bandara / Stasiun (S&K Berlaku)</span>
              </div>
            </div>

            {/* TOMBOL AKSI SEWA & CONSULTATION */}
            <div className="space-y-2.5 pt-2">
              <Link
  href={`/bisnis/sewa/pengajuan?vehicleId=${vehicle.id}&slug=${vehicle.slug}`}
  className="bg-[#0B2A5B] hover:bg-[#1E4FA3] text-white text-xs font-bold px-5 py-3 rounded-xl transition"
>
  Sewa Sekarang
</Link>

              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 py-3 px-5 text-xs font-bold transition"
              >
                <MessageCircle className="h-4 w-4 text-emerald-600" />
                <span>Tanya Admin via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}