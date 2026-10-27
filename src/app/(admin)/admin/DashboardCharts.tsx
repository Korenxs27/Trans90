"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface DashboardChartsProps {
  monthlyRevenue: { month: string; total: number }[];
  vehicleStatusDistribution: { name: string; value: number; color: string }[];
}

export default function DashboardCharts({
  monthlyRevenue,
  vehicleStatusDistribution,
}: DashboardChartsProps) {
  const formatRupiahShort = (val: number) => {
    if (val >= 1000000000) return `Rp ${(val / 1000000000).toFixed(1)}B`;
    if (val >= 1000000) return `Rp ${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `Rp ${(val / 1000).toFixed(0)}k`;
    return `Rp ${val}`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 1. Area Chart Tren Pendapatan */}
      <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-800">Grafik Pendapatan</h2>
            <p className="text-xs text-slate-500">Tren transaksi sewa yang berhasil dikonfirmasi.</p>
          </div>
          <span className="flex items-center gap-1.5 text-xs text-blue-600 font-semibold bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
            ● Live Data
          </span>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyRevenue} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis
                stroke="#94a3b8"
                fontSize={11}
                tickLine={false}
                tickFormatter={formatRupiahShort}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  borderColor: "#e2e8f0",
                  borderRadius: "12px",
                  color: "#0f172a",
                  fontSize: "12px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
                formatter={(val: any) => [`Rp ${Number(val).toLocaleString("id-ID")}`, "Total Transaksi"]}
              />
              <Area
                type="monotone"
                dataKey="total"
                stroke="#2563eb"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. Donut Chart Status Armada */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4 flex flex-col justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-800">Distribusi Kendaraan</h2>
          <p className="text-xs text-slate-500">Status unit kendaraan saat ini.</p>
        </div>

        <div className="h-52 w-full relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={vehicleStatusDistribution}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {vehicleStatusDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="#ffffff" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  borderColor: "#e2e8f0",
                  borderRadius: "12px",
                  fontSize: "12px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
          {vehicleStatusDistribution.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
              <span className="text-slate-600 font-medium">{item.name}: <strong className="text-slate-900">{item.value}</strong></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}