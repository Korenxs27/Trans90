"use client";

import { useState } from "react";
import {
  ShieldCheck,
  Car,
  FileCheck,
  Coins,
  ChevronDown,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Activity,
  ArrowRight,
} from "lucide-react";

export default function ManajemenRisikoPage() {
  const [activeTab, setActiveTab] = useState<string>("armada");
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  const riskData = {
    armada: {
      category: "Risiko Kelayakan & Teknis Armada",
      icon: Car,
      level: "Sedang → Rendah (Termitigasi)",
      color: "bg-blue-50 text-[#1E4FA3] border-blue-100",
      description:
        "Potensi gangguan teknis atau kerusakan unit saat digunakan pelanggan sewa maupun kendaraan jual beli.",
      mitigations: [
        {
          title: "Inspeksi Ketat 150+ Titik",
          detail:
            "Setiap unit sewa dan jual beli wajib lulus uji kelayakan mencakup mesin, transmisi, pengereman, kelistrikan, dan kondisi bodi sebelum dirilis ke katalog.",
        },
        {
          title: "Pemeliharaan Berkala di Bengkel Resmi",
          detail:
            "Jadwal servis rutin terintegrasi otomatis dalam sistem ERP untuk mencegah keausan komponen secara prematur.",
        },
        {
          title: "Fasilitas Replacement Unit & Towing 24/7",
          detail:
            "Jaminan penggantian unit sewa dalam kurun waktu < 2 jam jika terjadi kendala mesin di jalan.",
        },
      ],
    },
    legal: {
      category: "Risiko Legalitas & Kelengkapan Dokumen",
      icon: FileCheck,
      level: "Rendah (Sangat Terkontrol)",
      color: "bg-emerald-50 text-emerald-700 border-emerald-100",
      description:
        "Potensi sengketa kepemilikan, pajak mati, atau ketidaklengkapan dokumen kendaraan (STNK & BPKB).",
      mitigations: [
        {
          title: "Verifikasi Legalitas 3 Lapis",
          detail:
            "Pengecekan keabsahan dokumen fisik dan digital ke Samsat serta kepolisian sebelum unit dipublikasikan.",
        },
        {
          title: "Manajemen Pajak Otomatis",
          detail:
            "Pengingat jatuh tempo pajak STNK berbasis sistem cloud agar seluruh armada selalu dalam kondisi pajak aktif.",
        },
        {
          title: "Garansi Keabsahan Dokumen 100%",
          detail:
            "Jaminan uang kembali penuh untuk transaksi jual beli jika ditemukan cacat hukum pada dokumen kendaraan.",
        },
      ],
    },
    finansial: {
      category: "Risiko Keuangan & Kredit Pemohon",
      icon: Coins,
      level: "Sedang (Termitigasi)",
      color: "bg-amber-50 text-amber-700 border-amber-100",
      description:
        "Potensi gagal bayar penyewa, klaim asuransi berbelit, atau kegagalan transaksi penyewaan lepas kunci.",
      mitigations: [
        {
          title: "Sistem Scoring & Screening Pelanggan",
          detail:
            "Verifikasi identitas e-KTP, SIM, dan rekam jejak penyewa lepas kunci sebelum persetujuan sewa.",
        },
        {
          title: "Asuransi All-Risk Komprehensif",
          detail:
            "Seluruh unit dilindungi oleh asuransi All-Risk untuk meminimalisir beban finansial saat terjadi kecelakaan.",
        },
        {
          title: "Sistem Pembayaran Digital Terintegrasi",
          detail:
            "Transaksi sewa dan deposit dilakukan via payment gateway resmi tanpa ada pembayaran tunai di lapangan.",
        },
      ],
    },
    keamanan: {
      category: "Risiko Keamanan & Pelacakan Unit",
      icon: Lock,
      level: "Rendah (Terkontrol)",
      color: "bg-purple-50 text-purple-700 border-purple-100",
      description:
        "Potensi penggelapan unit sewa atau penyalahgunaan kendaraan di luar wilayah perjanjian.",
    mitigations: [
        {
          title: "Pemasangan Dual-GPS Tracking System",
          detail:
            "Modul pelacak lokasi real-time tersembunyi dengan sensor geofencing dan pembatas wilayah operasional.",
        },
        {
          title: "Fitur Engine Cut-Off Jarak Jauh",
          detail:
            "Kemampuan mematikan mesin secara remote melalui sistem ERP pusat jika terdeteksi indikasi pelanggaran wilayah.",
        },
        {
          title: "Tim Respon Cepat (Rapid Response)",
          detail:
            "Kerja sama dengan jaringan tim lapangan dan kepolisian untuk penanganan situasi darurat 24 jam.",
        },
      ],
    },
  };

  const currentData = riskData[activeTab as keyof typeof riskData];
  const IconActive = currentData.icon;

  return (
    <div className="bg-[#F8FAFC] text-[#1A2233] min-h-screen pt-30 pb-16 antialiased">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h1 className="text-3xl sm:text-5xl font-black text-[#0B2A5B] tracking-tight">
            Manajemen Risiko Terpadu
          </h1>
        </div>

        {/* METRIK IKHTISAR PEMANTAUAN */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E3E8EF] shadow-sm space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Indeks Mitigasi</span>
            <p className="text-xl sm:text-2xl font-black text-[#0B2A5B]">99.4%</p>
            <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" /> Target Tercapai
            </p>
          </div>
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E3E8EF] shadow-sm space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Inspeksi Armada</span>
            <p className="text-xl sm:text-2xl font-black text-[#0B2A5B]">150+ Titik</p>
            <p className="text-[11px] text-slate-500 font-medium">Standar QC Berlapis</p>
          </div>
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E3E8EF] shadow-sm space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Proteksi Unit</span>
            <p className="text-xl sm:text-2xl font-black text-[#0B2A5B]">100% EV & IC</p>
            <p className="text-[11px] text-slate-500 font-medium">Asuransi All-Risk</p>
          </div>
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E3E8EF] shadow-sm space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Respon Darurat</span>
            <p className="text-xl sm:text-2xl font-black text-[#0B2A5B]">&lt; 30 Menit</p>
            <p className="text-[11px] text-[#1E4FA3] font-semibold">Tim Roadside 24/7</p>
          </div>
        </div>

        {/* TAB INTERAKTIF KATEGORI RISIKO */}
        <div className="bg-white rounded-2xl border border-[#E3E8EF] p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-extrabold text-[#0B2A5B]">Pilih Kategori Risiko</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Klik tab di bawah untuk melihat strategi mitigasi spesifik di tiap area operasional.
            </p>
          </div>

          {/* TAB BUTTONS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 border-b border-slate-100 pb-4">
            <button
              type="button"
              onClick={() => {
                setActiveTab("armada");
                setOpenAccordion(0);
              }}
              className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "armada"
                  ? "bg-[#0B2A5B] text-white shadow-md shadow-[#0B2A5B]/20"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <Car className="h-4 w-4" />
              <span>Armada & Teknis</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab("legal");
                setOpenAccordion(0);
              }}
              className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "legal"
                  ? "bg-[#0B2A5B] text-white shadow-md shadow-[#0B2A5B]/20"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <FileCheck className="h-4 w-4" />
              <span>Legalitas Surat</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab("finansial");
                setOpenAccordion(0);
              }}
              className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "finansial"
                  ? "bg-[#0B2A5B] text-white shadow-md shadow-[#0B2A5B]/20"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <Coins className="h-4 w-4" />
              <span>Keuangan & Kredit</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab("keamanan");
                setOpenAccordion(0);
              }}
              className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "keamanan"
                  ? "bg-[#0B2A5B] text-white shadow-md shadow-[#0B2A5B]/20"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <Lock className="h-4 w-4" />
              <span>Keamanan GPS</span>
            </button>
          </div>

          {/* TAB CONTENT DETAIL */}
          <div className="space-y-6 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/80 p-4 rounded-xl border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-blue-50 text-[#1E4FA3] rounded-xl flex items-center justify-center font-bold shrink-0">
                  <IconActive className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-[#0B2A5B]">{currentData.category}</h3>
                  <p className="text-xs text-[#586678] mt-0.5">{currentData.description}</p>
                </div>
              </div>
              <span className={`text-[10px] font-bold px-3 py-1 rounded-full border shrink-0 ${currentData.color}`}>
                Status: {currentData.level}
              </span>
            </div>

            {/* ACCORDION INTERAKTIF LANGKAH MITIGASI */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Langkah Mitigasi & Pengendalian Operasional
              </h4>

              {currentData.mitigations.map((item, idx) => {
                const isOpen = openAccordion === idx;
                return (
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-xl overflow-hidden transition-all bg-white"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenAccordion(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="h-6 w-6 rounded-lg bg-blue-50 text-[#1E4FA3] text-xs font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-slate-800">
                          {item.title}
                        </span>
                      </div>
                      <ChevronDown
                        className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-[#1E4FA3]" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-xs text-[#586678] leading-relaxed border-t border-slate-100 bg-slate-50/30">
                        {item.detail}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}