import Link from "next/link";
import {
  Target,
  Rocket,
  CheckCircle2,
  ShieldCheck,
  Award,
  HeartHandshake,
  Sparkles,
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
    <div className="bg-[#F8FAFC] text-[#1A2233] min-h-screen pt-30 pb-16 antialiased">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* 1. HEADER TITLE */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h1 className="text-3xl sm:text-5xl font-black text-[#0B2A5B] tracking-tight">
            Visi & Misi Perusahaan
          </h1>
        </div>

        {/* 2. GRID VISI & MISI */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* CARD VISI */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E3E8EF] shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-xl bg-blue-50 border border-blue-100 text-[#1E4FA3] flex items-center justify-center font-bold">
                <Target className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E4FA3]">
                  Arah Masa Depan
                </span>
                <h2 className="text-xl font-extrabold text-[#0B2A5B] mt-0.5">Visi Perusahaan</h2>
              </div>
              <p className="text-xs sm:text-sm text-[#586678] leading-relaxed">
                "Menjadi mitra ekosistem sewa dan jual beli kendaraan (mobil & motor) terdepan di Indonesia yang dikenal atas keandalan kualitas unit, transparansi riwayat, serta kepuasan layanan yang berstandar tinggi."
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <span className="text-[11px] font-semibold text-slate-400">
                Fokus Utama: Kepercayaan & Kenyamanan Transaksi
              </span>
            </div>
          </div>

          {/* CARD MISI */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E3E8EF] shadow-sm hover:shadow-md transition space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-xl bg-blue-50 border border-blue-100 text-[#1E4FA3] flex items-center justify-center font-bold">
                <Rocket className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E4FA3]">
                  Langkah Strategis
                </span>
                <h2 className="text-xl font-extrabold text-[#0B2A5B] mt-0.5">Misi Perusahaan</h2>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-[#586678]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#1E4FA3] shrink-0 mt-0.5" />
                  <span>Menyediakan armada sewa dalam kondisi bersih, harum, terawat, dan rutin lolos Uji Layak Jalan.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#1E4FA3] shrink-0 mt-0.5" />
                  <span>Menjamin 100% keabsahan surat-surat kendaraan serta kejujuran riwayat inspeksi unit jual-beli.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#1E4FA3] shrink-0 mt-0.5" />
                  <span>Menghadirkan platform pemesanan digital yang cepat, transparan, dan terintegrasi dengan layanan bantuan 24 jam.</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <span className="text-[11px] font-semibold text-slate-400">
                Eksekusi: Standar Inspeksi 150+ Titik
              </span>
            </div>
          </div>
        </div>

        {/* 3. CORE VALUES / PILAR NILAI PERUSAHAAN */}
        <div className="space-y-6 pt-4">
          <div className="text-center space-y-1">
            <h3 className="text-lg sm:text-xl font-extrabold text-[#0B2A5B]">
              Pilar Nilai Utama (Core Values)
            </h3>
            <p className="text-xs text-[#586678]">
              Prinsip kerja yang selalu dipegang teguh oleh seluruh tim AutoCorp.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {coreValues.map((value, idx) => {
              const IconComp = value.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl border border-[#E3E8EF] shadow-sm space-y-3 text-center sm:text-left"
                >
                  <div className="h-10 w-10 mx-auto sm:mx-0 bg-blue-50 text-[#1E4FA3] rounded-xl flex items-center justify-center font-bold">
                    <IconComp className="h-5 w-5" />
                  </div>
                  <h4 className="text-sm font-bold text-[#0B2A5B]">{value.title}</h4>
                  <p className="text-xs text-[#586678] leading-relaxed">{value.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. BANNER REDIRECT CATALOG */}
        <div className="rounded-2xl bg-white border border-[#E3E8EF] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div>
            <h4 className="text-sm sm:text-base font-extrabold text-[#0B2A5B]">
              Siap Menikmati Layanan Kendaraan Terbaik?
            </h4>
            <p className="text-xs text-[#586678] mt-0.5">
              Jelajahi ratusan armada sewa dan unit jual beli siap pakai sekarang.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              href="/bisnis/sewa"
              className="flex-1 sm:flex-none text-center bg-[#0B2A5B] hover:bg-[#1E4FA3] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition"
            >
              Katalog Sewa
            </Link>
            <Link
              href="/bisnis/jual-beli"
              className="flex-1 sm:flex-none text-center bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-5 py-2.5 rounded-xl transition"
            >
              Katalog Jual Beli
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}