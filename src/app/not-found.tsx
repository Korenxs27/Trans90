import Link from "next/link";
import Image from "next/image";
import { Home, Cog, Wrench } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen w-full items-center bg-[#070D18] text-white overflow-hidden font-sans">
      {/* 1. FULL BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/404.png" // Simpan gambar di public/images/404-bg.jpg
          alt="Trans90 Pit Stop Maintenance 404"
          fill
          priority
          className="object-cover object-right lg:object-center h-full w-full"
        />
        {/* Overlay tipis di kiri biar teks 404 makin kontras & terbaca jelas */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#030712]/90 via-[#030712]/60 to-transparent lg:w-3/4" />
      </div>

      {/* 2. OVERLAY TEKS & CONTENT (DI KANAN SEBELAH KIRI) */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-12 lg:px-16 py-12">
        <div className="max-w-xl text-center lg:text-left space-y-6">
          
          {/* ANGKA 404 DENGAN ANIMASI GEAR DI TENGAH */}
          <div className="relative inline-flex items-center justify-center font-extrabold tracking-tighter text-white">
            <span className="text-8xl sm:text-9xl lg:text-[130px] leading-none drop-shadow-[0_10px_35px_rgba(37,99,235,0.6)]">
              4
            </span>
            
            {/* Gear Berputar Sebagai Angka 0 */}
            <div className="relative mx-1 flex items-center justify-center">
              <Cog className="h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28 animate-[spin_12s_linear_infinite] text-blue-400 drop-shadow-[0_0_20px_rgba(96,165,250,0.8)]" />
              <Wrench className="absolute h-8 w-8 sm:h-10 sm:w-10 text-amber-400 animate-pulse" />
            </div>

            <span className="text-8xl sm:text-9xl lg:text-[130px] leading-none drop-shadow-[0_10px_35px_rgba(37,99,235,0.6)]">
              4
            </span>

            {/* Hiasan Kunci Pas Melayang */}
            <Wrench className="absolute -top-4 -left-6 h-8 w-8 -rotate-45 text-blue-400/50" />
            <div className="absolute -bottom-2 -right-6 h-4 w-4 rounded-full border-2 border-blue-400/50" />
          </div>

          {/* JUDUL HALAMAN */}
          <h1 className="text-3xl font-bold tracking-tight text-blue-400 sm:text-4xl lg:text-5xl">
            Page Not Found
          </h1>

          {/* DESKRIPSI */}
          <p className="max-w-md mx-auto lg:mx-0 text-sm sm:text-base leading-relaxed text-slate-300">
            Sepertinya halaman yang kamu cari sedang dalam perbaikan. Tenang, kami akan segera memperbaikinya!
          </p>

          {/* TOMBOL KEMBALI KE BERANDA */}
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-blue-600/40 transition-all duration-300 hover:scale-105 hover:from-blue-500 hover:to-blue-400 active:scale-95"
            >
              <Home className="h-4 w-4" />
              <span>Kembali ke Beranda</span>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}