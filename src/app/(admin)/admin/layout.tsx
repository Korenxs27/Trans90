"use client";

import { Plus_Jakarta_Sans } from "next/font/google";
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

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // Jika sedang di halaman login, jangan tampilkan sidebar layout
  if (pathname === "/admin/login") {
    return <div className={plusJakartaSans.className}>{children}</div>;
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });

      // Pakai window.location.href agar halaman melakukan full reload & menghapus client state
      window.location.href = "/login";
    } catch (error) {
      console.error("Gagal logout:", error);
    }
  };

  const mainNavItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Kendaraan", href: "/admin/vehicles", icon: Car },
    { name: "Pesanan Sewa", href: "/admin/pesanan-sewa", icon: ShoppingBag },
    { name: "Akuntansi", href: "/admin/coa", icon: BookOpen },
    { name: "Ruang Berita", href: "/admin/news", icon: Newspaper },
    { name: "Dokumen & Media", href: "/admin/dokumen-media", icon: FolderOpen },
  ];

  const cmsNavItems = [
    { name: "Beranda Utama", href: "/admin/konten/beranda", icon: Globe },
    { name: "Tentang Kami", href: "/admin/konten/tentang-kami", icon: Info },
    { name: "GCG", href: "/admin/konten/gcg", icon: ShieldCheck },
    { name: "Investor Relations", href: "/admin/konten/investor-relations", icon: TrendingUp },
    { name: "ESG & Keberlanjutan", href: "/admin/konten/esg", icon: Leaf },
  ];

  return (
    <div
      className={`${plusJakartaSans.className} flex min-h-screen bg-slate-50 text-slate-800`}
    >
      <Toaster position="top-right" theme="light" richColors />

      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col justify-between border-r border-slate-800 bg-slate-900 p-6 text-slate-300 md:flex">
        <div className="space-y-6 overflow-y-auto">

          {/* Logo & Brand TRANS90 */}
          <div className="flex items-center gap-3 px-2">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1.5">
              <img
                src="/images/logo.png"
                alt="Logo TRANS90"
                className="h-full w-full object-contain"
              />
            </div>

            <div>
              <h2 className="text-base font-extrabold tracking-wide text-white">
                TRANS90
              </h2>
              <p className="text-xs text-slate-400">
                Admin Panel
              </p>
            </div>
          </div>

          {/* Modul Utama */}
          <div className="space-y-1.5">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
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

          {/* Halaman Publik */}
          <div className="space-y-1.5 border-t border-slate-800/60 pt-2">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
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

        {/* Logout */}
        <div className="mt-4 border-t border-slate-800 pt-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-red-400 transition hover:bg-red-500/10"
          >
            <LogOut className="h-4 w-4" />
            Keluar (Logout)
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex min-w-0 flex-1 flex-col">

        {/* Topbar */}
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8 shadow-sm">
          <h1 className="text-sm font-semibold text-slate-500">
            Admin Panel
          </h1>

          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-blue-200 bg-blue-50 font-semibold text-blue-600">
              <User className="h-4 w-4" />
            </div>

            <span className="text-sm font-semibold text-slate-700">
              Administrator
            </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}