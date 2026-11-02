import Link from "next/link";
import {
  Calendar,
  Building2,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export default function SejarahPage() {
  const historyTimeline = [
    {
      year: "2018",
      title: "Pendirian Perusahaan & Awal Operasional",
      desc: "Trans90 resmi didirikan di Jakarta Selatan dengan fokus awal penyediaan 20 unit armada sewa operasional untuk klien korporat. Membangun fondasi standar perawatan unit yang ketat.",
      badge: "Inisiasi Bisnis",
    },
    {
      year: "2020",
      title: "Peluncuran Layanan Sewa Harian & Digitalisasi",
      desc: "Menanggapi tingginya permintaan pasar individu, Trans90 meluncurkan sistem pemesanan sewa online lepas kunci & dengan driver serta menambah armada hingga 150+ unit.",
      badge: "Transformasi Digital",
    },
    {
      year: "2022",
      title: "Ekspansi Divisi Jual Beli Terinspeksi",
      desc: "Resmi membuka divisi bisnis Jual Beli Kendaraan Bekas Berkualitas. Setiap unit wajib lulus 150+ titik inspeksi fisik & keabsahan surat-surat kendaraan.",
      badge: "Diversifikasi Layanan",
    },
    {
      year: "2024",
      title: "Integrasi Mini-ERP & Modernisasi Armada",
      desc: "Implementasi sistem manajemen armada cloud terpadu (ERP) untuk mempercepat verifikasi dokumen pelanggan, pemeliharaan berkala, serta peremajaan unit kendaraan.",
      badge: "Efisiensi Operasional",
    },
    {
      year: "2026",
      title: "Pemimpin Pasar & Komitmen Transisi EV",
      desc: "Mengelola lebih dari 1.000+ unit armada sewa dan jual-beli aktif di kota-kota besar Indonesia, serta mulai mengadopsi armada Kendaraan Listrik (EV) mendukung komitmen ESG.",
      badge: "Pencapaian Utama",
    },
  ];

  return (
    <div className="bg-white text-[#1A2233] min-h-screen pt-28 pb-20 antialiased font-sans">
      
      {/* 1. HERO TITLE & INTRO SECTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-100 pb-10">
        <div className="space-y-3 max-w-2xl">
          <span className="text-xs font-bold text-[#1E4FA3] uppercase tracking-widest block">
            Milestone & Perjalanan
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0B2A5B] tracking-tight leading-none">
            Sejarah Perusahaan
          </h1>
          <p className="text-sm sm:text-base text-slate-500 font-medium pt-1">
            Rekam jejak pertumbuhan dan inovasi Trans90 dari masa ke masa.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 py-12">
        
        {/* 2. HIGHLIGHT SEJARAH (FLAT EDITORIAL LAYOUT) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center border-b border-slate-200 pb-16">
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-slate-200 shadow-md h-[280px] sm:h-[340px] relative group">
            <img
              src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80"
              alt="Perjalanan Armada Trans90"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-5 left-6 right-6 text-white">
              <p className="text-sm font-bold tracking-wide">Inovasi Berkelanjutan Sejak 2018</p>
              <p className="text-xs text-slate-300 font-medium">Mengutamakan kualitas & integritas layanan</p>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-5">
            <span className="text-xs font-bold text-[#1E4FA3] uppercase tracking-wider block">
              Dedikasi Layanan
            </span>
            <h2 className="text-2xl font-extrabold text-[#0B2A5B] leading-snug">
              Tumbuh Bersama Kepercayaan Pelanggan
            </h2>
            <p className="text-xs sm:text-sm text-[#586678] leading-relaxed">
              Berawal dari puluhan unit sewa sederhana, Trans90 terus bertransformasi memanfaatkan teknologi modern untuk memberikan kepastian hukum, kenyamanan armada, dan transparansi di setiap transaksi.
            </p>
            
            <div className="pt-4 border-t border-slate-200 grid grid-cols-2 gap-4 text-center sm:text-left">
              <div>
                <p className="text-xl font-black text-[#0B2A5B]">8+ Tahun</p>
                <p className="text-xs font-semibold text-slate-500">Pengalaman Industri</p>
              </div>
              <div>
                <p className="text-xl font-black text-[#0B2A5B]">1.000+</p>
                <p className="text-xs font-semibold text-slate-500">Total Armada Aktif</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. TIMELINE SEJARAH FLAT ALUR */}
        <section className="space-y-10 border-b border-slate-200 pb-16">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#1E4FA3] uppercase tracking-wider block">
              Alur Perkembangan
            </span>
            <h3 className="text-2xl font-extrabold text-[#0B2A5B]">
              Tahapan Milestone Trans90
            </h3>
            <p className="text-xs text-[#586678]">
              Perjalanan transformasi bisnis kami dari tahun ke tahun.
            </p>
          </div>

          <div className="relative border-l-2 border-slate-200 ml-3 sm:ml-28 space-y-10 pt-2">
            {historyTimeline.map((item, idx) => (
              <div key={idx} className="relative pl-6 sm:pl-8 space-y-2">
                {/* Dot Marker */}
                <span className="absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full bg-[#0B2A5B] border-2 border-white ring-2 ring-blue-100" />

                {/* Badge Tahun di Kiri (Desktop) */}
                <div className="sm:absolute sm:-left-28 sm:top-0 sm:text-right sm:w-20 mb-1 sm:mb-0">
                  <span className="inline-flex items-center gap-1 text-xs font-black text-[#0B2A5B] bg-slate-100 px-2.5 py-1 rounded-md font-mono">
                    <Calendar className="h-3 w-3 text-[#1E4FA3]" />
                    {item.year}
                  </span>
                </div>

                {/* Konten Timeline Flat */}
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-base font-bold text-[#0B2A5B]">
                      {item.title}
                    </h4>
                    <span className="text-[10px] font-bold text-[#1E4FA3] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#586678] leading-relaxed max-w-2xl">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. BANNER REDIRECT LINK */}
        <section className="rounded-2xl bg-[#0B2A5B] text-white p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 max-w-xl">
            <h4 className="text-lg sm:text-xl font-black">
              Pelajari Lebih Lanjut Tentang Trans90
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Lihat jajaran tim manajemen atau jelajahi visi dan misi perusahaan kami.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
            <Link
              href="/tentang-kami/visi-misi"
              className="flex-1 sm:flex-none text-center bg-white text-[#0B2A5B] hover:bg-slate-100 text-xs font-bold px-5 py-3 rounded-xl shadow-md transition"
            >
              Visi & Misi
            </Link>
            <Link
              href="/tentang-kami/profil"
              className="flex-1 sm:flex-none text-center border border-white/20 bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-5 py-3 rounded-xl transition"
            >
              Profil Perusahaan
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}