// app/admin/sales/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag, ArrowLeft, CheckCircle2, AlertCircle, DollarSign, Calendar, User, FileText } from "lucide-react";

interface AccountOption {
  id: string;
  code: string;
  name: string;
  type: string;
}

export default function SalesInputPage() {
  const router = useRouter();
  
  // Dynamic COA State
  const [accounts, setAccounts] = useState<AccountOption[]>([]);
  const [loadingAccounts, setLoadingAccounts] = useState(true);

  // Form State
  const [customerName, setCustomerName] = useState("");
  const [saleDate, setSaleDate] = useState(new Date().toISOString().split("T")[0]);
  const [paymentMethod, setPaymentMethod] = useState<"CASH" | "CREDIT">("CASH");
  const [dueDate, setDueDate] = useState("");
  
  const [receivableAccountId, setReceivableAccountId] = useState("");
  const [revenueAccountId, setRevenueAccountId] = useState("");
  const [taxAccountId, setTaxAccountId] = useState("");
  
  const [subtotal, setSubtotal] = useState<number | "">("");
  const [taxPercent, setTaxPercent] = useState<number | "">(0);
  const [notes, setNotes] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Fetch Akun COA Aktif untuk Dropdown Form
  useEffect(() => {
    async function fetchAccounts() {
      try {
        const res = await fetch("/api/admin/coa/list"); // API helper penyedia list COA
        const data = await res.json();
        if (res.ok) {
          setAccounts(data.accounts || []);
          
          // Auto select default akun jika ketemu
          const defaultCash = data.accounts?.find((a: AccountOption) => a.type === "ASSET");
          const defaultRev = data.accounts?.find((a: AccountOption) => a.type === "REVENUE");
          if (defaultCash) setReceivableAccountId(defaultCash.id);
          if (defaultRev) setRevenueAccountId(defaultRev.id);
        }
      } catch (err) {
        console.error("Gagal load COA", err);
      } finally {
        setLoadingAccounts(false);
      }
    }
    fetchAccounts();
  }, []);

  // Hitung Kalkulasi Pajak & Total Penjualan
  const numSubtotal = Number(subtotal) || 0;
  const numTaxPercent = Number(taxPercent) || 0;
  const taxAmount = (numSubtotal * numTaxPercent) / 100;
  const grandTotal = numSubtotal + taxAmount;

  const handleSubmitSales = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!receivableAccountId || !revenueAccountId || numSubtotal <= 0) {
      setStatusMsg({ type: "error", text: "Mohon lengkapi akun penerimaan/piutang, akun pendapatan, dan nominal subtotal!" });
      return;
    }

    setIsSubmitting(true);
    setStatusMsg(null);

    try {
      const res = await fetch("/api/admin/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          saleDate,
          paymentMethod,
          dueDate: paymentMethod === "CREDIT" ? dueDate : null,
          receivableAccountId,
          revenueAccountId,
          taxAccountId: taxAmount > 0 ? taxAccountId : null,
          subtotal: numSubtotal,
          taxPercent: numTaxPercent,
          notes,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal menyimpan penjualan");

      setStatusMsg({ type: "success", text: "Transaksi Penjualan berhasil dicatat & Jurnal Umum otomatis terposting!" });
      
      // Reset Form
      setCustomerName("");
      setSubtotal("");
      setNotes("");

      // Refresh data COA & Dashboard secara realtime
      router.refresh();
    } catch (err: any) {
      setStatusMsg({ type: "error", text: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 lg:p-8 space-y-6 font-sans">
      
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="rounded-xl border border-slate-800 bg-slate-900 p-2 text-slate-400 hover:text-white transition"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
              <ShoppingBag className="h-6 w-6 text-blue-500" /> Input Transaksi Penjualan
            </h1>
            <p className="text-xs text-slate-400">
              Input sekali, otomatis mengalir ke Jurnal Umum, Buku Besar, Neraca Saldo, & Laba Rugi[cite: 4, 9, 12].
            </p>
          </div>
        </div>
      </div>

      {statusMsg && (
        <div className={`rounded-2xl border p-4 text-xs font-semibold flex items-center gap-3 ${
          statusMsg.type === "success"
            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
            : "border-rose-500/30 bg-rose-500/10 text-rose-400"
        }`}>
          {statusMsg.type === "success" ? <CheckCircle2 className="h-5 w-5 shrink-0" /> : <AlertCircle className="h-5 w-5 shrink-0" />}
          {statusMsg.text}
        </div>
      )}

      {/* FORM INPUT PENJUALAN */}
      <form onSubmit={handleSubmitSales} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* KOLOM KIRI & TENGAH: DETAIL PENJUALAN */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl space-y-4">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider border-b border-slate-800 pb-3">
              1. Informasi Pelanggan & Pembayaran
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Nama Pelanggan / Pihak</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Contoh: PT Trans semesta / Umum"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-10 pr-4 py-2.5 text-xs text-white focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Tanggal Transaksi</label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input
                    type="date"
                    required
                    value={saleDate}
                    onChange={(e) => setSaleDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-10 pr-4 py-2.5 text-xs text-white focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Jenis Pembayaran</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("CASH")}
                    className={`flex-1 rounded-xl py-2 text-xs font-bold transition ${
                      paymentMethod === "CASH"
                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                        : "bg-slate-950 text-slate-400 border border-slate-800"
                    }`}
                  >
                    Tunai / Kas / Bank
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("CREDIT")}
                    className={`flex-1 rounded-xl py-2 text-xs font-bold transition ${
                      paymentMethod === "CREDIT"
                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                        : "bg-slate-950 text-slate-400 border border-slate-800"
                    }`}
                  >
                    Kredit (Faktur / Piutang)
                  </button>
                </div>
              </div>

              {paymentMethod === "CREDIT" && (
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Jatuh Tempo Faktur</label>
                  <input
                    type="date"
                    required
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs text-white focus:border-blue-600 focus:outline-none"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl space-y-4">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider border-b border-slate-800 pb-3">
              2. Pemetaan Akun Akuntansi (COA) Real-Time
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Akun Masuk ({paymentMethod === "CASH" ? "Kas/Bank" : "Piutang Usaha"}) [DEBIT]
                </label>
                <select
                  value={receivableAccountId}
                  onChange={(e) => setReceivableAccountId(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2.5 text-xs text-white focus:border-blue-600 focus:outline-none"
                >
                  <option value="">-- Pilih Akun Debit --</option>
                  {accounts
                    .filter((a) => a.type === "ASSET")
                    .map((acc) => (
                      <option key={acc.id} value={acc.id}>
                        {acc.code} - {acc.name}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Akun Pendapatan [KREDIT]
                </label>
                <select
                  value={revenueAccountId}
                  onChange={(e) => setRevenueAccountId(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2.5 text-xs text-white focus:border-blue-600 focus:outline-none"
                >
                  <option value="">-- Pilih Akun Pendapatan --</option>
                  {accounts
                    .filter((a) => a.type === "REVENUE")
                    .map((acc) => (
                      <option key={acc.id} value={acc.id}>
                        {acc.code} - {acc.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Catatan / Keterangan Transaksi</label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Rincian item penjualan atau nomor faktur manual..."
                className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-white focus:border-blue-600 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* KOLOM KANAN: RINGKASAN NOMINAL & SUBMIT */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-xl space-y-4">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider border-b border-slate-800 pb-3">
              3. Rincian Nominal Penjualan
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Nilai Penjualan (Subtotal Rp)</label>
              <div className="relative">
                <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="number"
                  required
                  min={0}
                  value={subtotal}
                  onChange={(e) => setSubtotal(e.target.value === "" ? "" : Number(e.target.value))}
                  placeholder="0"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-10 pr-4 py-2.5 text-sm font-bold text-emerald-400 focus:border-blue-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Tarif PPN (%)</label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={taxPercent}
                  onChange={(e) => setTaxPercent(e.target.value === "" ? "" : Number(e.target.value))}
                  placeholder="11"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white focus:border-blue-600 focus:outline-none"
                />
              </div>

              {numTaxPercent > 0 && (
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Akun PPN Keluaran</label>
                  <select
                    value={taxAccountId}
                    onChange={(e) => setTaxAccountId(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-2 py-2 text-[11px] text-white focus:border-blue-600 focus:outline-none"
                  >
                    <option value="">-- Pilih Akun --</option>
                    {accounts
                      .filter((a) => a.type === "LIABILITY")
                      .map((acc) => (
                        <option key={acc.id} value={acc.id}>
                          {acc.code} - {acc.name}
                        </option>
                      ))}
                  </select>
                </div>
              )}
            </div>

            {/* TOTAL REKAP */}
            <div className="rounded-2xl bg-slate-950 p-4 border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal Penjualan</span>
                <span className="font-mono text-white">Rp {numSubtotal.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>PPN ({numTaxPercent}%)</span>
                <span className="font-mono text-white">Rp {taxAmount.toLocaleString("id-ID")}</span>
              </div>
              <div className="border-t border-slate-800 pt-2 flex justify-between font-bold text-sm text-emerald-400">
                <span>Grand Total</span>
                <span className="font-mono">Rp {grandTotal.toLocaleString("id-ID")}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || loadingAccounts}
              className="w-full rounded-2xl bg-blue-600 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-blue-600/30 hover:bg-blue-500 disabled:opacity-50 transition active:scale-95"
            >
              {isSubmitting ? "Memproses Jurnal..." : "Posting Penjualan Real-Time"}
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}