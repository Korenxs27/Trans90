"use client";

import { useState, useEffect } from "react";
import {
  Save,
  Upload,
  Trash2,
  ArrowUp,
  ArrowDown,
  Image as ImageIcon,
  LayoutList,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";

export default function CMSBerandaAdminPage() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [uploading, setUploading] = useState(false);

  // State Slide Carousel Hero Background
  const [carousel, setCarousel] = useState<any[]>([]);

  // State Urutan Section Beranda
  const [sectionOrder, setSectionOrder] = useState<string[]>([
    "hero",
    "rentals",
    "sales",
    "whyUs",
    "news",
  ]);

  const sectionLabels: Record<string, string> = {
    hero: "1. Hero Section (Carousel Background & Search Bar)",
    rentals: "2. Katalog Kendaraan Sewa Populer",
    sales: "3. Katalog Kendaraan Dijual Siap Pakai",
    whyUs: "4. Keunggulan / Mengapa Memilih Kami",
    news: "5. Ruang Berita & Informasi Perusahaan",
  };

  // Fetch Data Pengaturan Beranda dari API
  const fetchBerandaConfig = async () => {
    setFetching(true);
    try {
      const res = await fetch("/api/konten/beranda", { cache: "no-store" });
      if (!res.ok) throw new Error("Gagal mengambil data dari database");
      const data = await res.json();

      if (data && data.sections) {
        if (Array.isArray(data.sections.heroCarousel)) {
          setCarousel(data.sections.heroCarousel);
        } else {
          setCarousel([
            { id: "1", imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80" },
            { id: "2", imageUrl: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1920&q=80" },
          ]);
        }

        if (Array.isArray(data.sections.sectionOrder)) {
          setSectionOrder(data.sections.sectionOrder);
        }
      }
    } catch (e: any) {
      toast.error(e.message || "Gagal memuat konfigurasi beranda");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchBerandaConfig();
  }, []);

  // Handler Upload File Gambar Langsung via API Supabase
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("files", files[0]);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      
      // Validasi respon sesuai format Supabase API kamu
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Gagal mengunggah gambar ke Supabase");
      }

      const uploadedUrl = data.urls?.[0];
      if (uploadedUrl) {
        const newItem = {
          id: Date.now().toString(),
          imageUrl: uploadedUrl,
        };
        setCarousel((prev) => [...prev, newItem]);
        toast.success("Gambar carousel berhasil diunggah ke Supabase!");
      }
    } catch (err: any) {
      toast.error(err.message || "Gagal upload gambar slide");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  // Handler Hapus Slide Gambar
  const handleRemoveCarousel = (id: string) => {
    if (carousel.length <= 1) {
      toast.error("Carousel minimal harus memiliki 1 gambar slide!");
      return;
    }
    setCarousel(carousel.filter((item) => item.id !== id));
    toast.success("Gambar slide berhasil dihapus!");
  };

  // Handler Pindah Urutan Posisi Section (Up / Down)
  const moveSection = (index: number, direction: "up" | "down") => {
    const updated = [...sectionOrder];
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= updated.length) return;

    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    setSectionOrder(updated);
  };

  // Simpan Seluruh Pengaturan ke Database Prisma via API
  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/konten/beranda", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Beranda Utama Corporate",
          sections: {
            heroCarousel: carousel,
            sectionOrder: sectionOrder,
          },
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal menyimpan perubahan");

      toast.success("Tampilan Beranda Publik berhasil disimpan!");
    } catch (e: any) {
      toast.error(e.message || "Terjadi kesalahan saat menyimpan");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="p-8 text-xs text-slate-400 flex items-center gap-2">
        <RefreshCw className="h-4 w-4 animate-spin text-blue-600" />
        Memuat konfigurasi CMS Beranda...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl pb-12">
      {/* HEADER PAGE */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            CMS Tampilan Beranda Utama
          </h1>
          <p className="text-sm text-slate-500">
            Upload slide gambar background hero ke Supabase dan atur posisi urutan section di beranda publik.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={loading || uploading}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-600/20 hover:bg-blue-700 transition disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {loading ? "Menyimpan..." : "Simpan Perubahan Publik"}
        </button>
      </div>

      {/* 1. KELOLA SLIDE CAROUSEL BACKGROUND HERO */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <ImageIcon className="h-4 w-4 text-blue-600" />
            Slide Background Hero Section
          </h2>
          <span className="text-[11px] text-slate-400 font-medium">
            Total {carousel.length} Slide
          </span>
        </div>

        {/* GRID TAMPILAN THUMBNAIL CAROUSEL */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {carousel.map((slide, idx) => (
            <div
              key={slide.id || idx}
              className="relative group rounded-xl border border-slate-200 overflow-hidden bg-slate-900 h-36 shadow-sm"
            >
              <img
                src={slide.imageUrl}
                alt={`Slide ${idx + 1}`}
                className="w-full h-full object-cover group-hover:opacity-80 transition"
              />
              <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded">
                Slide #{idx + 1}
              </div>
              <button
                type="button"
                onClick={() => handleRemoveCarousel(slide.id)}
                className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition shadow-md"
                title="Hapus Slide Ini"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* AREA UPLOAD FILE DIRECT SUPABASE */}
        <div className="pt-4 border-t border-slate-100 space-y-2">
          <label className="block text-xs font-semibold text-slate-700">
            Upload Gambar Carousel Baru (Supabase Storage):
          </label>
          <label className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer bg-slate-50 hover:bg-blue-50/50 transition">
            <Upload className="h-7 w-7 text-blue-600 mb-2" />
            <span className="font-bold text-xs text-slate-800">
              {uploading ? "Sedang Mengunggah Gambar ke Supabase..." : "Klik untuk Upload Gambar (JPG, PNG, WebP)"}
            </span>
            <span className="text-[11px] text-slate-400 mt-0.5">
              Rekomendasi rasio lanskap / banner HD (contoh: 1920x1080)
            </span>
            <input
              type="file"
              accept="image/*"
              disabled={uploading}
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* 2. ATUR URUTAN SECTION DI HALAMAN BERANDA */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4 shadow-sm">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <LayoutList className="h-4 w-4 text-blue-600" />
            Pengaturan Posisi & Urutan Section
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Gunakan tombol panah atas/bawah untuk mengubah susunan tampilan di beranda publik.
          </p>
        </div>

        <div className="space-y-2.5">
          {sectionOrder.map((secKey, index) => (
            <div
              key={secKey}
              className="flex items-center justify-between rounded-xl border border-slate-200 p-3.5 bg-slate-50/60 hover:bg-white hover:shadow-sm transition"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-100 text-blue-700 font-bold text-xs">
                  {index + 1}
                </span>
                <span className="text-xs font-bold text-slate-800">
                  {sectionLabels[secKey] || secKey}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => moveSection(index, "up")}
                  className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 hover:text-blue-600 transition disabled:opacity-30 disabled:hover:bg-white"
                  title="Naikkan Posisi"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  disabled={index === sectionOrder.length - 1}
                  onClick={() => moveSection(index, "down")}
                  className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 hover:text-blue-600 transition disabled:opacity-30 disabled:hover:bg-white"
                  title="Turunkan Posisi"
                >
                  <ArrowDown className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}