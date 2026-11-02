import Link from "next/link";
import {
  ShieldCheck,
  Award,
  Users,
  CheckCircle2,
  ArrowRight,
  Car,
  Clock,
  PhoneCall,
  Building2,
} from "lucide-react";

export default function ProfilPage() {
  return (
    <div className="bg-white text-[#1A2233] min-h-screen pt-28 pb-20 antialiased font-sans">
      
      {/* 1. HERO TITLE & INTRO SECTION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-100 pb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold text-[#1E4FA3] uppercase tracking-widest block">
              Pengenalan Entitas
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-[#0B2A5B] tracking-tight leading-none">
              Profil Perusahaan
            </h1>
            <p className="text-sm sm:text-base text-slate-500 font-medium pt-1">
              Komitmen Layanan Otomotif Berstandar Tinggi di Indonesia.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <Building2 className="h-4 w-4 text-[#1E4FA3]" />
            <span>HQ Operational — Jakarta Selatan</span>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 py-12">
        
        {/* 2. OVERVIEW PERUSAHAAN (FOTO BANNER UTAMA + NARASI EDITORIAL) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Foto Gedung */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-slate-200 shadow-md h-[320px] sm:h-[420px] relative group">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
              alt="Kantor Pusat Trans90"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-5 left-6 right-6 text-white flex items-end justify-between">
              <div>
                <p className="text-sm font-bold tracking-wide">Kantor Pusat Trans90 Indonesia</p>
                <p className="text-xs text-slate-300 font-medium">Jakarta Selatan, DKI Jakarta</p>
              </div>
              <span className="text-[11px] bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30 font-semibold tracking-wide">
                HQ Operational
              </span>
            </div>
          </div>

          {/* Narasi Pengenalan */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-2xl font-extrabold text-[#0B2A5B] leading-snug">
              Dedikasi Penuh untuk Aksesibilitas Transportasi Berkelas
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-[#586678] leading-relaxed">
              <p>
                <strong className="text-slate-900 font-semibold">Trans90</strong> didirikan dengan dedikasi penuh untuk menghadirkan kemudahan aksesibilitas transportasi di Indonesia, baik untuk perjalanan pribadi, operasional bisnis, maupun kepemilikan unit bekas terawat.
              </p>
              <p>
                Setiap unit yang tersedia di garasi kami wajib melalui <strong className="text-[#0B2A5B] font-bold">150+ titik inspeksi menyeluruh</strong>—mulai dari performa mesin, sistem pengereman, kelistrikan, hingga keabsahan dokumen legalitas (BPKB & STNK).
              </p>
            </div>

            {/* Point Keunggulan Ringkas */}
            <div className="pt-4 border-t border-slate-200 space-y-2.5 text-xs text-slate-800 font-semibold">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Jaminan Kendaraan Bebas Banjir & Bebas Tabrakan Besar</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Layanan Darurat Roadside Assistance 24 Jam</span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. STATISTIK PERUSAHAAN (BORDER DIVIDER ROW) */}
        <section className="py-8 border-y border-slate-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x divide-slate-200">
            
            <div className="space-y-1 text-center md:text-left md:px-4 first:pl-0">
              <div className="flex items-center justify-center md:justify-start gap-2 text-[#1E4FA3]">
                <Car className="h-5 w-5" />
                <span className="text-2xl font-black text-[#0B2A5B]">500+</span>
              </div>
              <p className="text-xs font-bold text-slate-700">Armada Siap Pakai</p>
            </div>

            <div className="space-y-1 text-center md:text-left md:px-4">
              <div className="flex items-center justify-center md:justify-start gap-2 text-[#1E4FA3]">
                <Users className="h-5 w-5" />
                <span className="text-2xl font-black text-[#0B2A5B]">12.000+</span>
              </div>
              <p className="text-xs font-bold text-slate-700">Pelanggan Puas</p>
            </div>

            <div className="space-y-1 text-center md:text-left md:px-4">
              <div className="flex items-center justify-center md:justify-start gap-2 text-[#1E4FA3]">
                <ShieldCheck className="h-5 w-5" />
                <span className="text-2xl font-black text-[#0B2A5B]">100%</span>
              </div>
              <p className="text-xs font-bold text-slate-700">Kelengkapan Surat</p>
            </div>

            <div className="space-y-1 text-center md:text-left md:px-4">
              <div className="flex items-center justify-center md:justify-start gap-2 text-[#1E4FA3]">
                <Clock className="h-5 w-5" />
                <span className="text-2xl font-black text-[#0B2A5B]">24/7</span>
              </div>
              <p className="text-xs font-bold text-slate-700">Bantuan Customer Care</p>
            </div>

          </div>
        </section>

        {/* 4. LAYANAN PERUSAHAAN (FLAT MINIMALIST LAYOUT) */}
        <section className="space-y-8">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#1E4FA3] uppercase tracking-wider block">
              Pilar Utama Bisnis
            </span>
            <h2 className="text-2xl font-extrabold text-[#0B2A5B]">
              Layanan Utama Trans90
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Divisi Rental */}
            <div className="space-y-3 pb-6 border-b md:border-b-0 border-slate-200">
              <div className="flex items-center gap-2.5 text-[#1E4FA3]">
                <Car className="h-5 w-5" />
                <h3 className="text-lg font-bold text-[#0B2A5B]">Divisi Rental & Mobilisasi</h3>
              </div>
              <p className="text-xs sm:text-sm text-[#586678] leading-relaxed">
                Melayani penyewaan lepas kunci maupun dengan driver untuk persewaan harian, mingguan, hingga kontrak jangka panjang armada bisnis perusahaan.
              </p>
              <Link
                href="/bisnis/sewa"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#1E4FA3] hover:text-[#0B2A5B] transition pt-1"
              >
                <span>Lihat Katalog Rental</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Divisi Jual Beli */}
            <div className="space-y-3 pb-6 border-b md:border-b-0 border-slate-200">
              <div className="flex items-center gap-2.5 text-[#1E4FA3]">
                <Award className="h-5 w-5" />
                <h3 className="text-lg font-bold text-[#0B2A5B]">Divisi Jual Beli Terinspeksi</h3>
              </div>
              <p className="text-xs sm:text-sm text-[#586678] leading-relaxed">
                Menyediakan pilihan mobil & motor bekas berkualitas dengan riwayat servis transparan, jaminan dokumen asli, serta kemudahan proses balik nama.
              </p>
              <Link
                href="/bisnis/jual-beli"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#1E4FA3] hover:text-[#0B2A5B] transition pt-1"
              >
                <span>Lihat Katalog Jual Beli</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* 5. BANNER CALL TO ACTION */}
        <section className="rounded-2xl bg-[#0B2A5B] text-white p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
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
        </section>

      </div>
    </div>
  );
}