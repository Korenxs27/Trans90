"use client";

import { useState } from "react";
import {
  TrendingUp,
  FileText,
  Download,
  Calculator,
  BarChart3,
  DollarSign,
  PieChart,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

export default function LaporanKeuanganPage() {
  const [selectedYear, setSelectedYear] = useState("2026");
  const [selectedPeriod, setSelectedPeriod] = useState("ALL");
  const [sharesCount, setSharesCount] = useState<number>(10000); // 100 lot

  // Data Finansial
  const financialData = [
    {
      year: "2026",
      period: "Q3 2026",
      title: "Laporan Keuangan Konsolidasian Unaudited Q3 2026",
      revenue: "Rp 1,24 Triliun",
      revenueNum: 1240,
      netProfit: "Rp 185 Miliar",
      growth: "+14.2% YoY",
      fileSize: "PDF • 3.2 MB",
      date: "30 Oktober 2026",
    },
    {
      year: "2026",
      period: "Q2 2026",
      title: "Laporan Keuangan Konsolidasian Unaudited Q2 2026",
      revenue: "Rp 810 Miliar",
      revenueNum: 810,
      netProfit: "Rp 120 Miliar",
      growth: "+12.8% YoY",
      fileSize: "PDF • 2.9 MB",
      date: "31 Juli 2026",
    },
    {
      year: "2026",
      period: "Q1 2026",
      title: "Laporan Keuangan Konsolidasian Unaudited Q1 2026",
      revenue: "Rp 390 Miliar",
      revenueNum: 390,
      netProfit: "Rp 58 Miliar",
      growth: "+10.5% YoY",
      fileSize: "PDF • 2.7 MB",
      date: "30 April 2026",
    },
    {
      year: "2025",
      period: "FY 2025",
      title: "Laporan Keuangan Audited Tahun Buku 2025 (FY 2025)",
      revenue: "Rp 1,45 Triliun",
      revenueNum: 1450,
      netProfit: "Rp 210 Miliar",
      growth: "+18.6% YoY",
      fileSize: "PDF • 4.5 MB",
      date: "28 Maret 2026",
    },
  ];

  // Hitung Dividen Simulator
  const dividendPerShare = 45; // Rp 45 / lembar saham
  const estimatedDividend = sharesCount * dividendPerShare;

  const filteredData = financialData.filter((item) => {
    const matchYear = selectedYear === "ALL" || item.year === selectedYear;
    const matchPeriod =
      selectedPeriod === "ALL" || item.period.includes(selectedPeriod);
    return matchYear && matchPeriod;
  });

  return (
    <div className="bg-[#F8FAFC] text-[#1A2233] min-h-screen pt-30 pb-16 antialiased">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* HEADER RINGKASAN STOK ALA IDX */}
        <div className="bg-[#0B2A5B] text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] w-full h-full" />
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6 relative z-10">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-300 font-semibold">
                  PT AutoCorp Tbk.
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black mt-1 tracking-tight">
                Hubungan Investor & Keuangan
              </h1>
            </div>

            {/* LIVE PRICE WIDGET (SIMULATED) */}
            <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex items-center gap-4">
              <div>
                <span className="text-[10px] text-slate-300 font-bold uppercase block">
                  Harga Saham (AUTO)
                </span>
                <p className="text-xl font-black text-white mt-0.5">
                  Rp 1.850{" "}
                  <span className="text-xs font-bold text-emerald-400">
                    +4.5%
                  </span>
                </p>
              </div>
              <div className="h-8 w-[1px] bg-white/20" />
              <div>
                <span className="text-[10px] text-slate-300 font-bold uppercase block">
                  Market Cap
                </span>
                <p className="text-sm font-extrabold text-white mt-0.5">
                  Rp 1,85 Triliun
                </p>
              </div>
            </div>
          </div>

          {/* QUICK FINANCIAL METRICS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative z-10 pt-2">
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
              <span className="text-[10px] text-slate-300 font-bold uppercase">
                Pendapatan Q3 YTD
              </span>
              <p className="text-lg font-black text-white mt-0.5">Rp 1,24 T</p>
              <span className="text-[10px] text-emerald-400 font-bold">
                ▲ +14.2% YoY
              </span>
            </div>

            <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
              <span className="text-[10px] text-slate-300 font-bold uppercase">
                Laba Bersih Q3 YTD
              </span>
              <p className="text-lg font-black text-white mt-0.5">Rp 185 M</p>
              <span className="text-[10px] text-emerald-400 font-bold">
                ▲ Margin 14.9%
              </span>
            </div>

            <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
              <span className="text-[10px] text-slate-300 font-bold uppercase">
                PE Ratio (TTM)
              </span>
              <p className="text-lg font-black text-white mt-0.5">9.8x</p>
              <span className="text-[10px] text-slate-300">Sektor Avg: 12.4x</span>
            </div>

            <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
              <span className="text-[10px] text-slate-300 font-bold uppercase">
                Dividend Yield
              </span>
              <p className="text-lg font-black text-white mt-0.5">4.8%</p>
              <span className="text-[10px] text-slate-300">
                Payout Ratio: 40%
              </span>
            </div>
          </div>
        </div>

        {/* INTERACTIVE DIVIDEND SIMULATOR */}
        <div className="bg-white rounded-2xl border border-[#E3E8EF] p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-[#0B2A5B] border-b border-slate-100 pb-3">
            <Calculator className="h-5 w-5 text-[#1E4FA3]" />
            <h2 className="text-base sm:text-lg font-extrabold">
              Kalkulator Estimasi Dividen Saham
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            <div className="sm:col-span-7 space-y-3">
              <label className="block text-xs font-bold text-slate-700">
                Masukkan Jumlah Lembar / Lot Saham Kamu:
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={sharesCount}
                  onChange={(e) => setSharesCount(Number(e.target.value) || 0)}
                  className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-900 focus:bg-white focus:border-[#1E4FA3] focus:outline-none"
                  placeholder="Contoh: 10000"
                />
                <span className="text-xs font-bold text-slate-500 shrink-0">
                  = {(sharesCount / 100).toLocaleString("id-ID")} Lot
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                *Berdasarkan pembagian dividen RUPS terakhir sebesar Rp 45 per lembar saham.
              </p>
            </div>

            <div className="sm:col-span-5 bg-blue-50 border border-blue-100 p-5 rounded-2xl text-center sm:text-right">
              <span className="text-[10px] font-bold text-[#1E4FA3] uppercase tracking-wider">
                Estimasi Total Dividen Diterima
              </span>
              <p className="text-2xl sm:text-3xl font-black text-[#0B2A5B] mt-1">
                Rp {estimatedDividend.toLocaleString("id-ID")}
              </p>
            </div>
          </div>
        </div>

        {/* BERKAS LAPORAN KEUANGAN & FILTER INTERAKTIF */}
        <div className="bg-white rounded-2xl border border-[#E3E8EF] p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#E3E8EF] pb-4">
            <div>
              <h2 className="text-lg font-extrabold text-[#0B2A5B]">
                Arsip Laporan Keuangan Publik
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Pilih filter tahun dan kuartal untuk mengunduh laporan keuangan resmi.
              </p>
            </div>

            {/* FILTER BUTTONS */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:bg-white focus:outline-none cursor-pointer"
              >
                <option value="ALL">Semua Tahun</option>
                <option value="2026">Tahun 2026</option>
                <option value="2025">Tahun 2025</option>
              </select>

              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:bg-white focus:outline-none cursor-pointer"
              >
                <option value="ALL">Semua Kuartal</option>
                <option value="Q1">Kuartal 1 (Q1)</option>
                <option value="Q2">Kuartal 2 (Q2)</option>
                <option value="Q3">Kuartal 3 (Q3)</option>
                <option value="FY">Audit Tahunan (FY)</option>
              </select>
            </div>
          </div>

          {/* LIST DOKUMEN LAPORAN */}
          <div className="space-y-3">
            {filteredData.length === 0 ? (
              <p className="text-xs text-center py-8 text-slate-400">
                Dokumen tidak ditemukan untuk filter ini.
              </p>
            ) : (
              filteredData.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-white hover:border-blue-200 transition"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="h-10 w-10 bg-blue-50 text-[#1E4FA3] rounded-xl flex items-center justify-center font-bold shrink-0 mt-0.5">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold text-[#1E4FA3] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                          {item.period}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          Dirilis: {item.date}
                        </span>
                      </div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                        {item.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Pendapatan:{" "}
                        <span className="font-bold text-slate-700">
                          {item.revenue}
                        </span>{" "}
                        • Laba Bersih:{" "}
                        <span className="font-bold text-slate-700">
                          {item.netProfit}
                        </span>
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0B2A5B] hover:bg-[#1E4FA3] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shrink-0 shadow-sm"
                  >
                    <Download className="h-4 w-4" />
                    <span>Unduh ({item.fileSize})</span>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}