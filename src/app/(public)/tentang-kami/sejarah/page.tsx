import Link from "next/link";
import {
  History,
  Calendar,
  Building2,
  TrendingUp,
  Award,
  Users,
  Car,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export default function SejarahPage() {
  const historyTimeline = [
    {
      year: "2018",
      title: "Pendirian Perusahaan & Awal Operasional",
      desc: "AutoCorp resmi didirikan di Jakarta Selatan dengan fokus awal penyediaan 20 unit armada sewa operasional untuk klien korporat. Membangun fondasi standar perawatan unit yang ketat.",
      badge: "Inisiasi Bisnis",
    },
    {
      year: "2020",
      title: "Peluncuran Layanan Sewa Harian & Digitalisasi",
      desc: "Menanggapi tingginya permintaan pasar individu, AutoCorp meluncurkan sistem pemesanan sewa online lepas kunci & dengan driver serta menambah armada hingga 150+ unit.",
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
    <div className="bg-[#F8FAFC] text-[#1A2233] min-h-screen pt-30 pb-16 antialiased">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* 1. HEADER TITLE */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h1 className="text-3xl sm:text-5xl font-black text-[#0B2A5B] tracking-tight">
            Sejarah Perusahaan
          </h1>
        </div>

        {/* 2. CARD SOROTAN DENGAN FOTO HISTORIS */}
        <div className="bg-white rounded-2xl border border-[#E3E8EF] p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 rounded-xl overflow-hidden border border-slate-100 shadow-sm h-[260px] sm:h-[320px] relative">
              <img
                src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80"
                alt="Perjalanan Armada AutoCorp"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B2A5B]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-xs font-bold">Inovasi Berkelanjutan Sejak 2018</p>
                <p className="text-[11px] text-slate-300">Mengutamakan kualitas & integritas layanan</p>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-3">
              <span className="text-[11px] font-bold text-[#1E4FA3] uppercase tracking-wider">
                Dedikasi Layanan
              </span>
              <h2 className="text-xl font-extrabold text-[#0B2A5B]">
                Tumbuh Bersama Kepercayaan Pelanggan
              </h2>
              <p className="text-xs text-[#586678] leading-relaxed">
                Berawal dari puluhan unit sewa sederhana, AutoCorp terus bertransformasi memanfaatkan teknologi modern untuk memberikan kepastian hukum, kenyamanan armada, dan transparansi di setiap transaksi.
              </p>
              
              <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-3 text-center">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <p className="text-base font-black text-[#0B2A5B]">8+ Tahun</p>
                  <p className="text-[10px] text-slate-500 font-semibold">Pengalaman Industri</p>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <p className="text-base font-black text-[#0B2A5B]">1.000+</p>
                  <p className="text-[10px] text-slate-500 font-semibold">Total Armada Aktif</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. TIMELINE SEJARAH INTERAKTIF */}
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <h3 className="text-lg sm:text-xl font-extrabold text-[#0B2A5B]">
              Milestone & Alur Perkembangan
            </h3>
            <p className="text-xs text-[#586678]">
              Tahapan penting perkembangan bisnis AutoCorp dari tahun ke tahun.
            </p>
          </div>

          <div className="relative border-l-2 border-blue-200 ml-4 sm:ml-28 space-y-8 pt-2">
            {historyTimeline.map((item, idx) => (
              <div key={idx} className="relative pl-6 sm:pl-8">
                {/* Dot Marker */}
                <span className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full bg-[#0B2A5B] border-2 border-white shadow-sm ring-4 ring-blue-50" />

                {/* Badge Tahun di Kiri (Desktop) */}
                <div className="sm:absolute sm:-left-28 sm:top-1 sm:text-right sm:w-20 mb-2 sm:mb-0">
                  <span className="inline-flex items-center gap-1 text-xs font-black text-[#0B2A5B] bg-white px-2.5 py-1 rounded-lg border border-[#E3E8EF] shadow-sm">
                    <Calendar className="h-3 w-3 text-[#1E4FA3]" />
                    {item.year}
                  </span>
                </div>

                {/* Card Konten Timeline */}
                <div className="bg-white rounded-2xl border border-[#E3E8EF] p-5 sm:p-6 shadow-sm space-y-2 hover:border-blue-200 transition">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="text-sm sm:text-base font-bold text-[#0B2A5B]">
                      {item.title}
                    </h4>
                    <span className="text-[10px] font-bold text-[#1E4FA3] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-xs text-[#586678] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. BANNER BANNER REDIRECT PROFIL */}
        <div className="rounded-2xl bg-[#0B2A5B] text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
          <div>
            <h4 className="text-sm sm:text-base font-bold">
              Pelajari Lebih Lanjut Tentang Kami
            </h4>
            <p className="text-xs text-slate-300 mt-0.5">
              Lihat jajaran tim manajemen atau jelajahi visi dan misi perusahaan kami.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              href="/tentang-kami/visi-misi"
              className="flex-1 sm:flex-none text-center bg-white text-[#0B2A5B] hover:bg-slate-100 text-xs font-bold px-5 py-2.5 rounded-xl transition shadow-sm"
            >
              Visi & Misi
            </Link>
            <Link
              href="/tentang-kami/profil"
              className="flex-1 sm:flex-none text-center bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold px-5 py-2.5 rounded-xl transition"
            >
              Profil Perusahaan
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}