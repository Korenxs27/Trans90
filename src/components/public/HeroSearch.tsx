"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Car, Key, Filter } from "lucide-react";

export default function HeroSearch() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"sewa" | "jual">("sewa");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("SEMUA");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const basePath = activeTab === "sewa" ? "/bisnis/sewa" : "/bisnis/jual-beli";
    const params = new URLSearchParams();

    if (query.trim()) params.set("q", query.trim());
    if (category !== "SEMUA") params.set("category", category);

    const queryString = params.toString();
    router.push(queryString ? `${basePath}?${queryString}` : basePath);
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-xl p-4 sm:p-6 transition-all">
      {/* TAB SWITCHER */}
      <div className="flex items-center gap-2 mb-5 border-b border-slate-100 pb-4">
        <button
          type="button"
          onClick={() => setActiveTab("sewa")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "sewa"
              ? "bg-[#0B2A5B] text-white shadow-md shadow-[#0B2A5B]/20"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
          }`}
        >
          <Car className="h-4 w-4" />
          <span>Cari Sewa Kendaraan</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("jual")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "jual"
              ? "bg-[#0B2A5B] text-white shadow-md shadow-[#0B2A5B]/20"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
          }`}
        >
          <Key className="h-4 w-4" />
          <span>Cari Unit Jual Beli</span>
        </button>
      </div>

      {/* SEARCH FORM */}
      <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
        {/* INPUT NAMA/MODEL */}
        <div className="sm:col-span-6 space-y-1.5">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Search className="h-3.5 w-3.5 text-[#1E4FA3]" />
            Nama / Model Kendaraan
          </label>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari Fortuner, NMAX, Zenix..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:border-[#1E4FA3] focus:ring-2 focus:ring-[#1E4FA3]/20 focus:outline-none transition"
          />
        </div>

        {/* INPUT KATEGORI */}
        <div className="sm:col-span-3 space-y-1.5">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Filter className="h-3.5 w-3.5 text-[#1E4FA3]" />
            Kategori
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:bg-white focus:border-[#1E4FA3] focus:ring-2 focus:ring-[#1E4FA3]/20 focus:outline-none transition cursor-pointer"
          >
            <option value="SEMUA">Semua (Mobil & Motor)</option>
            <option value="MOBIL">Mobil</option>
            <option value="MOTOR">Motor</option>
          </select>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="sm:col-span-3">
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#0B2A5B] hover:bg-[#1E4FA3] px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-[#0B2A5B]/20 transition active:scale-95"
          >
            <Search className="h-4 w-4" />
            <span>{activeTab === "sewa" ? "Cari Sewa" : "Cari Unit Jual"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}