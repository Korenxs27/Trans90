import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B2A5B] text-white border-t border-[#071B3D]">
      {/* SECTION UTAMA FOOTER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* KOLOM 1: BRANDING & KONTAK UTAMA */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 focus:outline-none">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white font-extrabold text-[#0B2A5B] text-xl shadow-sm">
                T
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-extrabold tracking-tight text-white leading-none">
                  TRANS90
                </span>
              </div>
            </Link>

            <p className="text-sm text-[#F5F7FA]/80 leading-relaxed max-w-sm">
              Penyedia layanan sewa dan jual beli kendaraan terpercaya untuk kebutuhan operasional korporat maupun perjalanan pribadi secara profesional dan transparan.
            </p>

            {/* Informasi Kontak Ringkas */}
            <div className="space-y-2 text-xs text-[#F5F7FA]/80 pt-2">
              <p className="flex items-start gap-2">
                <span className="shrink-0 text-base">📍</span>
                <span>Jl. Jend. Sudirman No. 123, Jakarta Selatan, DKI Jakarta 12190</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="shrink-0 text-base">📞</span>
                <span>+62 (21) 555-0199</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="shrink-0 text-base">✉️</span>
                <span>info@autocorp.co.id</span>
              </p>
            </div>
          </div>

          {/* KOLOM 2: LAYANAN BISNIS */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold tracking-wider uppercase text-white">Bisnis Kami</h3>
            <ul className="space-y-2 text-xs text-[#F5F7FA]/80">
              <li>
                <Link href="/bisnis/sewa" className="hover:text-white transition-colors">
                  Sewa Kendaraan
                </Link>
              </li>
              <li>
                <Link href="/bisnis/jual-beli" className="hover:text-white transition-colors">
                  Jual Beli Kendaraan
                </Link>
              </li>
              <li>
                <Link href="/bisnis/sewa?type=suv" className="hover:text-white transition-colors">
                  Katalog SUV & MPV
                </Link>
              </li>
              <li>
                <Link href="/bisnis/sewa?type=sedan" className="hover:text-white transition-colors">
                  Layanan Sewa Korporat
                </Link>
              </li>
            </ul>
          </div>

          {/* KOLOM 3: PERUSAHAAN & TATA KELOLA */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold tracking-wider uppercase text-white">Perusahaan</h3>
            <ul className="space-y-2 text-xs text-[#F5F7FA]/80">
              <li>
                <Link href="/tentang-kami" className="hover:text-white transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/tata-kelola" className="hover:text-white transition-colors">
                  Tata Kelola Perusahaan
                </Link>
              </li>
              <li>
                <Link href="/hubungan-investor" className="hover:text-white transition-colors">
                  Hubungan Investor
                </Link>
              </li>
              <li>
                <Link href="/esg" className="hover:text-white transition-colors">
                  Komitmen ESG
                </Link>
              </li>
              <li>
                <Link href="/ruang-berita" className="hover:text-white transition-colors">
                  Ruang Berita & Siaran Pers
                </Link>
              </li>
            </ul>
          </div>

          {/* KOLOM 4: BANTUAN & MEDIA SOSIAL */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold tracking-wider uppercase text-white">Dukungan</h3>
            <ul className="space-y-2 text-xs text-[#F5F7FA]/80">
              <li>
                <Link href="/kontak" className="hover:text-white transition-colors">
                  Hubungi Kami
                </Link>
              </li>
              <li>
                <Link href="/tata-kelola#whistleblowing" className="hover:text-white transition-colors">
                  Pelaporan Whistleblowing
                </Link>
              </li>
            </ul>

            {/* Icon Media Sosial */}
            <div className="pt-2">
              <p className="text-xs font-semibold uppercase text-white mb-2">Ikuti Kami</p>
              <div className="flex gap-3">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-8 w-8 rounded-md bg-white/10 flex items-center justify-center text-xs hover:bg-white/20 transition-colors"
                  aria-label="LinkedIn"
                >
                  LN
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-8 w-8 rounded-md bg-white/10 flex items-center justify-center text-xs hover:bg-white/20 transition-colors"
                  aria-label="Instagram"
                >
                  IG
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-8 w-8 rounded-md bg-white/10 flex items-center justify-center text-xs hover:bg-white/20 transition-colors"
                  aria-label="Facebook"
                >
                  FB
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* SECTION FOOTER Bawah (HAK CIPTA & LEGAL) */}
      <div className="border-t border-white/10 bg-[#071B3D] py-6 text-xs text-[#F5F7FA]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>&copy; {currentYear} AutoCorp Mobility. Seluruh Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex gap-6">
            <Link href="/kebijakan-privasi" className="hover:text-white transition-colors">
              Kebijakan Privasi
            </Link>
            <Link href="/syarat-ketentuan" className="hover:text-white transition-colors">
              Syarat & Ketentuan
            </Link>
            <Link href="/sitemap.xml" className="hover:text-white transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}