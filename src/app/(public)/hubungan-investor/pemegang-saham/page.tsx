"use client";

import { useState } from "react";
import { PieChart, Users, Building2, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function PemegangSahamPage() {
  const [activeSegment, setActiveSegment] = useState<number | null>(null);

  const shareholders = [
    {
      name: "PT AutoCorp Holdings Indonesia",
      status: "Pengendali Utama / Induk",
      shares: "650.000.000",
      percentage: 65,
      color: "bg-[#0B2A5B]",
      barWidth: "w-[65%]",
    },
    {
      name: "Masyarakat / Publik (Masing-masing < 5%)",
      status: "Publik / Non-Pengendali",
      shares: "300.000.000",
      percentage: 30,
      color: "bg-[#1E4FA3]",
      barWidth: "w-[30%]",
    },
    {
      name: "Hendrik Prasetya (Direktur Utama)",
      status: "Manajemen / Direksi",
      shares: "30.000.000",
      percentage: 3,
      color: "bg-blue-400",
      barWidth: "w-[3%]",
    },
    {
      name: "Siti Rahmawati (Direktur Keuangan)",
      status: "Manajemen / Direksi",
      shares: "20.000.000",
      percentage: 2,
      color: "bg-blue-300",
      barWidth: "w-[2%]",
    },
  ];

  return (
    <div className="bg-[#F8FAFC] text-[#1A2233] min-h-screen pt-30 pb-16 antialiased">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h1 className="text-3xl sm:text-5xl font-black text-[#0B2A5B] tracking-tight">
            Pemegang Saham
          </h1>
        </div>

        {/* VISUAL BAR CHART INTERAKTIF */}
        <div className="bg-white rounded-2xl border border-[#E3E8EF] p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-extrabold text-[#0B2A5B]">
              Visualisasi Proporsi Kepemilikan Saham
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Arahkan atau klik porsi saham di bawah untuk sorotan detail.
            </p>
          </div>

          {/* COMPOSITE BAR */}
          <div className="h-8 w-full bg-slate-100 rounded-xl overflow-hidden flex shadow-inner p-1 gap-1">
            {shareholders.map((item, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setActiveSegment(idx)}
                onMouseLeave={() => setActiveSegment(null)}
                className={`${item.color} ${item.barWidth} h-full rounded-lg transition-all cursor-pointer hover:opacity-80`}
                title={`${item.name}: ${item.percentage}%`}
              />
            ))}
          </div>

          {/* LIST LEGEND DETAIL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {shareholders.map((item, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border transition-all ${
                  activeSegment === idx
                    ? "border-[#1E4FA3] bg-blue-50/50"
                    : "border-slate-200 bg-slate-50/50"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`h-3 w-3 rounded-full ${item.color}`} />
                    <span className="text-xs font-bold text-slate-900 line-clamp-1">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-xs font-black text-[#0B2A5B]">
                    {item.percentage}%
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1 pl-5">
                  {item.status} • <span className="font-semibold text-slate-700">{item.shares} Lembar</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}