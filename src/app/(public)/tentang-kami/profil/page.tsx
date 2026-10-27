import Link from "next/link";
import {
  Building2,
  ShieldCheck,
  Award,
  Users,
  CheckCircle2,
  ArrowRight,
  Car,
  Clock,
  PhoneCall,
} from "lucide-react";

export default function ProfilPage() {
  return (
    <div className="bg-[#F8FAFC] text-[#1A2233] min-h-screen pt-30 pb-16 antialiased">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* 1. HEADER TITLE */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h1 className="text-3xl sm:text-5xl font-black text-[#0B2A5B] tracking-tight">
            Profil Perusahaan
          </h1>
        </div>

        {/* 2. CARD UTAMA: SLOTS FOTO GEDUNG & RINGKASAN PERUSAHAAN */}
        <div className="bg-white rounded-2xl border border-[#E3E8EF] p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Slot Foto Utama Gedung / HQ Kantor */}
            <div className="lg:col-span-7 rounded-xl overflow-hidden border border-slate-100 shadow-sm h-[300px] sm:h-[380px] relative group">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
                alt="Kantor Pusat AutoCorp"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold">Kantor Pusat AutoCorp Indonesia</p>
                  <p className="text-[11px] text-slate-300">Jakarta Selatan, DKI Jakarta</p>
                </div>
                <span className="text-[10px] bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-md border border-white/20 font-semibold">
                  HQ Operational
                </span>
              </div>
            </div>

            {/* Deskripsi Detail Profil */}
            <div className="lg:col-span-5 space-y-4">
              <div>
                <span className="text-[11px] font-bold text-[#1E4FA3] uppercase tracking-wider">
                  Pengenalan Entitas
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B2A5B] mt-1">
                  Komitmen Layanan Otomotif Berstandar Tinggi
                </h2>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-[#586678] leading-relaxed">
                <p>
                  <strong className="text-slate-900">AutoCorp</strong> didirikan dengan dedikasi penuh untuk menghadirkan kemudahan aksesibilitas transportasi di Indonesia, baik untuk perjalanan pribadi, operasional bisnis, maupun kepemilikan unit bekas terawat.
                </p>
                <p>
                  Setiap unit yang tersedia di garasi kami wajib melalui <strong className="text-[#0B2A5B]">150+ titik inspeksi menyeluruh</strong>—mulai dari performa mesin, sistem pengereman, kelistrikan, hingga keabsahan dokumen legalitas (BPKB & STNK).
                </p>
              </div>

              {/* Checklist Keunggulan Ringkas */}
              <div className="pt-2 border-t border-slate-100 space-y-2 text-xs text-slate-700 font-semibold">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Jaminan Kendaraan Bebas Banjir & Bebas Tabrakan Besar</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Layanan Darurat Roadside Assistance 24 Jam</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. QUICK STATS DENGAN ICON LEBIH KEREN */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="bg-white p-5 rounded-2xl border border-[#E3E8EF] shadow-sm">
            <div className="h-9 w-9 mx-auto bg-blue-50 rounded-xl text-[#1E4FA3] flex items-center justify-center mb-2">
              <Car className="h-5 w-5" />
            </div>
            <p className="text-2xl font-black text-[#0B2A5B]">500+</p>
            <p className="text-xs font-semibold text-[#586678] mt-0.5">Armada Siap Pakai</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E3E8EF] shadow-sm">
            <div className="h-9 w-9 mx-auto bg-blue-50 rounded-xl text-[#1E4FA3] flex items-center justify-center mb-2">
              <Users className="h-5 w-5" />
            </div>
            <p className="text-2xl font-black text-[#0B2A5B]">12.000+</p>
            <p className="text-xs font-semibold text-[#586678] mt-0.5">Pelanggan Puas</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E3E8EF] shadow-sm">
            <div className="h-9 w-9 mx-auto bg-blue-50 rounded-xl text-[#1E4FA3] flex items-center justify-center mb-2">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <p className="text-2xl font-black text-[#0B2A5B]">100%</p>
            <p className="text-xs font-semibold text-[#586678] mt-0.5">Kelengkapan Surat</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#E3E8EF] shadow-sm">
            <div className="h-9 w-9 mx-auto bg-blue-50 rounded-xl text-[#1E4FA3] flex items-center justify-center mb-2">
              <Clock className="h-5 w-5" />
            </div>
            <p className="text-2xl font-black text-[#0B2A5B]">24/7</p>
            <p className="text-xs font-semibold text-[#586678] mt-0.5">Bantuan Customer Care</p>
          </div>
        </div>

        {/* 4. PILAR UTAMA LAYANAN PERUSAHAAN */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-[#E3E8EF] p-6 shadow-sm space-y-3">
            <div className="h-10 w-10 bg-blue-50 text-[#1E4FA3] rounded-xl flex items-center justify-center font-bold">
              <Car className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-[#0B2A5B]">Divisi Rental & Mobilisasi</h3>
            <p className="text-xs text-[#586678] leading-relaxed">
              Melayani penyewaan lepas kunci maupun dengan driver untuk persewaan harian, mingguan, hingga kontrak jangka panjang armada bisnis perusahaan.
            </p>
            <Link
              href="/bisnis/sewa"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E4FA3] hover:underline pt-2"
            >
              <span>Lihat Katalog Rental</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-[#E3E8EF] p-6 shadow-sm space-y-3">
            <div className="h-10 w-10 bg-blue-50 text-[#1E4FA3] rounded-xl flex items-center justify-center font-bold">
              <Award className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-[#0B2A5B]">Divisi Jual Beli Terinspeksi</h3>
            <p className="text-xs text-[#586678] leading-relaxed">
              Menyediakan pilihan mobil & motor bekas berkualitas dengan riwayat servis transparan, jaminan dokumen asli, serta kemudahan proses balik nama.
            </p>
            <Link
              href="/bisnis/jual-beli"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E4FA3] hover:underline pt-2"
            >
              <span>Lihat Katalog Jual Beli</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* 5. BANNER CALL TO ACTION */}
        <div className="rounded-2xl bg-[#0B2A5B] text-white p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-lg">
          <div className="space-y-1 max-w-xl">
            <h3 className="text-lg sm:text-2xl font-black">Butuh Konsultasi Sewa atau Pembelian?</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Tim customer service kami siap membantu memilihkan armada yang paling pas dengan anggaran Anda.
            </p>
          </div>
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-white text-[#0B2A5B] hover:bg-slate-100 text-xs font-bold px-6 py-3.5 rounded-xl shadow-md transition shrink-0"
          >
            <PhoneCall className="h-4 w-4" />
            <span>Hubungi Kami via WA</span>
          </a>
        </div>
      </div>
    </div>
  );
}