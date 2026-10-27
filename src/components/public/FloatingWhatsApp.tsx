"use client";

import { useState } from "react";

export default function FloatingWhatsApp() {
  const [isHovered, setIsHovered] = useState(false);

  // Nomor WhatsApp sales/support utama (sesuaikan dengan kebutuhan)
  const phoneNumber = "6281234567890";
  const defaultMessage = encodeURIComponent(
    "Halo AutoCorp, saya ingin bertanya mengenai layanan sewa dan unit kendaraan."
  );

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip Keterangan saat Dihover */}
      <div
        className={`hidden sm:flex items-center bg-white border border-[#E3E8EF] px-3.5 py-2 rounded-xl shadow-lg transition-all duration-300 ${
          isHovered
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-4 pointer-events-none"
        }`}
      >
        <div className="flex flex-col">
          <span className="text-xs font-bold text-[#1A2233]">Bantuan Sales WA</span>
          <span className="text-[10px] text-[#1F9D55] font-semibold">● Online Siap Melayani</span>
        </div>
      </div>

      {/* Tombol WhatsApp dengan Animasi Bounce */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl hover:bg-[#20ba5a] active:scale-95 transition-all animate-bounce hover:animate-none focus:outline-none focus:ring-4 focus:ring-[#25D366]/30"
        aria-label="Hubungi kami via WhatsApp"
      >
        {/* Glow Pulsing Ping Effect */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-40 animate-ping group-hover:hidden" />

        {/* SVG Icon WhatsApp */}
        <svg
          className="relative h-7 w-7 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.762.459 3.48 1.332 5.001L2 22l5.149-1.331a9.984 9.984 0 0 0 4.863 1.258h.004c5.507 0 9.99-4.478 9.99-9.984a9.93 9.93 0 0 0-2.923-7.062A9.929 9.929 0 0 0 12.012 2zm0 18.232h-.003a8.318 8.318 0 0 1-4.242-1.166l-.304-.18-3.153.816.839-3.048-.198-.312a8.32 8.32 0 0 1-1.28-4.358c0-4.587 3.731-8.318 8.319-8.318a8.27 8.27 0 0 1 5.889 2.438 8.27 8.27 0 0 1 2.435 5.887c0 4.588-3.731 8.32-8.318 8.32zm4.561-6.223c-.25-.125-1.481-.73-1.711-.814-.23-.083-.398-.125-.566.125-.167.25-.65.814-.798.98-.148.167-.297.188-.547.063-.25-.125-1.054-.388-2.008-1.238-.742-.662-1.243-1.48-1.389-1.73-.148-.25-.016-.385.109-.509.113-.113.25-.292.375-.438.125-.146.167-.25.25-.417.083-.167.042-.313-.021-.438-.063-.125-.566-1.365-.776-1.87-.204-.492-.413-.425-.566-.433-.146-.008-.313-.01-.48-.01a.925.925 0 0 0-.671.313c-.23.25-.879.858-.879 2.093 0 1.235.899 2.428 1.024 2.595.125.167 1.77 2.703 4.288 3.791.599.258 1.067.412 1.431.528.601.191 1.148.164 1.58.1.482-.07 1.481-.605 1.688-1.189.208-.583.208-1.083.146-1.188-.063-.104-.23-.166-.48-.291z" />
        </svg>
      </a>
    </div>
  );
}