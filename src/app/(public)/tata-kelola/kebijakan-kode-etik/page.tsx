import Link from "next/link";
import {
  FileText,
  Download,
  CheckCircle2,
  Scale,
  Award,
  BookOpen,
  Eye,
} from "lucide-react";

export default function KebijakanKodeEtikPage() {
  const codePillars = [
    {
      title: "Integritas Bisnis",
      desc: "Jujur, adil, dan transparan dalam setiap proses transaksi sewa maupun jual beli armada kendaraan.",
    },
    {
      title: "Kepatuhan Hukum",
      desc: "Taat terhadap seluruh regulasi lalu lintas, pajak, serta perizinan usaha transportasi yang berlaku.",
    },
    {
      title: "Anti-Korupsi & Antigratifikasi",
      desc: "Menolak segala bentuk suap, komisi ilegal, maupun pemberian yang memicu benturan kepentingan.",
    },
    {
      title: "Kerahasiaan Data Pelanggan",
      desc: "Menjaga keamanan data pribadi penyewa dan pembeli sesuai standar perlindungan data nasional.",
    },
  ];

  const docs = [
    { title: "Pedoman Kebijakan & Kode Etik Perusahaan (Code of Conduct)", size: "PDF • 2.1 MB" },
    { title: "Pedoman Tata Perilaku Bisnis & Antikorupsi", size: "PDF • 1.5 MB" },
    { title: "Kebijakan Penanganan Benturan Kepentingan (Conflict of Interest)", size: "PDF • 980 KB" },
    { title: "Pedoman Kerahasiaan Data & Privasi Pelanggan", size: "PDF • 1.1 MB" },
  ];

  return (
    <div className="bg-[#F8FAFC] text-[#1A2233] min-h-screen pt-30 pb-16 antialiased">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h1 className="text-3xl sm:text-5xl font-black text-[#0B2A5B] tracking-tight">
            Kebijakan & Kode Etik
          </h1>
        </div>

        {/* PILAR KODE ETIK */}
        <div className="space-y-4">
          <h2 className="text-lg font-extrabold text-[#0B2A5B]">Pilar Perilaku Utama</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {codePillars.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-[#E3E8EF] shadow-sm space-y-1.5"
              >
                <div className="flex items-center gap-2 text-[#0B2A5B]">
                  <CheckCircle2 className="h-4 w-4 text-[#1E4FA3]" />
                  <h3 className="text-xs sm:text-sm font-bold">{item.title}</h3>
                </div>
                <p className="text-xs text-[#586678] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* DOKUMEN UNDUHAN */}
        <div className="bg-white rounded-2xl border border-[#E3E8EF] p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-extrabold text-[#0B2A5B]">Unduh Dokumen Kebijakan Resmi</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Salinan resmi pedoman etik yang menjadi acuan operasional seluruh lini bisnis AutoCorp.
            </p>
          </div>

          <div className="space-y-3">
            {docs.map((doc, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between gap-3 hover:bg-white transition"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 bg-blue-50 text-[#1E4FA3] rounded-lg flex items-center justify-center shrink-0">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-800">{doc.title}</h3>
                    <span className="text-[10px] text-slate-400">{doc.size}</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="p-2 rounded-lg text-[#1E4FA3] hover:bg-blue-50 transition"
                  title="Unduh Dokumen"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}