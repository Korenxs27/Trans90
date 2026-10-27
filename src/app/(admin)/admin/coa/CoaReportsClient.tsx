"use client";

import { useState } from "react";
import {
  FileText,
  BookOpen,
  Scale,
  TrendingUp,
  PieChart as PieIcon,
  DollarSign,
  Calendar,
  CreditCard,
  Layers,
  ChevronRight,
  Plus,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatRupiah } from "@/lib/utils";

interface CoaReportsClientProps {
  accounts: any[];
  chartData: any[];
}

export default function CoaReportsClient({
  accounts,
  chartData,
}: CoaReportsClientProps) {
  const [selectedReport, setSelectedReport] = useState<string>("laba-rugi");

  // Filter Data berdasarkan Kategori COA
  const assets = accounts.filter((a) => a.category.includes("Aset"));
  const liabilities = accounts.filter((a) => a.category === "Kewajiban");
  const equity = accounts.filter((a) => a.category === "Ekuitas");
  const revenues = accounts.filter((a) => a.category === "Pendapatan");
  const expenses = accounts.filter((a) => a.category === "Beban Operasional");

  // Kalkulasi Utama Akuntansi UKM
  const totalAssets = assets.reduce((acc, a) => acc + a.balance, 0);
  const totalLiabilities = liabilities.reduce((acc, a) => acc + a.balance, 0);
  const totalEquity = equity.reduce((acc, a) => acc + a.balance, 0);
  const totalRevenues = revenues.reduce((acc, a) => acc + a.balance, 0);
  const totalExpenses = expenses.reduce((acc, a) => acc + a.balance, 0);

  const netProfit = totalRevenues - totalExpenses;
  const endingEquity = totalEquity + netProfit;

  // Kas & Bank khusus Arus Kas
  const cashAccounts = accounts.filter(
    (a) => a.code === "1001" || a.code === "1002"
  );
  const totalCash = cashAccounts.reduce((acc, a) => acc + a.balance, 0);

  const reportCategories = [
    { id: "laba-rugi", name: "Laba Rugi", desc: "Evaluasi kinerja pendapatan & beban", icon: TrendingUp, color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
    { id: "neraca", name: "Neraca Keuangan", desc: "Keseimbangan Aset, Kewajiban & Modal", icon: Layers, color: "text-teal-600 bg-teal-50 border-teal-200" },
    { id: "arus-kas", name: "Arus Kas", desc: "Perubahan kas & bank operasional", icon: DollarSign, color: "text-green-600 bg-green-50 border-green-200" },
    { id: "perubahan-modal", name: "Perubahan Modal", desc: "Perkembangan ekuitas pemilik", icon: PieIcon, color: "text-rose-600 bg-rose-50 border-rose-200" },
    { id: "neraca-saldo", name: "Neraca Saldo", desc: "Total debit & kredit seluruh akun", icon: Scale, color: "text-amber-600 bg-amber-50 border-amber-200" },
    { id: "transaksi", name: "Laporan Transaksi", desc: "Detail histori transaksi operasional", icon: CreditCard, color: "text-blue-600 bg-blue-50 border-blue-200" },
    { id: "buku-besar", name: "Buku Besar", desc: "Mutasi debit & kredit per akun", icon: BookOpen, color: "text-indigo-600 bg-indigo-50 border-indigo-200" },
    { id: "jurnal", name: "Jurnal Umum", desc: "Pencatatan ganda terposting", icon: FileText, color: "text-purple-600 bg-purple-50 border-purple-200" },
    { id: "hutang-piutang", name: "Hutang & Piutang", desc: "Rincian kewajiban & tagihan", icon: CreditCard, color: "text-orange-600 bg-orange-50 border-orange-200" },
    { id: "periode", name: "Laporan Periode", desc: "Ringkasan saldo periode ini", icon: Calendar, color: "text-sky-600 bg-sky-50 border-sky-200" },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* HEADER PAGE */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Akuntansi & Laporan Keuangan UKM
          </h1>
          <p className="text-sm text-slate-500">
            Pencatatan otomatis sesuai standar akuntansi finansial untuk AutoCorp.
          </p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 hover:bg-blue-700 transition">
          <Plus className="h-4 w-4" />
          Tambah Akun COA
        </button>
      </div>

      {/* GRAFIK RINGKASAN */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Performa Keuangan Real-Time</h2>
            <p className="text-xs text-slate-500">Perbandingan arus pendapatan sewa/jual beli vs beban operasional.</p>
          </div>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Laba Bersih: {formatRupiah(netProfit)}
          </span>
        </div>

        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  borderColor: "#e2e8f0",
                  borderRadius: "12px",
                  fontSize: "12px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
                formatter={(val: any) => [`Rp ${Number(val).toLocaleString("id-ID")}`, ""]}
              />
              <Bar dataKey="pendapatan" name="Pendapatan" fill="#2563eb" radius={[6, 6, 0, 0]} />
              <Bar dataKey="beban" name="Beban" fill="#f59e0b" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* GRID KATEGOI LAPORAN */}
      <div>
        <h2 className="text-base font-bold text-slate-900 mb-3">Pilih Jenis Laporan Keuangan</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {reportCategories.map((item) => {
            const Icon = item.icon;
            const isSelected = selectedReport === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedReport(item.id)}
                className={`flex flex-col justify-between text-left p-4 rounded-2xl border transition ${
                  isSelected
                    ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20"
                    : "bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:shadow-sm"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <div
                    className={`p-2 rounded-xl border ${
                      isSelected
                        ? "bg-white/20 text-white border-transparent"
                        : item.color
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <ChevronRight
                    className={`h-4 w-4 ${
                      isSelected ? "text-white" : "text-slate-300"
                    }`}
                  />
                </div>
                <div>
                  <div className="font-bold text-xs">{item.name}</div>
                  <p
                    className={`text-[10px] mt-0.5 line-clamp-1 ${
                      isSelected ? "text-blue-100" : "text-slate-400"
                    }`}
                  >
                    {item.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* CONTAINER CONTAINER LAPORAN DINAMIS */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-base font-bold text-slate-900 uppercase">
              {reportCategories.find((r) => r.id === selectedReport)?.name}
            </h2>
            <p className="text-xs text-slate-500">
              {reportCategories.find((r) => r.id === selectedReport)?.desc}
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-600 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm">
            Periode: Oktober 2026
          </span>
        </div>

        <div className="p-6">
          {/* 1. LABA RUGI */}
          {selectedReport === "laba-rugi" && (
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pendapatan Operasional</h3>
                <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                  {revenues.map((r) => (
                    <div key={r.code} className="flex justify-between p-3 text-sm">
                      <span className="text-slate-700 font-medium">{r.code} - {r.name}</span>
                      <span className="font-bold text-slate-900">{formatRupiah(r.balance)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between p-3 bg-blue-50/50 font-bold text-sm text-blue-900">
                    <span>Total Pendapatan</span>
                    <span>{formatRupiah(totalRevenues)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Beban Operasional</h3>
                <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                  {expenses.map((e) => (
                    <div key={e.code} className="flex justify-between p-3 text-sm">
                      <span className="text-slate-700 font-medium">{e.code} - {e.name}</span>
                      <span className="font-bold text-slate-900">{formatRupiah(e.balance)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between p-3 bg-amber-50/50 font-bold text-sm text-amber-900">
                    <span>Total Beban Operasional</span>
                    <span>{formatRupiah(totalExpenses)}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex justify-between items-center">
                <span className="font-bold text-emerald-900">LABA BERSIH OPERASIONAL (NET PROFIT)</span>
                <span className="text-xl font-black text-emerald-700">{formatRupiah(netProfit)}</span>
              </div>
            </div>
          )}

          {/* 2. NERACA KEUANGAN */}
          {selectedReport === "neraca" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider border-b pb-2">ASET (AKTIVA)</h3>
                <div className="space-y-2">
                  {assets.map((a) => (
                    <div key={a.code} className="flex justify-between text-sm p-2 bg-slate-50 rounded-lg">
                      <span className="text-slate-700">{a.name}</span>
                      <span className="font-semibold text-slate-900">{formatRupiah(a.balance)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between p-3 bg-blue-600 text-white rounded-xl font-bold text-sm">
                  <span>TOTAL ASET</span>
                  <span>{formatRupiah(totalAssets)}</span>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider border-b pb-2">KEWAJIBAN (PASIVA)</h3>
                  <div className="space-y-2">
                    {liabilities.map((l) => (
                      <div key={l.code} className="flex justify-between text-sm p-2 bg-slate-50 rounded-lg">
                        <span className="text-slate-700">{l.name}</span>
                        <span className="font-semibold text-slate-900">{formatRupiah(l.balance)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider border-b pb-2">EKUITAS (MODAL)</h3>
                  <div className="flex justify-between text-sm p-2 bg-slate-50 rounded-lg">
                    <span className="text-slate-700">Modal Pemilik</span>
                    <span className="font-semibold text-slate-900">{formatRupiah(totalEquity)}</span>
                  </div>
                  <div className="flex justify-between text-sm p-2 bg-slate-50 rounded-lg">
                    <span className="text-slate-700">Laba Bersih Berjalan</span>
                    <span className="font-semibold text-emerald-600">{formatRupiah(netProfit)}</span>
                  </div>
                </div>

                <div className="flex justify-between p-3 bg-slate-900 text-white rounded-xl font-bold text-sm">
                  <span>TOTAL PASIVA & MODAL</span>
                  <span>{formatRupiah(totalLiabilities + endingEquity)}</span>
                </div>
              </div>
            </div>
          )}

          {/* 3. ARUS KAS */}
          {selectedReport === "arus-kas" && (
            <div className="max-w-2xl space-y-4">
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                <div className="flex justify-between p-3 text-sm">
                  <span className="text-slate-700">Arus Kas dari Aktivitas Operasional (Penerimaan Sewa)</span>
                  <span className="font-semibold text-emerald-600">+{formatRupiah(totalRevenues)}</span>
                </div>
                <div className="flex justify-between p-3 text-sm">
                  <span className="text-slate-700">Pengeluaran Operasional (Servis Armada)</span>
                  <span className="font-semibold text-amber-600">-{formatRupiah(totalExpenses)}</span>
                </div>
                <div className="flex justify-between p-4 bg-emerald-50 font-bold text-slate-900">
                  <span>TOTAL SALDO KAS & BANK AKTIF</span>
                  <span className="text-emerald-700 text-lg">{formatRupiah(totalCash)}</span>
                </div>
              </div>
            </div>
          )}

          {/* 4. PERUBAHAN MODAL */}
          {selectedReport === "perubahan-modal" && (
            <div className="max-w-2xl space-y-4">
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                <div className="flex justify-between p-3 text-sm">
                  <span className="text-slate-700">Modal Awal Pemilik</span>
                  <span className="font-semibold text-slate-900">{formatRupiah(totalEquity)}</span>
                </div>
                <div className="flex justify-between p-3 text-sm">
                  <span className="text-slate-700">Tambah: Laba Bersih Berjalan</span>
                  <span className="font-semibold text-emerald-600">+{formatRupiah(netProfit)}</span>
                </div>
                <div className="flex justify-between p-4 bg-blue-50 font-bold text-slate-900">
                  <span>MODAL AKHIR PERIODE</span>
                  <span className="text-blue-700 text-lg">{formatRupiah(endingEquity)}</span>
                </div>
              </div>
            </div>
          )}

          {/* 5. NERACA SALDO */}
          {selectedReport === "neraca-saldo" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="border-b border-slate-100 bg-slate-50/80 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-6 py-3">Kode</th>
                    <th className="px-6 py-3">Nama Akun</th>
                    <th className="px-6 py-3 text-right">Debit</th>
                    <th className="px-6 py-3 text-right">Kredit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {accounts.map((acc) => (
                    <tr key={acc.code}>
                      <td className="px-6 py-3 font-mono font-bold text-blue-600">{acc.code}</td>
                      <td className="px-6 py-3 font-medium text-slate-800">{acc.name}</td>
                      <td className="px-6 py-3 text-right">{acc.type === "DEBIT" ? formatRupiah(acc.balance) : "-"}</td>
                      <td className="px-6 py-3 text-right">{acc.type === "KREDIT" ? formatRupiah(acc.balance) : "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* 6. LAPORAN TRANSAKSI */}
          {selectedReport === "transaksi" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="border-b border-slate-100 bg-slate-50/80 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-6 py-3">Tanggal</th>
                    <th className="px-6 py-3">Tipe Transaksi</th>
                    <th className="px-6 py-3">Keterangan</th>
                    <th className="px-6 py-3 text-right">Nominal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-3 text-xs">2026-10-22</td>
                    <td className="px-6 py-3 font-semibold text-emerald-600">PEMBAYARAN SEWA</td>
                    <td className="px-6 py-3">Sewa Honda PCX - Order #SEWA-102</td>
                    <td className="px-6 py-3 text-right font-bold text-slate-900">{formatRupiah(2500000)}</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-3 text-xs">2026-10-20</td>
                    <td className="px-6 py-3 font-semibold text-amber-600">BEBAN OPERASIONAL</td>
                    <td className="px-6 py-3">Servis Berkala & Ganti Oli Armada</td>
                    <td className="px-6 py-3 text-right font-bold text-slate-900">{formatRupiah(450000)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* 7. BUKU BESAR */}
          {selectedReport === "buku-besar" && (
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl font-bold text-xs text-blue-900 uppercase">
                AKUN 1001 - KAS UTAMA AUTOCORP
              </div>
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="border-b border-slate-100 bg-slate-50/80 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-6 py-3">Tanggal</th>
                    <th className="px-6 py-3">Keterangan</th>
                    <th className="px-6 py-3 text-right">Debit</th>
                    <th className="px-6 py-3 text-right">Kredit</th>
                    <th className="px-6 py-3 text-right">Saldo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="px-6 py-3 text-xs">2026-10-01</td>
                    <td className="px-6 py-3">Saldo Awal Bulan</td>
                    <td className="px-6 py-3 text-right">-</td>
                    <td className="px-6 py-3 text-right">-</td>
                    <td className="px-6 py-3 text-right font-bold">{formatRupiah(142500000)}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-3 text-xs">2026-10-22</td>
                    <td className="px-6 py-3">Sewa Unit Honda PCX</td>
                    <td className="px-6 py-3 text-right font-semibold text-emerald-600">{formatRupiah(2500000)}</td>
                    <td className="px-6 py-3 text-right">-</td>
                    <td className="px-6 py-3 text-right font-bold">{formatRupiah(145000000)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* 8. JURNAL UMUM */}
          {selectedReport === "jurnal" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="border-b border-slate-100 bg-slate-50/80 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-6 py-3">Tanggal</th>
                    <th className="px-6 py-3">Akun & Keterangan</th>
                    <th className="px-6 py-3 text-right">Debit</th>
                    <th className="px-6 py-3 text-right">Kredit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="px-6 py-3 text-xs">2026-10-22</td>
                    <td className="px-6 py-3 font-semibold text-slate-900">Kas Utama AutoCorp</td>
                    <td className="px-6 py-3 text-right font-semibold text-slate-800">{formatRupiah(2500000)}</td>
                    <td className="px-6 py-3 text-right">-</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-3 text-xs"></td>
                    <td className="px-6 py-3 pl-12 text-slate-500">Pendapatan Sewa Armada</td>
                    <td className="px-6 py-3 text-right">-</td>
                    <td className="px-6 py-3 text-right font-semibold text-slate-800">{formatRupiah(2500000)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* 9. HUTANG & PIUTANG */}
          {selectedReport === "hutang-piutang" && (
            <div className="space-y-4">
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                {liabilities.map((l) => (
                  <div key={l.code} className="flex justify-between p-4 text-sm bg-slate-50">
                    <div>
                      <span className="font-bold text-slate-900 block">{l.name}</span>
                      <span className="text-xs text-slate-500">Kewajiban Perawatan / Vendor</span>
                    </div>
                    <span className="font-bold text-amber-600 text-base">{formatRupiah(l.balance)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 10. LAPORAN PERIODE */}
          {selectedReport === "periode" && (
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs">
              <div className="flex justify-between border-b pb-2">
                <span className="font-bold text-slate-700">Periode Laporan</span>
                <span className="font-bold text-blue-600">1 Oktober 2026 - 31 Oktober 2026</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-600">Total Transaksi Terposting</span>
                <span className="font-semibold text-slate-900">18 Transaksi</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Status Buku Besar</span>
                <span className="font-semibold text-emerald-600">Balanced (Seimbang)</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}