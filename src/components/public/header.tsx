"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [currentLang, setCurrentLang] = useState<"ID" | "EN">("ID");
  const [isLangOpen, setIsLangOpen] = useState(false);

  // Deteksi Arah Scroll (Slide ke atas pas scroll bawah, Slide ke bawah pas scroll atas)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 1. Efek shadow/backdrop saat lewat dari paling atas (10px)
      if (currentScrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // 2. Logika Sembunyi/Muncul di Section Mana Pun
      if (Math.abs(currentScrollY - lastScrollY) > 5) {
        if (currentScrollY > lastScrollY && currentScrollY > 80 && !isMobileMenuOpen) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isMobileMenuOpen]);

  // Kunci scroll body ketika menu mobile terbuka
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const toggleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const navLinks = [
    { name: "BERANDA", href: "/" },
    {
      name: "TENTANG KAMI",
      href: "/tentang-kami",
      dropdown: [
        { name: "Profil Perusahaan", href: "/tentang-kami/profil" },
        { name: "Visi & Misi", href: "/tentang-kami/visi-misi" },
        { name: "Sejarah", href: "/tentang-kami/sejarah" },
        { name: "Manajemen", href: "/tentang-kami/manajemen" },
      ],
    },
    {
      name: "BISNIS KAMI",
      href: "/bisnis",
      dropdown: [
        { name: "Sewa Kendaraan", href: "/bisnis/sewa" },
        { name: "Jual Beli Kendaraan", href: "/bisnis/jual-beli" },
      ],
    },
    {
      name: "TATA KELOLA",
      href: "/tata-kelola",
      dropdown: [
        { name: "Struktur Tata Kelola", href: "/tata-kelola/struktur" },
        { name: "Kebijakan & Kode Etik", href: "/tata-kelola/kebijakan-kode-etik" },
        { name: "Manajemen Risiko", href: "/tata-kelola/manajemen-risiko" },
      ],
    },
    {
      name: "HUBUNGAN INVESTOR",
      href: "/hubungan-investor",
      dropdown: [
        { name: "Laporan Keuangan", href: "/hubungan-investor/laporan-keuangan" },
        { name: "Laporan Tahunan", href: "/hubungan-investor/laporan-tahunan" },
        { name: "Pemegang Saham", href: "/hubungan-investor/pemegang-saham" },
        { name: "Publikasi & Pengumuman", href: "/hubungan-investor/publikasi-pengumuman" },
      ],
    },
    {
      name: "ESG",
      href: "/esg",
      dropdown: [
        { name: "Lingkungan", href: "/esg/lingkungan" },
        { name: "Sosial", href: "/esg/sosial" },
        { name: "Tata Kelola", href: "/esg/tata-kelola" },
        { name: "Laporan Keberlanjutan", href: "/esg/laporan-keberlanjutan" },
      ],
    },
    { name: "RUANG BERITA", href: "/ruang-berita" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-in-out border-b text-white ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        isScrolled
          ? "bg-[#0B2A5B]/95 backdrop-blur-md border-blue-900/60 shadow-xl"
          : "bg-[#0B2A5B] border-blue-900/40 shadow-md"
      }`}
    >
      {/* 1. HEADER BARIS ATAS */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-2.5 border-b border-white/10">
        <div className="flex items-center justify-between gap-4">
          
          {/* LOGO GAMBAR CUSTOM TRANS90 */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/images/logo.png"
              alt="Logo Trans90"
              width={160}
              height={40}
              priority
              className="h-9 sm:h-10 w-auto object-contain brightness-0 invert" // invert agar logo berwarna kontras di background biru gelap
            />
          </Link>

          {/* Navigasi Desktop (Tampil di Layar Besar) */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/bisnis/sewa"
              className="px-3.5 py-1.5 text-xs font-bold text-amber-400 border border-amber-400/80 rounded-lg hover:bg-amber-400 hover:text-slate-900 transition-colors shadow-sm"
            >
              SEWA ONLINE
            </Link>

            <Link
              href="/bisnis/jual-beli"
              className="px-3.5 py-1.5 text-xs font-bold text-white border border-white/30 rounded-lg hover:bg-white hover:text-[#0B2A5B] transition-colors"
            >
              JUAL BELI
            </Link>

            <Link
              href="/admin/login"
              className="px-4 py-1.5 text-xs font-bold text-slate-900 bg-amber-400 rounded-lg hover:bg-amber-300 transition-colors shadow-md"
            >
              MASUK
            </Link>

            {/* Custom Modern Language Switcher Desktop */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 border border-white/20 rounded-lg px-3 py-1.5 bg-white/10 hover:bg-white/20 transition-colors text-xs font-bold text-white"
              >
                <span className="text-sm">{currentLang === "ID" ? "🇮🇩" : "🇺🇸"}</span>
                <span>{currentLang}</span>
                <svg
                  className={`w-3.5 h-3.5 text-slate-300 transition-transform duration-200 ${
                    isLangOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Popover Language */}
              {isLangOpen && (
                <div className="absolute right-0 mt-1.5 w-32 rounded-lg border border-slate-700 bg-[#071B3D] p-1 shadow-2xl z-50 text-white">
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentLang("ID");
                      setIsLangOpen(false);
                    }}
                    className={`flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                      currentLang === "ID"
                        ? "bg-amber-400 text-slate-900 font-bold"
                        : "text-slate-200 hover:bg-white/10"
                    }`}
                  >
                    <span className="text-sm">🇮🇩</span>
                    <span>Indonesia</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setCurrentLang("EN");
                      setIsLangOpen(false);
                    }}
                    className={`flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                      currentLang === "EN"
                        ? "bg-amber-400 text-slate-900 font-bold"
                        : "text-slate-200 hover:bg-white/10"
                    }`}
                  >
                    <span className="text-sm">🇺🇸</span>
                    <span>English</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Kontrol Mobile (Hamburger Button & Switcher) */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCurrentLang(currentLang === "ID" ? "EN" : "ID")}
              className="flex items-center gap-1 border border-white/20 px-2.5 py-1.5 rounded-lg bg-white/10 text-xs font-bold text-white"
            >
              <span className="text-sm">{currentLang === "ID" ? "🇮🇩" : "🇺🇸"}</span>
              <span>{currentLang}</span>
            </button>

            {/* Tombol Hamburger */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-900 bg-amber-400 rounded-lg focus:outline-none transition-transform active:scale-95 shadow"
              aria-label="Toggle Navigation"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* 2. MENU NAVIGASI UTAMA DESKTOP */}
      <div className="hidden lg:block">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <nav className="flex items-center justify-end gap-6 xl:gap-8 h-11">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));

              if (link.dropdown) {
                return (
                  <div
                    key={link.name}
                    className="relative group h-full flex items-center"
                    onMouseEnter={() => setActiveDropdown(link.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      type="button"
                      className={`inline-flex items-center gap-1.5 text-xs font-bold tracking-wider transition-colors ${
                        isActive ? "text-amber-400" : "text-slate-100 hover:text-amber-400"
                      }`}
                    >
                      {link.name}
                      <svg
                        className="w-3.5 h-3.5 text-slate-300 group-hover:text-amber-400 group-hover:rotate-180 transition-transform duration-200"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Nav Dropdown Desktop */}
                    <div
                      className={`absolute right-0 top-full pt-1 w-60 transition-all duration-150 ${
                        activeDropdown === link.name
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-2 pointer-events-none"
                      }`}
                    >
                      <div className="rounded-xl border border-white/10 bg-[#071B3D]/95 backdrop-blur-md p-2 shadow-2xl">
                        {link.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block rounded-lg px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-white/10 hover:text-amber-400 transition-colors"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs font-bold tracking-wider transition-colors ${
                    isActive ? "text-amber-400" : "text-slate-100 hover:text-amber-400"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* 3. HAMBURGER MENU OVERLAY (SMOOTH MOBILE DRAWER) */}
      <div
        className={`fixed inset-0 top-[57px] z-40 bg-slate-950/70 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div
          className={`w-full bg-[#071B3D] border-b border-white/10 shadow-2xl transition-all duration-300 ease-in-out transform ${
            isMobileMenuOpen ? "translate-y-0" : "-translate-y-4"
          } max-h-[85vh] overflow-y-auto p-5 text-white`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Quick Actions Grid di HP */}
          <div className="grid grid-cols-2 gap-2.5 pb-4 border-b border-white/10">
            <Link
              href="/bisnis/sewa"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center py-2.5 text-xs font-bold border border-amber-400 text-amber-400 rounded-lg active:bg-amber-400 active:text-slate-900 transition-colors"
            >
              SEWA ONLINE
            </Link>
            <Link
              href="/bisnis/jual-beli"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center py-2.5 text-xs font-bold border border-white/30 text-white rounded-lg active:bg-white active:text-slate-900 transition-colors"
            >
              JUAL BELI
            </Link>
            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="col-span-2 flex items-center justify-center py-2.5 text-xs font-bold text-slate-900 bg-amber-400 rounded-lg shadow-sm active:bg-amber-300 transition-colors"
            >
              MASUK
            </Link>
          </div>

          {/* List Navigasi Accordion Mobile */}
          <div className="pt-2 space-y-1">
            {navLinks.map((link) => (
              <div key={link.name} className="border-b border-white/5 last:border-none">
                {link.dropdown ? (
                  <div>
                    <button
                      type="button"
                      onClick={() => toggleDropdown(link.name)}
                      className="flex w-full items-center justify-between py-3 text-xs font-bold text-slate-100"
                    >
                      <span>{link.name}</span>
                      <svg
                        className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                          activeDropdown === link.name ? "rotate-180 text-amber-400" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {activeDropdown === link.name && (
                      <div className="pl-3 pr-2 py-2 space-y-1 bg-white/5 rounded-lg mb-2 transition-all">
                        {link.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block py-2 text-xs font-medium text-slate-300 hover:text-amber-400 active:font-bold"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-3 text-xs font-bold text-slate-100 hover:text-amber-400"
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}