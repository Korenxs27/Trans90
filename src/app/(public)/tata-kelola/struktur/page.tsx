import Link from "next/link";
import {
  ShieldCheck,
  Users,
  Building2,
  CheckCircle2,
  Scale,
  Award,
  ArrowRight,
} from "lucide-react";

export default function StrukturTataKelolaPage() {
  const organs = [
    {
      role: "Rapat Umum Pemegang Saham (RUPS)",
      tag: "Organ Tertinggi",
      desc: "Wadah tertinggi pemegang saham untuk mengambil keputusan strategis terkait arah bisnis, persetujuan laporan tahunan, serta perubahan struktur permodalan AutoCorp.",
    },
    {
      role: "Dewan Komisaris",
      tag: "Pengawasan & Nasihat",
      desc: "Bertugas melakukan pengawasan umum secara independen serta memberikan nasihat kepada Direksi terkait efektivitas pengelolaan operasional dan komitmen GCG.",
    },
    {
      role: "Direksi Utama",
      tag: "Eksekutif Operasional",
      desc: "Bertanggung jawab penuh atas pengurusan operasional harian, eksekusi strategi ekspansi armada sewa & jual beli, serta perwakilan legal korporasi.",
    },
    {
      role: "Komite Audit & Manajemen Risiko",
      tag: "Pendukung Pengawasan",
      desc: "Membantu Dewan Komisaris memastikan keandalan laporan keuangan, kepatuhan terhadap perundang-undangan, serta efektivitas audit internal.",
    },
  ];

  return (
    <div className="bg-[#F8FAFC] text-[#1A2233] min-h-screen pt-30 pb-16 antialiased">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h1 className="text-3xl sm:text-5xl font-black text-[#0B2A5B] tracking-tight">
            Struktur Tata Kelola
          </h1>
        </div>

        {/* ORGAN UTAMA */}
        <div className="bg-white rounded-2xl border border-[#E3E8EF] p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-[#E3E8EF] pb-4">
            <h2 className="text-lg font-extrabold text-[#0B2A5B]">Organ Utama Perusahaan</h2>
            <p className="text-xs text-slate-500 mt-1">
              Disusun berdasarkan Undang-Undang Perseroan Terbatas & Standar Good Corporate Governance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {organs.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-50/50 p-5 rounded-2xl border border-slate-200 space-y-2 hover:border-blue-200 transition"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-[#0B2A5B]">
                    <Users className="h-4 w-4 text-[#1E4FA3]" />
                    <h3 className="text-sm font-bold">{item.role}</h3>
                  </div>
                  <span className="text-[10px] font-bold text-[#1E4FA3] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                    {item.tag}
                  </span>
                </div>
                <p className="text-xs text-[#586678] leading-relaxed pt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* PRINSIP INDEPENDENSI */}
        <div className="bg-white rounded-2xl border border-[#E3E8EF] p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-[#0B2A5B]">
            <Scale className="h-5 w-5 text-[#1E4FA3]" />
            <h3 className="text-base font-bold">Prinsip Independensi Organ</h3>
          </div>
          <p className="text-xs text-[#586678] leading-relaxed">
            Setiap organ di dalam struktur tata kelola AutoCorp menjalankan tugas dan tanggung jawabnya secara mandiri tanpa benturan kepentingan, serta tidak mendapat tekanan dari pihak manapun yang dapat mempengaruhi pengambilan keputusan.
          </p>
        </div>
      </div>
    </div>
  );
}