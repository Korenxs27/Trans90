"use client";

import { useState } from "react";
import {
  ShieldCheck,
  Scale,
  Lock,
  CheckCircle2,
  FileCheck,
  Eye,
  Award,
  ChevronDown,
} from "lucide-react";

export default function ESGTataKelolaPage() {
  const [activeGovernance, setActiveGovernance] = useState<number>(0);

  const governancePillars = [
    {
      title: "Pengawasan Komite ESG & Risiko",
      icon: ShieldCheck,
      badge: "Standar GRI Compliant",
      desc: "Komite khusus yang bertanggung jawab langsung kepada Dewan Komisaris dalam mengevaluasi pencapaian emisi, efisiensi energi, serta kepatuhan etika bisnis.",
      checklist: [
        "Audit berkala pencapaian target emisi karbon tahunan.",
        "Evaluasi independen terhadap risiko keselamatan pengemudi & unit.",
        "Penyusunan Laporan Keberlanjutan berstandar Global Reporting Initiative (GRI).",
      ],
    },
    {
      title: "Perlindungan Data & Kerahasiaan Pelanggan",
      icon: Lock,
      badge: "ISO / IEC 27001",
      desc: "Penerapan standar keamanan informasi tingkat tinggi untuk melindungi dokumen KTP, SIM, serta data transaksi keuangan pengguna platform sewa.",
      checklist: [
        "Enkripsi data sensitif pengguna pada database cloud Supabase.",
        "Akses terbatas berbasis peran (Role-Based Access Control) bagi staf admin.",
        "Pemeriksaan penetrasi (Pen-Test) keamanan sistem secara berkala.",
      ],
    },
    {
      title: "Kebijakan Anti-Korupsi & Gratifikasi",
      icon: Scale,
      badge: "Zero Tolerance Policy",
      desc: "Prinsip tegas menolak segala bentuk suap, komisi tak resmi, maupun gratifikasi dalam pengadaan armada kendaraan dan suku cadang.",
      checklist: [
        "Sistem Whistleblowing System (WBS) independen via email wbs@autocorp.id.",
        "Kewajiban penandatanganan Pakta Integritas bagi seluruh vendor & staf.",
        "Pemeriksaan riwayat transaksi secara otomatis via log Mini-ERP.",
      ],
    },
  ];

  const currentPillar = governancePillars[activeGovernance];
  const IconActive = currentPillar.icon;

  return (
    <div className="bg-[#F8FAFC] text-[#1A2233] min-h-screen pt-30 pb-16 antialiased">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h1 className="text-3xl sm:text-5xl font-black text-[#0B2A5B] tracking-tight">
            Tata Kelola Keberlanjutan
          </h1>
        </div>

        {/* TABS INTERAKTIF PILAR GOVERNANCE */}
        <div className="bg-white rounded-2xl border border-[#E3E8EF] p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-extrabold text-[#0B2A5B]">
              Matriks Pengawasan Tata Kelola
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Pilih pilar di bawah untuk melihat standar kepatuhan dan sistem pengamanan.
            </p>
          </div>

          {/* TAB BUTTONS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-b border-slate-100 pb-4">
            {governancePillars.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveGovernance(idx)}
                  className={`p-4 rounded-xl text-left border transition-all ${
                    activeGovernance === idx
                      ? "bg-blue-50/80 border-[#1E4FA3] shadow-sm"
                      : "bg-slate-50/50 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <IconComp
                      className={`h-4 w-4 ${
                        activeGovernance === idx ? "text-[#1E4FA3]" : "text-slate-400"
                      }`}
                    />
                    <span className="text-[10px] font-bold uppercase text-slate-400">
                      Prinsip 0{idx + 1}
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 line-clamp-1">
                    {item.title}
                  </h3>
                </button>
              );
            })}
          </div>

          {/* DETAIL GOVERNANCE AKTIF */}
          <div className="space-y-6 pt-2">
            <div className="flex items-center gap-3.5 bg-slate-50/80 p-5 rounded-2xl border border-slate-200">
              <div className="h-11 w-11 bg-blue-100 text-[#1E4FA3] rounded-xl flex items-center justify-center font-bold shrink-0">
                <IconActive className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#1E4FA3] bg-blue-50 px-2.5 py-0.5 rounded border border-blue-100">
                  {currentPillar.badge}
                </span>
                <h3 className="text-base font-extrabold text-[#0B2A5B] mt-1">
                  {currentPillar.title}
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#586678] leading-relaxed">
              {currentPillar.desc}
            </p>

            <div className="space-y-2 pt-2 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-800">Checklist Kepatuhan & Eksekusi:</h4>
              <ul className="space-y-2 text-xs text-[#586678]">
                {currentPillar.checklist.map((check, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{check}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}