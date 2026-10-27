"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Car,
  ShoppingBag,
  BookOpen,
  Newspaper,
  Globe,
  Info,
  ShieldCheck,
  TrendingUp,
  Leaf,
  FolderOpen,
  LogOut,
  User,
} from "lucide-react";
import { Toaster } from "sonner";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // Jika sedang di halaman login, jangan tampilkan sidebar layout
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    // Clear cookie & redirect
    document.cookie =
      "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    router.push("/admin/login");
    router.refresh();
  };

  // Navigasi Modul Utama Aplikasi
  const mainNavItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Kendaraan", href: "/admin/vehicles", icon: Car },
    { name: "Pesanan Sewa", href: "/admin/pesanan-sewa", icon: ShoppingBag },
    { name: "Akuntansi", href: "/admin/coa", icon: BookOpen },
    { name: "Ruang Berita", href: "/admin/news", icon: Newspaper },
    { name: "Dokumen & Media", href: "/admin/dokumen-media", icon: FolderOpen },
  ];

  // Navigasi CMS Halaman Publik
  const cmsNavItems = [
    { name: "Beranda Utama", href: "/admin/konten/beranda", icon: Globe },
    { name: "Tentang Kami", href: "/admin/konten/tentang-kami", icon: Info },
    { name: "GCG", href: "/admin/konten/gcg", icon: ShieldCheck },
    { name: "Investor Relations", href: "/admin/konten/investor-relations", icon: TrendingUp },
    { name: "ESG & Keberlanjutan", href: "/admin/konten/esg", icon: Leaf },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-800">
      <Toaster position="top-right" theme="light" richColors />

      {/* Sidebar Component - Deep Navy dengan Blue Accents */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900 p-6 flex flex-col justify-between hidden md:flex text-slate-300 shrink-0">
        <div className="space-y-6 overflow-y-auto">
          {/* Logo & Brand Header */}
          <div className="flex items-center gap-3 px-2">
            <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white text-lg shadow-lg shadow-blue-500/30">
              A
            </div>
            <div>
              <h2 className="font-bold text-white tracking-wide text-base">
                AutoCorp
              </h2>
              <p className="text-xs text-slate-400">Admin Panel</p>
            </div>
          </div>

          {/* Group 1: Modul Operasional Utama */}
          <div className="space-y-1.5">
            <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Modul Utama
            </p>
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Group 2: Modul CMS Halaman Publik */}
          <div className="space-y-1.5 pt-2 border-t border-slate-800/60">
            <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Halaman Publik
            </p>
            {cmsNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bottom Logout Button */}
        <div className="pt-4 border-t border-slate-800 mt-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-red-400 hover:bg-red-500/10 transition"
          >
            <LogOut className="h-4 w-4" />
            Keluar (Logout)
          </button>
        </div>
      </aside>

      {/* Main Content Area - Clean White Light Mode */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar Header */}
        <header className="h-16 border-b border-slate-200 bg-white px-8 flex items-center justify-between shadow-sm sticky top-0 z-10">
          <h1 className="text-sm font-semibold text-slate-500">Admin Panel</h1>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-semibold">
              <User className="h-4 w-4" />
            </div>
            <span className="text-sm font-semibold text-slate-700">
              Administrator
            </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 overflow-y-auto bg-slate-50">
          {children}
        </main>
      </div>
    </div>
  );
}