"use client";

import { useState, useEffect } from "react";

export default function PublicHeroCarousel({ slides }: { slides: any[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!slides || slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides]);

  if (!slides || slides.length === 0) return null;

  return (
    <div className="relative w-full h-full">
      {/* Slider Images */}
      {slides.map((slide, index) => {
        // Otomatis handle jika slide berupa string URL atau object { imageUrl: '...' }
        const src = typeof slide === "string" ? slide : slide?.imageUrl || slide?.url;
        const key = typeof slide === "string" ? `${slide}-${index}` : slide?.id || `slide-${index}`;

        return (
          <div
            key={key}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <img
              src={src}
              alt={`Hero Slide ${index + 1}`}
              className="w-full h-full object-fill"
            />
          </div>
        );
      })}

      {/* Tombol Panah Kiri */}
      <button
        type="button"
        onClick={() => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-black/30 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all active:scale-95"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Tombol Panah Kanan */}
      <button
        type="button"
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-black/30 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all active:scale-95"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentSlide(idx)}
            className={`h-2 rounded-full transition-all ${
              idx === currentSlide ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}