import Link from "next/link";
import {
  Target,
  Rocket,
  CheckCircle2,
  ShieldCheck,
  Award,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";

export default function VisiMisiPage() {
  const coreValues = [
    {
      icon: ShieldCheck,
      title: "Integritas & Transparansi",
      desc: "Menyajikan kondisi fisik unit dan dokumen legalitas secara jujur tanpa ada yang disembunyikan.",
    },
    {
      icon: Award,
      title: "Kualitas Prima",
      desc: "Seluruh armada rutin melalui inspeksi berkala untuk menjamin keamanan dan kenyamanan berkendara.",
    },
    {
      icon: HeartHandshake,
      title: "Orientasi Pelanggan",
      desc: "Memberikan respons cepat, solusi fleksibel, dan kemudahan proses transaksi di setiap kebutuhan.",
    },
  ];

  return (
    <div className="bg-white text-[#1A2233] min-h-screen pt-28 pb-20 antialiased font-sans">
      
      {/* 1. HERO TITLE & INTRO SECTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-100 pb-10">
        <div className="space-y-3 max-w-2xl">
          <span className="text-xs font-bold text-[#1E4FA3] uppercase tracking-widest block">
            Prinsip & Komitmen Utama
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0B2A5B] tracking-tight leading-none">
            Visi & Misi Perusahaan
          </h1>
          <p className="text-sm sm:text-base text-slate-500 font-medium pt-1">
            Panduan dan fondasi utama Trans90 dalam melayani ekosistem otomotif Indonesia.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 py-12">
        
        {/* 2. SECTION VISI & MISI (FLAT TWO-COLUMN LAYOUT WITH BORDER DIVIDER) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 border-b border-slate-200 pb-16">
          
          {/* VISI PERUSAHAAN */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-blue-50 text-[#1E4FA3] rounded-xl flex items-center justify-center font-bold">
                <Target className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E4FA3] block">
                  Arah Masa Depan
                </span>
                <h2 className="text-xl font-extrabold text-[#0B2A5B]">Visi Trans90</h2>
              </div>
            </div>

            <blockquote className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed border-l-2 border-[#1E4FA3] pl-4 py-1 italic">
              "Menjadi mitra ekosistem sewa dan jual beli kendaraan (mobil & motor) terdepan di Indonesia yang dikenal atas keandalan kualitas unit, transparansi riwayat, serta kepuasan layanan yang berstandar tinggi."
            </blockquote>

            <div className="pt-2 text-xs font-semibold text-slate-400">
              Fokus Utama: Kepercayaan & Kenyamanan Transaksi
            </div>
          </div>

          {/* MISI PERUSAHAAN */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-blue-50 text-[#1E4FA3] rounded-xl flex items-center justify-center font-bold">
                <Rocket className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#1E4FA3] block">
                  Langkah Strategis
                </span>
                <h2 className="text-xl font-extrabold text-[#0B2A5B]">Misi Trans90</h2>
              </div>
            </div>

            <ul className="space-y-4 text-xs sm:text-sm text-[#586678]">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-[#1E4FA3] shrink-0 mt-0.5" />
                <span className="leading-relaxed">Menyediakan armada sewa dalam kondisi bersih, harum, terawat, dan rutin lolos Uji Layak Jalan.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-[#1E4FA3] shrink-0 mt-0.5" />
                <span className="leading-relaxed">Menjamin 100% keabsahan surat-surat kendaraan serta kejujuran riwayat inspeksi unit jual-beli.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-[#1E4FA3] shrink-0 mt-0.5" />
                <span className="leading-relaxed">Menghadirkan platform pemesanan digital yang cepat, transparan, dan terintegrasi dengan layanan bantuan 24 jam.</span>
              </li>
            </ul>

            <div className="pt-2 text-xs font-semibold text-slate-400">
              Eksekusi: Standar Inspeksi 150+ Titik
            </div>
          </div>

        </section>

        {/* 3. CORE VALUES / PILAR NILAI (ROW MINIMALIST LAYOUT) */}
        <section className="space-y-8 border-b border-slate-200 pb-16">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#1E4FA3] uppercase tracking-wider block">
              Budaya Perusahaan
            </span>
            <h3 className="text-2xl font-extrabold text-[#0B2A5B]">
              Pilar Nilai Utama (Core Values)
            </h3>
            <p className="text-xs text-[#586678]">
              Prinsip kerja yang selalu dipegang teguh oleh seluruh tim Trans90.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreValues.map((value, idx) => {
              const IconComp = value.icon;
              return (
                <div key={idx} className="space-y-3">
                  <div className="flex items-center gap-2.5 text-[#1E4FA3]">
                    <IconComp className="h-5 w-5" />
                    <h4 className="text-base font-bold text-[#0B2A5B]">{value.title}</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-[#586678] leading-relaxed">
                    {value.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. BANNER REDIRECT CATALOG (FLAT DARK CONTAINER) */}
        <section className="rounded-2xl bg-[#0B2A5B] text-white p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 max-w-xl">
            <h4 className="text-lg sm:text-xl font-black">
              Siap Menikmati Layanan Kendaraan Terbaik?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Jelajahi ratusan armada sewa dan unit jual beli siap pakai sekarang.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
            <Link
              href="/bisnis/sewa"
              className="flex-1 sm:flex-none text-center bg-white text-[#0B2A5B] hover:bg-slate-100 text-xs font-bold px-5 py-3 rounded-xl shadow-md transition"
            >
              Katalog Sewa
            </Link>
            <Link
              href="/bisnis/jual-beli"
              className="flex-1 sm:flex-none text-center border border-white/20 bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-5 py-3 rounded-xl transition"
            >
              Katalog Jual Beli
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}