import CoaReportsClient from "./CoaReportsClient";

export default async function AdminCoaPage() {
  // Master Data Akun COA Lengkap UKM
  const accounts = [
    { code: "1001", name: "Kas Utama AutoCorp", category: "Aset Lancar", balance: 145000000, type: "DEBIT" },
    { code: "1002", name: "Bank BCA Operasional", category: "Aset Lancar", balance: 320000000, type: "DEBIT" },
    { code: "1201", name: "Aset Armada Sewa (Kendaraan)", category: "Aset Tetap", balance: 850000000, type: "DEBIT" },
    { code: "1301", name: "Stok Inventaris Jual Beli", category: "Aset Tetap", balance: 420000000, type: "DEBIT" },
    { code: "2001", name: "Hutang Perawatan Armada", category: "Kewajiban", balance: 15000000, type: "KREDIT" },
    { code: "3001", name: "Modal Pemilik", category: "Ekuitas", balance: 1000000000, type: "KREDIT" },
    { code: "4001", name: "Pendapatan Sewa Armada", category: "Pendapatan", balance: 48500000, type: "KREDIT" },
    { code: "4002", name: "Pendapatan Penjualan Unit", category: "Pendapatan", balance: 185000000, type: "KREDIT" },
    { code: "5001", name: "Beban Perawatan & Servis", category: "Beban Operasional", balance: 12400000, type: "DEBIT" },
  ];

  // Data Grafik Bulanan
  const chartData = [
    { month: "Mei", pendapatan: 35000000, beban: 8000000 },
    { month: "Jun", pendapatan: 42000000, beban: 9500000 },
    { month: "Jul", pendapatan: 50000000, beban: 11000000 },
    { month: "Agu", pendapatan: 48000000, beban: 10000000 },
    { month: "Sep", pendapatan: 55000000, beban: 12000000 },
    { month: "Okt", pendapatan: 68500000, beban: 12400000 },
  ];

  return <CoaReportsClient accounts={accounts} chartData={chartData} />;
}