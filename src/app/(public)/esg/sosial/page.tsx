"use client";

import { useState } from "react";
import {
  Heart,
  Users,
  ShieldCheck,
  Award,
  CheckCircle2,
  ChevronDown,
  UserCheck,
  Building,
  GraduationCap,
} from "lucide-react";

export default function ESGSosialPage() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  const socialInitiatives = [
    {
      title: "Keselamatan & Sertifikasi Pengemudi",
      icon: ShieldCheck,
      badge: "Zero Accident Program",
      metric: "100% Certified",
      metricLabel: "Driver Lulus Defensive Driving",
      description:
        "Program pelatihan wajib berkala bagi seluruh driver armada rental mencakup teknik mengemudi aman, etika pelayanan pelanggan, serta pertolongan pertama pada kecelakaan (P3K).",
      faqs: [
        {
          q: "Apa saja materi pelatihan utama pengemudi?",
          a: "Materi mencakup Defensive Driving Technique, penanganan darurat mesin di jalan, pemahaman GPS ERP, dan standar pelayanan ramah (Service Excellence).",
        },
        {
          q: "Bagaimana pemantauan kinerja harian driver?",
          a: "Sistem ERP memantau skor jam kerja, jeda istirahat wajib, serta performa berkendara secara real-time demi mencegah kelelahan (fatigue).",
        },
      ],
    },
    {
      title: "Kesejahteraan & Kesetaraan Tenaga Kerja",
      icon: UserCheck,
      badge: "Inklusi & Kesejahteraan",
      metric: "4.8 / 5.0",
      metricLabel: "Indeks Kepuasan Karyawan",
      description:
        "Menciptakan lingkungan kerja yang aman, adil, dan inklusif. Menjamin perlindungan BPJS Kesehatan & Ketenagakerjaan penuh, gaji di atas UMR, serta kesetaraan gender di seluruh level manajemen.",
      faqs: [
        {
          q: "Bagaimana komitmen perusahaan terhadap kesetaraan gender?",
          a: "AutoCorp membuka peluang karir setara, di mana saat ini 35%+ posisi manajerial diisi oleh tenaga kerja perempuan.",
        },
        {
          q: "Apakah ada jaminan keselamatan kerja di bengkel?",
          a: "Seluruh teknisi wajib mematuhi standar K3 (Keselamatan dan Kesehatan Kerja) dengan perlengkapan APD lengkap.",
        },
      ],
    },
    {
      title: "Tanggung Jawab Sosial (CSR) & Pendidikan",
      icon: GraduationCap,
      badge: "Pemberdayaan Lokal",
      metric: "500+ Siswa SMK",
      metricLabel: "Menerima Pelatihan Otomotif",
      description:
        "Program 'AutoCorp Mengajar' yang memberikan pelatihan praktis perawatan kendaraan dan teknologi EV bagi siswa SMK Otomotif lokal serta penyediaan armada darurat bencana.",
      faqs: [
        {
          q: "Apa fokus utama program CSR tahun ini?",
          a: "Fokus utama adalah transfer pengetahuan teknis perbaikan kendaraan listrik (EV) serta penyaluran beasiswa ikatan kerja bagi lulusan SMK berprestasi.",
        },
      ],
    },
  ];

  const currentData = socialInitiatives[activeTab];
  const IconActive = currentData.icon;

  return (
    <div className="bg-[#F8FAFC] text-[#1A2233] min-h-screen pt-30 pb-16 antialiased">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h1 className="text-3xl sm:text-5xl font-black text-[#0B2A5B] tracking-tight">
            Tanggung Jawab Sosial
          </h1>
        </div>

        {/* METRIK IKHTISAR SOSIAL */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#E3E8EF] shadow-sm space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Pelatihan Driver</span>
            <p className="text-xl sm:text-2xl font-black text-[#0B2A5B]">100% Certified</p>
            <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" /> Defensive Driving
            </p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#E3E8EF] shadow-sm space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Perlindungan K3</span>
            <p className="text-xl sm:text-2xl font-black text-[#0B2A5B]">BPJS Full</p>
            <p className="text-[11px] text-slate-500 font-medium">Seluruh Karyawan</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#E3E8EF] shadow-sm space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Inklusi Gender</span>
            <p className="text-xl sm:text-2xl font-black text-[#0B2A5B]">35%+</p>
            <p className="text-[11px] text-slate-500 font-medium">Perempuan di Manajemen</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#E3E8EF] shadow-sm space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Penerima CSR</span>
            <p className="text-xl sm:text-2xl font-black text-[#0B2A5B]">500+ SMK</p>
            <p className="text-[11px] text-[#1E4FA3] font-semibold">Binaan Otomotif</p>
          </div>
        </div>

        {/* TABS INTERAKTIF PILAR SOSIAL */}
        <div className="bg-white rounded-2xl border border-[#E3E8EF] p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-extrabold text-[#0B2A5B]">Pilih Inisiatif Sosial</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Klik tab untuk melihat program keselamatan, kesejahteraan kerja, dan kontribusi komunitas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-b border-slate-100 pb-4">
            {socialInitiatives.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setActiveTab(idx);
                    setOpenAccordion(0);
                  }}
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

          {/* DETAIL PILAR AKTIF */}
          <div className="space-y-6 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/80 p-5 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-3.5">
                <div className="h-11 w-11 bg-blue-100 text-[#1E4FA3] rounded-xl flex items-center justify-center font-bold shrink-0">
                  <IconActive className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#1E4FA3] bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                    {currentData.badge}
                  </span>
                  <h3 className="text-base font-extrabold text-[#0B2A5B] mt-1">
                    {currentData.title}
                  </h3>
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-right shrink-0">
                <p className="text-lg font-black text-[#0B2A5B]">{currentData.metric}</p>
                <p className="text-[10px] font-semibold text-slate-400">{currentData.metricLabel}</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#586678] leading-relaxed">
              {currentData.description}
            </p>

            {/* ACCORDION FAQ */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Detail Pelaksanaan & Tanya Jawab
              </h4>

              {currentData.faqs.map((faq, idx) => {
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
                      <span className="text-xs sm:text-sm font-bold text-slate-800">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-[#1E4FA3]" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-xs text-[#586678] leading-relaxed border-t border-slate-100 bg-slate-50/30">
                        {faq.a}
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