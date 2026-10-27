"use client";

import { useState } from "react";
import {
  Megaphone,
  Search,
  Calendar,
  FileText,
  ExternalLink,
  Tag,
  Download,
  Filter,
} from "lucide-react";

export default function PublikasiPengumumanPage() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const announcements = [
    {
      id: "1",
      category: "KETERBUKAAN_INFORMASI",
      catLabel: "Keterbukaan Informasi",
      date: "20 Oktober 2026",
      title: "Keterbukaan Informasi Terkait Penambahan 100 Unit Armada Listrik (EV)",
      summary:
        "PT AutoCorp Tbk. mengumumkan pembaruan investasi belanja modal (Capex) untuk penambahan armada kendaraan listrik komersial guna memperkuat portofolio sewa ramah lingkungan.",
      fileSize: "PDF • 1.2 MB",
    },
    {
      id: "2",
      category: "RUPS",
      catLabel: "Hasil RUPS",
      date: "15 Juni 2026",
      title: "Ringkasan Risalah Rapat Umum Pemegang Saham Tahunan (RUPST) Tahun Buku 2025",
      summary:
        "Persetujuan pembagian dividen tunai sebesar Rp 45 per lembar saham, persetujuan laporan tahunan 2025, serta penunjukan ulang Kantor Akuntan Publik.",
      fileSize: "PDF • 2.4 MB",
    },
    {
      id: "3",
      category: "DIVIDEN",
      catLabel: "Pengumuman Dividen",
      date: "18 Juni 2026",
      title: "Jadwal dan Tata Cara Pembagian Dividen Tunai Tahun Buku 2025",
      summary:
        "Pengumuman Cum Dividen Pasar Reguler (23 Juni 2026), Ex Dividen (24 Juni 2026), dan Pelaksanaan Pembayaran Dividen Tunai pada 12 Juli 2026.",
      fileSize: "PDF • 950 KB",
    },
    {
      id: "4",
      category: "KETERBUKAAN_INFORMASI",
      catLabel: "Keterbukaan Informasi",
      date: "10 April 2026",
      title: "Penyampaian Laporan Keuangan Konsolidasian Audited Periode 2025",
      summary:
        "Penyampaian publikasi resmi Laporan Keuangan Audited tahun buku 2025 kepada Otoritas Jasa Keuangan (OJK) dan Bursa Efek Indonesia (BEI).",
      fileSize: "PDF • 3.8 MB",
    },
  ];

  const filteredAnnouncements = announcements.filter((item) => {
    const matchCategory =
      activeCategory === "ALL" || item.category === activeCategory;
    const matchSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="bg-[#F8FAFC] text-[#1A2233] min-h-screen pt-30 pb-16 antialiased">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h1 className="text-3xl sm:text-5xl font-black text-[#0B2A5B] tracking-tight">
            Publikasi & Pengumuman
          </h1>
        </div>

        {/* FILTER TAB & SEARCH BAR INTERAKTIF */}
        <div className="bg-white rounded-2xl border border-[#E3E8EF] p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* SEARCH INPUT */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari pengumuman..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs text-slate-800 focus:bg-white focus:border-[#1E4FA3] focus:outline-none transition"
              />
            </div>

            {/* QUICK CATEGORY TABS */}
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              <button
                type="button"
                onClick={() => setActiveCategory("ALL")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  activeCategory === "ALL"
                    ? "bg-[#0B2A5B] text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Semua
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory("KETERBUKAAN_INFORMASI")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  activeCategory === "KETERBUKAAN_INFORMASI"
                    ? "bg-[#0B2A5B] text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Keterbukaan Informasi
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory("RUPS")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  activeCategory === "RUPS"
                    ? "bg-[#0B2A5B] text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                RUPS
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory("DIVIDEN")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  activeCategory === "DIVIDEN"
                    ? "bg-[#0B2A5B] text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Dividen
              </button>
            </div>
          </div>
        </div>

        {/* DAFTAR PENGUMUMAN INTERAKTIF */}
        <div className="space-y-4">
          {filteredAnnouncements.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-[#E3E8EF]">
              <p className="text-xs font-bold text-slate-500">Pengumuman tidak ditemukan</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Coba gunakan kata kunci atau filter lain.</p>
            </div>
          ) : (
            filteredAnnouncements.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-[#E3E8EF] p-5 sm:p-6 shadow-sm hover:border-blue-200 transition space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-[#1E4FA3] bg-blue-50 px-2.5 py-0.5 rounded border border-blue-100">
                      {item.catLabel}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {item.date}
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400">BEI Announcement</span>
                </div>

                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-[#0B2A5B] leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#586678] mt-1.5 leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">{item.fileSize}</span>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E4FA3] hover:underline"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Unduh Lampiran Resmi</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}