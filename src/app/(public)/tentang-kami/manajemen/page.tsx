import Link from "next/link";
import {
  Users,
  Building2,
  ShieldCheck,
  Briefcase,
  Mail,
  Share2,
  CheckCircle2,
} from "lucide-react";

export default function ManajemenPage() {
  const boardOfDirectors = [
    {
      name: "Hendrik Prasetya",
      role: "Chief Executive Officer (CEO)",
      division: "Direksi Utama",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
      experience: "15+ Tahun di Industri Otomotif",
      desc: "Memimpin arah strategis, kemitraan korporat, serta ekspansi jaringan persewaan dan jual beli kendaraan Trans90 secara nasional.",
    },
    {
      name: "Siti Rahmawati",
      role: "Chief Financial Officer (CFO)",
      division: "Keuangan & Akuntansi",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
      experience: "Pakar Tata Kelola Keuangan & Investasi",
      desc: "Mengawasi manajemen risiko, perencanaan anggaran modal, audit internal, serta efisiensi struktur keuangan perusahaan.",
    },
    {
      name: "Budi Santoso",
      role: "Chief Operating Officer (COO)",
      division: "Operasional & Armada",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
      experience: "Spesialis Manajemen Logistik & Fleet",
      desc: "Bertanggung jawab atas kelayakan 150+ titik inspeksi armada, efisiensi perawatan bengkel purna jual, serta kepuasan layanan pelanggan.",
    },
  ];

  const operationalHeads = [
    {
      name: "Rian Hidayat",
      role: "Head of Fleet & Inspection",
      desc: "Memastikan seluruh armada sewa & jual beli lulus Uji Layak Jalan dan terawat dengan standar manufaktur resmi.",
    },
    {
      name: "Anisa Fitriani",
      role: "Head of Customer Experience & Sales",
      desc: "Mengelola tim reservasi harian, proses pengajuan sewa online, serta layanan pendampingan pembeli.",
    },
    {
      name: "Deni Kurniawan",
      role: "Head of IT & Digital Transformation",
      desc: "Pengembang arsitektur sistem Mini-ERP perusahaan dan integrasi platform transaksi publik berbasis cloud.",
    },
  ];

  return (
    <div className="bg-white text-[#1A2233] min-h-screen pt-28 pb-20 antialiased font-sans">
      
      {/* 1. HERO TITLE & INTRO SECTION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-100 pb-10">
        <div className="space-y-3 max-w-2xl">
          <span className="text-xs font-bold text-[#1E4FA3] uppercase tracking-widest block">
            Executive Leadership
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0B2A5B] tracking-tight leading-none">
            Jajaran Manajemen
          </h1>
          <p className="text-sm sm:text-base text-slate-500 font-medium pt-1">
            Dewan direksi dan kepala divisi yang mengawal arah strategis operasional Trans90.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 py-12">
        
        {/* 2. BOARD OF DIRECTORS (DIREKSI UTAMA) */}
        <section className="space-y-8">
          <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-[#1E4FA3] uppercase tracking-wider block">
                Top Management
              </span>
              <h2 className="text-2xl font-extrabold text-[#0B2A5B]">
                Dewan Direksi & Eksekutif
              </h2>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Penanggung jawab strategis dan operasional korporat.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {boardOfDirectors.map((member, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between group"
              >
                <div>
                  {/* Foto Profil */}
                  <div className="h-64 bg-slate-100 overflow-hidden relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 text-[10px] font-bold uppercase bg-white/90 backdrop-blur-sm text-[#0B2A5B] px-2.5 py-1 rounded border border-slate-200">
                      {member.division}
                    </span>
                  </div>

                  {/* Detil Manajemen */}
                  <div className="p-6 space-y-2">
                    <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-[#1E4FA3] transition">
                      {member.name}
                    </h3>
                    <p className="text-xs font-bold text-[#1E4FA3]">
                      {member.role}
                    </p>
                    <span className="inline-block text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded font-mono">
                      {member.experience}
                    </span>
                    <p className="text-xs text-[#586678] leading-relaxed pt-2">
                      {member.desc}
                    </p>
                  </div>
                </div>

                {/* Footer Card */}
                <div className="p-6 pt-4 border-t border-slate-100 flex items-center justify-between text-slate-400">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                    Trans90 Leadership
                  </span>
                  <div className="flex items-center gap-1.5">
                    <a
                      href="#"
                      className="p-1.5 rounded-lg hover:bg-slate-100 hover:text-[#0B2A5B] transition"
                      title="LinkedIn Profil"
                    >
                      <Share2 className="h-4 w-4" />
                    </a>
                    <a
                      href="#"
                      className="p-1.5 rounded-lg hover:bg-slate-100 hover:text-[#0B2A5B] transition"
                      title="Email Corporate"
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. HEAD OF OPERATIONAL DIVISIONS (KEPALA DIVISI) */}
        <section className="space-y-8 border-t border-slate-200 pt-16">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-bold text-[#1E4FA3] uppercase tracking-wider block">
              Operational Chiefs
            </span>
            <h2 className="text-2xl font-extrabold text-[#0B2A5B]">
              Kepala Divisi & Operasional
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {operationalHeads.map((head, idx) => (
              <div
                key={idx}
                className="space-y-3 pb-6 border-b sm:border-b-0 border-slate-200"
              >
                <div className="h-10 w-10 bg-blue-50 text-[#1E4FA3] rounded-xl flex items-center justify-center font-bold">
                  <Briefcase className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0B2A5B]">{head.name}</h3>
                  <p className="text-xs font-bold text-[#1E4FA3] mt-0.5">
                    {head.role}
                  </p>
                </div>
                <p className="text-xs sm:text-sm text-[#586678] leading-relaxed">
                  {head.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. KOMITMEN KELEMBAGAAN (GCG) */}
        <section className="space-y-4 border-t border-slate-200 pt-16">
          <div className="flex items-center gap-2.5 text-[#0B2A5B]">
            <ShieldCheck className="h-5 w-5 text-[#1E4FA3]" />
            <h3 className="text-lg font-bold">Prinsip Tata Kelola Manajemen (GCG)</h3>
          </div>
          <p className="text-xs sm:text-sm text-[#586678] leading-relaxed max-w-4xl">
            Seluruh jajaran manajemen Trans90 berkomitmen menjalankan tata kelola perusahaan yang baik (*Good Corporate Governance*) berlandaskan prinsip keterbukaan, akuntabilitas, tanggung jawab, independensi, serta kesetaraan di setiap transaksi persewaan dan jual beli kendaraan.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-700 font-semibold">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Sistem Inspeksi Berstandar ISO & Laporan Transparan</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Verifikasi Dokumen Legalitas & Surat Kendaraan Asli</span>
            </div>
          </div>
        </section>

        {/* 5. BANNER REDIRECT PROFIL LENGKAP */}
        <section className="rounded-2xl bg-[#0B2A5B] text-white p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 max-w-xl">
            <h4 className="text-lg sm:text-xl font-black">
              Ingin Mengetahui Lebih Dalam Tentang Trans90?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Jelajahi sejarah perkembangan atau baca visi & misi utama perusahaan kami.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
            <Link
              href="/tentang-kami/profil"
              className="flex-1 sm:flex-none text-center bg-white text-[#0B2A5B] hover:bg-slate-100 text-xs font-bold px-5 py-3 rounded-xl shadow-md transition"
            >
              Profil Perusahaan
            </Link>
            <Link
              href="/tentang-kami/sejarah"
              className="flex-1 sm:flex-none text-center border border-white/20 bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-5 py-3 rounded-xl transition"
            >
              Sejarah
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}