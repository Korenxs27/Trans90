"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  FolderTree,
  Plus,
  Search,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  RefreshCw,
  Eye,
  Layers,
  X,
  PlusCircle,
} from "lucide-react";
import { COAAccountWithBalance } from "./page";

interface SummaryStats {
  totalAssets: number;
  totalLiabilities: number;
  totalEquity: number;
  totalRevenue: number;
  totalExpense: number;
  netIncome: number;
  isBalanced: boolean;
}

interface Props {
  initialAccounts: COAAccountWithBalance[];
  summaryStats: SummaryStats;
}

export default function COAReportClient({ initialAccounts, summaryStats }: Props) {
  const router = useRouter();
  const [accounts, setAccounts] = useState<COAAccountWithBalance[]>(initialAccounts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("ALL");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedAccountLedger, setSelectedAccountLedger] = useState<COAAccountWithBalance | null>(null);

  // Form State Akun Baru
  const [newAccCode, setNewAccCode] = useState("");
  const [newAccName, setNewAccName] = useState("");
  const [newAccType, setNewAccType] = useState("ASSET");
  const [newAccIsHeader, setNewAccIsHeader] = useState(false);
  const [newAccParentCode, setNewAccParentCode] = useState("");
  const [newAccDescription, setNewAccDescription] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync Data Realtime
  const handleRefresh = () => {
    setIsRefreshing(true);
    router.refresh();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  // Filter Search & Type
  const filteredAccounts = useMemo(() => {
    return accounts.filter((acc) => {
      const matchSearch =
        acc.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        acc.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchType = selectedType === "ALL" || acc.type === selectedType;
      return matchSearch && matchType;
    });
  }, [accounts, searchTerm, selectedType]);

  // Format IDR
  const formatIDR = (val: number) => {
    const formatted = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(Math.abs(val));

    return val < 0 ? `(${formatted})` : formatted;
  };

  // Submit Handler Akun COA Baru
  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/admin/coa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: newAccCode,
          name: newAccName,
          type: newAccType,
          isHeader: newAccIsHeader,
          parentCode: newAccParentCode || null,
          description: newAccDescription || null,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal membuat akun");

      setIsAddModalOpen(false);
      setNewAccCode("");
      setNewAccName("");
      setNewAccDescription("");
      handleRefresh();
    } catch (err: any) {
      setFormError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-4 lg:p-8 space-y-6 font-sans selection:bg-blue-600 selection:text-white">
      
      {/* 1. HEADER & ACTION BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
            <FolderTree className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Bagan Akun (COA)</h1>
            <p className="text-xs text-slate-500 font-medium">
              Master data akun terintegrasi real-time dari Jurnal Umum & Buku Besar.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 shadow-sm transition disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`h-4 w-4 text-slate-500 ${isRefreshing ? "animate-spin text-blue-600" : ""}`} />
            Sync Realtime
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-blue-600/25 hover:bg-blue-700 active:scale-95 transition cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Tambah Akun
          </button>
        </div>
      </div>

      {/* 2. SUMMARY KONTROL SILANG (CARD WHITE SLATE) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Aset</span>
          <div className="text-xl font-extrabold text-emerald-600 mt-1 font-mono">{formatIDR(summaryStats.totalAssets)}</div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Liabilitas & Ekuitas</span>
          <div className="text-xl font-extrabold text-blue-600 mt-1 font-mono">
            {formatIDR(summaryStats.totalLiabilities + summaryStats.totalEquity)}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Laba Bersih Berjalan</span>
          <div className={`text-xl font-extrabold mt-1 font-mono ${summaryStats.netIncome >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
            {formatIDR(summaryStats.netIncome)}
          </div>
        </div>

        <div className={`rounded-2xl border p-4 shadow-sm flex items-center justify-between ${
          summaryStats.isBalanced
            ? "border-emerald-200 bg-emerald-50/60 text-emerald-800"
            : "border-rose-200 bg-rose-50/60 text-rose-800"
        }`}>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider block opacity-75">Validasi Akuntansi</span>
            <span className="text-sm font-extrabold">
              {summaryStats.isBalanced ? "Persamaan Seimbang" : "Selisih Ditemukan!"}
            </span>
          </div>
          {summaryStats.isBalanced ? (
            <CheckCircle2 className="h-8 w-8 text-emerald-600" />
          ) : (
            <AlertTriangle className="h-8 w-8 text-rose-600 animate-bounce" />
          )}
        </div>
      </div>

      {/* 3. FILTER & SEARCH BAR */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari kode atau nama akun..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none transition-all"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {["ALL", "ASSET", "LIABILITY", "EQUITY", "REVENUE", "EXPENSE"].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer ${
                selectedType === type
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
              }`}
            >
              {type === "ALL" ? "Semua Tipe" : type}
            </button>
          ))}
        </div>
      </div>

      {/* 4. TABEL COA CLEAN WHITE */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-100/80 text-[10px] uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4 font-bold">Kode Akun</th>
                <th className="py-3.5 px-4 font-bold">Nama Akun</th>
                <th className="py-3.5 px-4 font-bold">Tipe</th>
                <th className="py-3.5 px-4 font-bold text-right">Total Debit</th>
                <th className="py-3.5 px-4 font-bold text-right">Total Kredit</th>
                <th className="py-3.5 px-4 font-bold text-right">Saldo Bersih</th>
                <th className="py-3.5 px-4 font-bold text-center">Jurnal</th>
                <th className="py-3.5 px-4 font-bold text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {filteredAccounts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400 font-sans">
                    Tidak ada akun yang sesuai.
                  </td>
                </tr>
              ) : (
                filteredAccounts.map((acc) => (
                  <tr
                    key={acc.id}
                    className={`hover:bg-blue-50/40 transition-colors ${
                      acc.isHeader ? "bg-slate-50/80 font-bold text-slate-900" : ""
                    }`}
                  >
                    <td className="py-3 px-4 text-blue-600 font-bold">{acc.code}</td>
                    <td className="py-3 px-4 font-sans font-medium text-slate-800">
                      <div className="flex items-center gap-2">
                        {acc.isHeader && <Layers className="h-3.5 w-3.5 text-blue-600" />}
                        <span>{acc.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-sans">
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-[9px] font-extrabold uppercase ${
                        acc.type === "ASSET" ? "bg-emerald-100 text-emerald-700 border border-emerald-200" :
                        acc.type === "LIABILITY" ? "bg-amber-100 text-amber-700 border border-amber-200" :
                        acc.type === "EQUITY" ? "bg-purple-100 text-purple-700 border border-purple-200" :
                        acc.type === "REVENUE" ? "bg-blue-100 text-blue-700 border border-blue-200" :
                        "bg-rose-100 text-rose-700 border border-rose-200"
                      }`}>
                        {acc.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-slate-500">{formatIDR(acc.debitTotal)}</td>
                    <td className="py-3 px-4 text-right text-slate-500">{formatIDR(acc.creditTotal)}</td>
                    <td className={`py-3 px-4 text-right font-bold ${
                      acc.netBalance < 0 ? "text-rose-600" : "text-emerald-600"
                    }`}>
                      {formatIDR(acc.netBalance)}
                    </td>
                    <td className="py-3 px-4 text-center font-sans">
                      <span className="rounded-md bg-slate-100 border border-slate-200 px-2 py-0.5 text-[10px] text-slate-600 font-semibold">
                        {acc.journalCount} Tx
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => setSelectedAccountLedger(acc)}
                        className="rounded-lg bg-blue-50 border border-blue-100 hover:bg-blue-600 text-blue-600 hover:text-white p-1.5 transition cursor-pointer shadow-sm"
                        title="Drill-Down Buku Besar"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. MODAL DRILL-DOWN LIGHT MODE */}
      {selectedAccountLedger && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl text-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">Drill-Down Akun</span>
                <h3 className="text-lg font-extrabold text-slate-900">
                  {selectedAccountLedger.code} - {selectedAccountLedger.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedAccountLedger(null)}
                className="rounded-xl border border-slate-200 bg-slate-50 p-1.5 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 text-xs bg-slate-50 p-3.5 rounded-2xl border border-slate-200 font-mono">
              <div>
                <span className="text-slate-400 block text-[10px] font-sans">TOTAL DEBIT</span>
                <span className="font-bold text-slate-800">{formatIDR(selectedAccountLedger.debitTotal)}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-sans">TOTAL KREDIT</span>
                <span className="font-bold text-slate-800">{formatIDR(selectedAccountLedger.creditTotal)}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] font-sans">SALDO BERSIH</span>
                <span className="font-bold text-emerald-600">{formatIDR(selectedAccountLedger.netBalance)}</span>
              </div>
            </div>

            <div className="text-center py-3 text-slate-500 text-xs">
              <p>Akun ini telah dipakai dalam {selectedAccountLedger.journalCount} entri baris jurnal.</p>
              <button
                onClick={() => router.push(`/admin/buku-besar?accountId=${selectedAccountLedger.id}`)}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-700 shadow-md shadow-blue-600/20 transition cursor-pointer"
              >
                Lihat Buku Besar Lengkap <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. MODAL TAMBAH AKUN LIGHT MODE */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl text-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <PlusCircle className="h-5 w-5 text-blue-600" />
                <h3 className="text-base font-bold text-slate-900">Tambah Akun COA Baru</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {formError && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-600 font-medium">
                {formError}
              </div>
            )}

            <form onSubmit={handleCreateAccount} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Kode Akun (misal: 101.01)</label>
                <input
                  type="text"
                  required
                  value={newAccCode}
                  onChange={(e) => setNewAccCode(e.target.value)}
                  placeholder="Kode Akun"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-800 focus:border-blue-600 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Akun</label>
                <input
                  type="text"
                  required
                  value={newAccName}
                  onChange={(e) => setNewAccName(e.target.value)}
                  placeholder="Nama Akun"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-800 focus:border-blue-600 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Tipe Akun</label>
                <select
                  value={newAccType}
                  onChange={(e) => setNewAccType(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 focus:border-blue-600 focus:bg-white focus:outline-none"
                >
                  <option value="ASSET">ASSET (Aset)</option>
                  <option value="LIABILITY">LIABILITY (Liabilitas / Hutang)</option>
                  <option value="EQUITY">EQUITY (Ekuitas / Modal)</option>
                  <option value="REVENUE">REVENUE (Pendapatan)</option>
                  <option value="EXPENSE">EXPENSE (Beban)</option>
                </select>
              </div>

              <div className="flex items-center gap-2 py-1">
                <input
                  type="checkbox"
                  id="isHeader"
                  checked={newAccIsHeader}
                  onChange={(e) => setNewAccIsHeader(e.target.checked)}
                  className="rounded border-slate-300 bg-slate-50 text-blue-600 focus:ring-0 cursor-pointer"
                />
                <label htmlFor="isHeader" className="text-xs text-slate-700 cursor-pointer">
                  Jadikan Akun Induk (Header)
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-blue-600 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-blue-600/20 hover:bg-blue-700 disabled:opacity-50 transition cursor-pointer"
              >
                {isSubmitting ? "Simpan..." : "Simpan Akun Baru"}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}