"use client";

import { useState } from "react";
import {
  Leaf,
  Download,
  Eye,
  Search,
  FileText,
  X,
  CheckCircle2,
  Calendar,
} from "lucide-react";

export default function ESGLaporanKeberlanjutanPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [previewReport, setPreviewReport] = useState<any | null>(null);

  const reports = [
    {
      id: "2025",
      year: "2025",
      title: "Sustainability Report 2025: Driving Green Mobility Forward",
      fileSize: "PDF • 12.4 MB",
      pages: "142 Halaman",
      coverImg:
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
      highlights: [
        "Integrasi 120+ unit armada listrik (EV) ke dalam sistem sewa publik.",
        "Pengurangan emisi karbon sebesar 24% secara kumulatif YoY.",
        "100% pengelolaan limbah B3 oli & aki bekas bekerja sama dengan mitra resmi.",
      ],
      pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      id: "2024",
      year: "2024",
      title: "Sustainability Report 2024: Sustainable Fleet & Corporate Governance",
      fileSize: "PDF • 9.8 MB",
      pages: "118 Halaman",
      coverImg:
        "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=800&q=80",
      highlights: [
        "Penerapan sistem Paperless ERP untuk efisiensi operasional kantor pusat.",
        "Sertifikasi keselamatan berkendara (Defensive Driving) bagi 100% driver.",
      ],
      pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
  ];

  const filteredReports = reports.filter(
    (r) =>
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.year.includes(searchQuery)
  );

  return (
    <div className="bg-[#F8FAFC] text-[#1A2233] min-h-screen pt-30 pb-16 antialiased">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h1 className="text-3xl sm:text-5xl font-black text-[#0B2A5B] tracking-tight">
            Laporan Keberlanjutan
          </h1>
        </div>

        {/* SEARCH BAR */}
        <div className="bg-white rounded-2xl border border-[#E3E8EF] p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari Laporan Keberlanjutan..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs text-slate-800 focus:bg-white focus:border-[#1E4FA3] focus:outline-none transition"
            />
          </div>
          <span className="text-xs font-semibold text-slate-500">
            Menampilkan <strong className="text-[#0B2A5B]">{filteredReports.length}</strong> Publikasi Keberlanjutan
          </span>
        </div>

        {/* LIST CARD LAPORAN */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="bg-white rounded-2xl border border-[#E3E8EF] overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between group"
            >
              <div>
                <div className="h-48 bg-slate-100 overflow-hidden relative">
                  <img
                    src={report.coverImg}
                    alt={report.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3 left-3 text-xs font-black bg-emerald-700 text-white px-3 py-1 rounded-lg shadow-sm">
                    Tahun {report.year}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="text-sm font-extrabold text-[#0B2A5B] leading-snug">
                    {report.title}
                  </h3>

                  <div className="space-y-1.5 pt-1">
                    <p className="text-[11px] font-bold text-slate-700">Sorotan Keberlanjutan:</p>
                    <ul className="space-y-1 text-[11px] text-slate-500">
                      {report.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="p-5 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setPreviewReport(report)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold py-2.5 px-3 rounded-xl transition"
                >
                  <Eye className="h-3.5 w-3.5 text-[#1E4FA3]" />
                  <span>Pratinjau</span>
                </button>

                <a
                  href={report.pdfUrl}
                  download
                  className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#0B2A5B] hover:bg-[#1E4FA3] text-white text-xs font-bold py-2.5 px-3 rounded-xl transition shadow-sm"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Unduh ({report.fileSize})</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* MODAL PREVIEW PDF */}
        {previewReport && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full h-[85vh] flex flex-col overflow-hidden shadow-2xl">
              <div className="p-4 bg-[#0B2A5B] text-white flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase">Pratinjau Sustainability Report</span>
                  <h3 className="text-xs sm:text-sm font-bold line-clamp-1">{previewReport.title}</h3>
                </div>
                <button
                  onClick={() => setPreviewReport(null)}
                  className="p-1 rounded-lg hover:bg-white/10 transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 bg-slate-100">
                <iframe
                  src={previewReport.pdfUrl}
                  className="w-full h-full border-none"
                  title="PDF Preview ESG"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}