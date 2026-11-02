import Link from "next/link";
import Image from "next/image";

// SVG Icon Manual (Anti-Red Line & Bebas Dependency Issue)
function MapPinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PhoneIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YoutubeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white" />
    </svg>
  );
}

function TikTokIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-2.901 2.884 2.884 2.884 0 0 1-2.884-2.884 2.884 2.884 0 0 1 2.884-2.884c.28 0 .546.042.8.118v-3.521a6.322 6.322 0 0 0-.8-.052A6.33 6.33 0 0 0 3.14 15.65a6.33 6.33 0 0 0 6.33 6.33 6.33 6.33 0 0 0 6.33-6.33V8.814a8.23 8.23 0 0 0 4.789 1.517V6.886a4.82 4.82 0 0 1-.99-.2a4.78 4.78 0 0 1-.68-.2z" />
    </svg>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0B2A5B] text-white overflow-hidden border-t border-blue-900/60">
      
      {/* 1. BACKGROUND IMAGE DENGAN OVERLAY FADE BIRU GELAP */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80"
          alt="Trans90 Luxury Car Background"
          fill
          className="object-cover object-center opacity-20"
          priority
        />
        {/* Layer Gradient Overlay agar teks terbaca sangat jelas */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B2A5B]/90 via-[#0B2A5B]/95 to-[#071B3D]" />
      </div>

      {/* 2. SECTION UTAMA FOOTER */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* KOLOM 1: LOGO, BRANDING & KONTAK UTAMA */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block focus:outline-none">
              <Image
                src="/images/logo.png"
                alt="Logo Trans90"
                width={160}
                height={40}
                priority
                className="h-9 sm:h-10 w-auto object-contain brightness-0 invert"
              />
            </Link>

            <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed max-w-sm">
              Penyedia layanan sewa dan jual beli kendaraan terpercaya untuk kebutuhan operasional korporat maupun perjalanan pribadi secara profesional dan transparan.
            </p>

            {/* Informasi Kontak Ringkas */}
            <div className="space-y-2.5 text-xs text-slate-300 pt-2">
              <p className="flex items-start gap-2.5">
                <MapPinIcon className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
                <span>Jl. Jend. Sudirman No. 123, Jakarta Selatan, DKI Jakarta 12190</span>
              </p>
              <p className="flex items-center gap-2.5">
                <PhoneIcon className="h-4 w-4 shrink-0 text-amber-400" />
                <span>+62 (21) 555-0199</span>
              </p>
              <p className="flex items-center gap-2.5">
                <MailIcon className="h-4 w-4 shrink-0 text-amber-400" />
                <span>info@trans90.co.id</span>
              </p>
            </div>
          </div>

          {/* KOLOM 2: LAYANAN BISNIS */}
          <div className="space-y-3">
            <h3 className="text-xs font-black tracking-widest uppercase text-amber-400">Bisnis Kami</h3>
            <ul className="space-y-2 text-xs text-slate-200/80">
              <li>
                <Link href="/bisnis/sewa" className="hover:text-amber-400 transition-colors">
                  Sewa Kendaraan
                </Link>
              </li>
              <li>
                <Link href="/bisnis/jual-beli" className="hover:text-amber-400 transition-colors">
                  Jual Beli Kendaraan
                </Link>
              </li>
              <li>
                <Link href="/bisnis/sewa?type=suv" className="hover:text-amber-400 transition-colors">
                  Katalog SUV & MPV
                </Link>
              </li>
              <li>
                <Link href="/bisnis/sewa?type=sedan" className="hover:text-amber-400 transition-colors">
                  Layanan Sewa Korporat
                </Link>
              </li>
            </ul>
          </div>

          {/* KOLOM 3: PERUSAHAAN & TATA KELOLA */}
          <div className="space-y-3">
            <h3 className="text-xs font-black tracking-widest uppercase text-amber-400">Perusahaan</h3>
            <ul className="space-y-2 text-xs text-slate-200/80">
              <li>
                <Link href="/tentang-kami" className="hover:text-amber-400 transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/tata-kelola" className="hover:text-amber-400 transition-colors">
                  Tata Kelola Perusahaan
                </Link>
              </li>
              <li>
                <Link href="/hubungan-investor" className="hover:text-amber-400 transition-colors">
                  Hubungan Investor
                </Link>
              </li>
              <li>
                <Link href="/esg" className="hover:text-amber-400 transition-colors">
                  Komitmen ESG
                </Link>
              </li>
              <li>
                <Link href="/ruang-berita" className="hover:text-amber-400 transition-colors">
                  Ruang Berita & Siaran Pers
                </Link>
              </li>
            </ul>
          </div>

          {/* KOLOM 4: BANTUAN & MEDIA SOSIAL */}
          <div className="space-y-3">
            <h3 className="text-xs font-black tracking-widest uppercase text-amber-400">Dukungan</h3>
            <ul className="space-y-2 text-xs text-slate-200/80">
              <li>
                <Link href="/kontak" className="hover:text-amber-400 transition-colors">
                  Hubungi Kami
                </Link>
              </li>
              <li>
                <Link href="/tata-kelola#whistleblowing" className="hover:text-amber-400 transition-colors">
                  Pelaporan Whistleblowing
                </Link>
              </li>
            </ul>

            {/* Icon Media Sosial */}
            <div className="pt-3">
              <p className="text-xs font-bold uppercase tracking-wider text-white mb-2.5">Ikuti Kami</p>
              <div className="flex gap-2.5">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-slate-200 hover:bg-amber-400 hover:text-slate-900 transition-all duration-300"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="h-4 w-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-slate-200 hover:bg-amber-400 hover:text-slate-900 transition-all duration-300"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="h-4 w-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-slate-200 hover:bg-amber-400 hover:text-slate-900 transition-all duration-300"
                  aria-label="YouTube"
                >
                  <YoutubeIcon className="h-4 w-4" />
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-slate-200 hover:bg-amber-400 hover:text-slate-900 transition-all duration-300"
                  aria-label="TikTok"
                >
                  <TikTokIcon className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 3. SECTION FOOTER BAWAH (HAK CIPTA & LEGAL) */}
      <div className="relative z-10 border-t border-white/10 bg-[#051329]/90 backdrop-blur-md py-6 text-xs text-slate-300/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>&copy; {currentYear} Trans90 Mobility. Seluruh Hak Cipta Dilindungi Undang-Undang.</p>
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