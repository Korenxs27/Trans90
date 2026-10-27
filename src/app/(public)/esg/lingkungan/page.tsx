"use client";

import { useState } from "react";
import {
  Leaf,
  Zap,
  TreePine,
  Droplets,
  Calculator,
  CheckCircle2,
  BarChart3,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

export default function ESGLingkunganPage() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [fleetKm, setFleetKm] = useState<number>(5000); // Estimasi KM jarak tempuh sewa

  // Estimasi emisi ICE vs EV (gr CO2 / km)
  const evSavingsPerKm = 0.12; // Hemat 120g CO2/km dengan armada EV AutoCorp
  const totalCarbonSavedKg = (fleetKm * evSavingsPerKm).toFixed(1);
  const treesEquivalent = (Number(totalCarbonSavedKg) / 20).toFixed(1);

  const initiatives = [
    {
      title: "Transisi Armada EV (Electric Vehicle)",
      icon: Zap,
      badge: "Target 2030: 30% EV Fleet",
      metric: "120+ Unit EV",
      metricLabel: "Aktif Melayani Penyewaan",
      description:
        "Pengembangan ekosistem persewaan mobil dan motor listrik terintegrasi. Dilengkapi dengan fasilitas Stasiun Pengisian Kendaraan Listrik Umum (SPKLU) mandiri di depot AutoCorp.",
      highlights: [
        "Penghematan rata-rata 120g CO2 per kilometer dibanding mobil Bensin/Diesel.",
        "Integrasi sistem pelacak baterai cerdas via cloud Mini-ERP.",
        "Kerja sama pemeliharaan baterai dengan manufaktur resmi.",
      ],
    },
    {
      title: "Uji Emisi Berkala & Optimalisasi Rute",
      icon: TreePine,
      badge: "Zero Unchecked Vehicle",
      metric: "-24% Emisi CO2",
      metricLabel: "Penurunan YoY Tahun 2026",
      description:
        "Seluruh kendaraan konvensional (ICE) wajib mengikuti uji emisi berkala setiap 3 bulan. Sistem GPS ERP kami juga mengarahkan rute efisien untuk menekan konsumsi BBM.",
      highlights: [
        "100% armada lulus ambang batas standar emisi EURO 4.",
        "Sistem pemantauan gaya mengemudi (Eco-Driving) untuk driver korporat.",
        "Pemeliharaan filter udara & oli mesin berkala secara teratur.",
      ],
    },
    {
      title: "Pengelolaan Limbah B3 & Daur Ulang",
      icon: Droplets,
      badge: "Sertifikasi B3 Terpadu",
      metric: "100% Limbah B3",
      metricLabel: "Terkelola Sesuai Regulasi",
      description:
        "Limbah oli bekas, filter minyak, aki, serta komponen elektronik dari kegiatan bengkel purna jual disalurkan langsung ke mitra pengolah limbah B3 berizin resmi.",
      highlights: [
        "Penampungan oli bekas berstandar K3 di seluruh bengkel cabang.",
        "Program daur ulang aki & baterai bekas secara aman dan terdaftar.",
        "Pengurangan penggunaan kertas via invoice digital (Paperless).",
      ],
    },
  ];

  const currentInitiative = initiatives[activeTab];
  const IconActive = currentInitiative.icon;

  return (
    <div className="bg-[#F8FAFC] text-[#1A2233] min-h-screen pt-30 pb-16 antialiased">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* HEADER LINGKUNGAN */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h1 className="text-3xl sm:text-5xl font-black text-[#0B2A5B] tracking-tight">
            Keberlanjutan Lingkungan
          </h1>
        </div>

        {/* KALKULATOR EMISI KARBON INTERAKTIF (WARNA BIRU KORPORAT) */}
        <div className="bg-white rounded-2xl border border-[#E3E8EF] p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-[#0B2A5B] border-b border-slate-100 pb-3">
            <Calculator className="h-5 w-5 text-[#1E4FA3]" />
            <h2 className="text-base sm:text-lg font-extrabold">
              Kalkulator Simulasi Reduksi Emisi Karbon EV
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            <div className="sm:col-span-7 space-y-3">
              <label className="block text-xs font-bold text-slate-700">
                Simulasi Jarak Tempuh Sewa Armada (KM):
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="500"
                  max="50000"
                  step="500"
                  value={fleetKm}
                  onChange={(e) => setFleetKm(Number(e.target.value))}
                  className="w-full accent-[#0B2A5B] cursor-pointer"
                />
                <span className="text-xs font-black text-[#0B2A5B] bg-slate-100 px-3 py-1.5 rounded-lg border shrink-0">
                  {fleetKm.toLocaleString("id-ID")} KM
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                *Geser slider untuk mensimulasikan dampak pengurangan emisi dari penggunaan armada listrik (EV) AutoCorp.
              </p>
            </div>

            <div className="sm:col-span-5 bg-blue-50/80 border border-blue-100 p-5 rounded-2xl space-y-2 text-center sm:text-right">
              <span className="text-[10px] font-bold text-[#1E4FA3] uppercase tracking-wider block">
                Estimasi Emisi CO2 Terhemat
              </span>
              <p className="text-2xl sm:text-3xl font-black text-[#0B2A5B]">
                {totalCarbonSavedKg} Kg CO2
              </p>
              <p className="text-[11px] font-semibold text-[#1E4FA3]">
                Setara menanam ± {treesEquivalent} pohon dewasa/tahun 🌳
              </p>
            </div>
          </div>
        </div>

        {/* TABS INTERAKTIF INISIATIF LINGKUNGAN */}
        <div className="bg-white rounded-2xl border border-[#E3E8EF] p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-extrabold text-[#0B2A5B]">
              Pilar Kebijakan Lingkungan Perusahaan
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Pilih tab di bawah untuk mengeksplorasi perincian dan capaian riil tiap program.
            </p>
          </div>

          {/* TAB BUTTONS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-b border-slate-100 pb-4">
            {initiatives.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className={`p-4 rounded-xl text-left border transition-all ${
                    activeTab === idx
                      ? "bg-blue-50/80 border-[#1E4FA3] shadow-sm"
                      : "bg-slate-50/50 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <IconComp
                      className={`h-4 w-4 ${
                        activeTab === idx ? "text-[#1E4FA3]" : "text-slate-400"
                      }`}
                    />
                    <span className="text-[10px] font-bold uppercase text-slate-400">
                      Pilar 0{idx + 1}
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 line-clamp-1">
                    {item.title}
                  </h3>
                </button>
              );
            })}
          </div>

          {/* TAB CONTENT DETAIL */}
          <div className="space-y-6 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/80 p-5 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-3.5">
                <div className="h-11 w-11 bg-blue-100 text-[#1E4FA3] rounded-xl flex items-center justify-center font-bold shrink-0">
                  <IconActive className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#1E4FA3] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                    {currentInitiative.badge}
                  </span>
                  <h3 className="text-base font-extrabold text-[#0B2A5B] mt-1">
                    {currentInitiative.title}
                  </h3>
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-right shrink-0">
                <p className="text-lg font-black text-[#0B2A5B]">
                  {currentInitiative.metric}
                </p>
                <p className="text-[10px] font-semibold text-slate-400">
                  {currentInitiative.metricLabel}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#586678] leading-relaxed">
              {currentInitiative.description}
            </p>

            <div className="space-y-2 pt-2 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-800">Capaian & Implementasi Utama:</h4>
              <ul className="space-y-2 text-xs text-[#586678]">
                {currentInitiative.highlights.map((point, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#1E4FA3] shrink-0 mt-0.5" />
                    <span>{point}</span>
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