"use client";

import { useState } from "react";
import {
  BookOpen,
  Download,
  Eye,
  Search,
  Sparkles,
  X,
  FileText,
  Calendar,
  CheckCircle2,
} from "lucide-react";

export default function LaporanTahunanPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [previewReport, setPreviewReport] = useState<any | null>(null);

  const reports = [
    {
      id: "2025",
      year: "2025",
      title: "Annual Report 2025: Expanding Horizons in Automotive Logistics",
      type: "Annual & Sustainability Report",
      pages: "248 Halaman",
      fileSize: "PDF • 18.4 MB",
      coverImg:
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
      highlights: [
        "Ekspansi penambahan 200+ unit armada sewa ke 15 kota besar.",
        "Pertumbuhan laba bersih konsolidasian sebesar +18.6% YoY.",
        "Inisiasi 100 unit armada kendaraan listrik (EV) komersial.",
      ],
      pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      id: "2024",
      year: "2024",
      title: "Annual Report 2024: Digital Integration & Operational Excellence",
      type: "Annual Report",
      pages: "210 Halaman",
      fileSize: "PDF • 15.2 MB",
      coverImg:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      highlights: [
        "Implementasi Mini-ERP armada terpadu berbasis cloud.",
        "Peluncuran portal publik sewa online & verifikasi dokumen otomatis.",
        "Sertifikasi ISO 9001:2015 manajemen mutu operasional.",
      ],
      pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
      id: "2023",
      year: "2023",
      title: "Annual Report 2023: Building Strong Foundations for Sustainable Fleet",
      type: "Annual Report",
      pages: "185 Halaman",
      fileSize: "PDF • 12.8 MB",
      coverImg:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
      highlights: [
        "Pengembangan divisi jual beli kendaraan terinspeksi 150+ titik.",
        "Pencapaian 10.000+ total transaksi persewaan armada.",
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
            Laporan Tahunan
          </h1>
        </div>

        {/* SEARCH BAR & FILTER */}
        <div className="bg-white rounded-2xl border border-[#E3E8EF] p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari laporan berdasarkan tahun atau judul..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs text-slate-800 focus:bg-white focus:border-[#1E4FA3] focus:outline-none transition"
            />
          </div>
          <span className="text-xs font-semibold text-slate-500">
            Menampilkan <strong className="text-[#0B2A5B]">{filteredReports.length}</strong> Laporan Resmi
          </span>
        </div>

        {/* GRID LAPORAN TAHUNAN */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="bg-white rounded-2xl border border-[#E3E8EF] overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between group"
            >
              <div>
                <div className="h-52 bg-slate-100 overflow-hidden relative">
                  <img
                    src={report.coverImg}
                    alt={report.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 text-xs font-black bg-[#0B2A5B] text-white px-3 py-1 rounded-lg shadow-sm">
                    Tahun {report.year}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <span className="text-[10px] font-bold text-[#1E4FA3] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                    {report.type}
                  </span>
                  <h3 className="text-sm font-extrabold text-[#0B2A5B] line-clamp-2 leading-snug">
                    {report.title}
                  </h3>

                  <div className="space-y-1.5 pt-1">
                    <p className="text-[11px] font-bold text-slate-700">Sorotan Kinerja:</p>
                    <ul className="space-y-1 text-[11px] text-slate-500">
                      {report.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="h-3 w-3 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{h}</span>
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
                  <span>Unduh</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* MODAL PREVIEW PDF INTERAKTIF */}
        {previewReport && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full h-[85vh] flex flex-col overflow-hidden shadow-2xl">
              <div className="p-4 bg-[#0B2A5B] text-white flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-blue-300 uppercase">Pratinjau Dokumen</span>
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
                  title="PDF Preview"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}