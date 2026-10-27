"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Upload, X, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function NewVehiclePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Gallery Photos State
  const [images, setImages] = useState<string[]>([]);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    type: "SEWA",
    category: "MOTOR",
    subCategory: "Matic Premium",
    brand: "HONDA",
    year: "2023",
    transmission: "Automatic",
    engineCapacity: "160 cc",
    fuel: "Bensin",
    mileage: "7650 km",
    chassisNumber: "",
    engineNumber: "",
    plateNumber: "",
    color: "Cokelat",
    stnkStatus: "Ada",
    stnkExpiry: "2027-04-05",
    bpkbStatus: "READY",
    fakturStatus: "Ada",
    kwitansiStatus: "Tidak Ada",
    price: "",
    priceUnit: "/hari",
    status: "READY",
    location: "Jakarta Selatan",
    description: "",
  });

  // Otomatisasi URL Slug dari Judul
  const handleTitleChange = (val: string) => {
    const slug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setForm((prev) => ({ ...prev, title: val, slug }));
  };

  // Upload File handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("files", file));

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal mengunggah foto");

      setImages((prev) => [...prev, ...data.urls]);
      toast.success(`${data.urls.length} foto berhasil diunggah!`);
    } catch (err: any) {
      toast.error(err.message || "Gagal mengunggah foto");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (images.length === 0) {
      toast.error("Wajib mengunggah minimal 1 foto kendaraan!");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/vehicles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          image: images[0], // Foto utama
          images: images,   // Multi foto galeri
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal menyimpan unit kendaraan");

      toast.success("Kendaraan berhasil ditambahkan ke database!");
      router.push("/admin/vehicles");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/vehicles"
            className="p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-900 transition shadow-sm"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Tambah Kendaraan Baru</h1>
            <p className="text-xs text-slate-500">Input spesifikasi lengkap, berkas dokumen, dan galeri foto unit.</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* 1. UPLOAD MULTI FOTO - CLEAN LIGHT */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Galeri Foto Kendaraan</h2>
              <p className="text-xs text-slate-500">Foto pertama akan dijadikan foto sampul utama (Thumbnail).</p>
            </div>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              {images.length} Foto Terpilih
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {images.map((url, idx) => (
              <div key={idx} className="relative group aspect-square rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                <img src={url} alt={`Foto ${idx + 1}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute top-1.5 right-1.5 p-1 rounded-lg bg-red-600 text-white opacity-0 group-hover:opacity-100 transition shadow-md"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
                {idx === 0 && (
                  <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded bg-blue-600 text-[9px] font-bold text-white shadow-sm">
                    Utama
                  </span>
                )}
              </div>
            ))}

            <label className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl aspect-square flex flex-col items-center justify-center p-3 text-center cursor-pointer bg-slate-50/60 hover:bg-blue-50/50 transition group">
              <Upload className="h-5 w-5 text-slate-400 group-hover:text-blue-600 mb-1 transition" />
              <span className="text-[11px] font-semibold text-slate-700 group-hover:text-blue-600">
                {uploading ? "Uploading..." : "Tambah Foto"}
              </span>
              <span className="text-[9px] text-slate-400 mt-0.5">PNG, JPG (Multi)</span>
              <input
                type="file"
                multiple
                accept="image/*"
                disabled={uploading}
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* 2. INFORMASI UTAMA & HARGA */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
            Informasi Utama & Layanan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="md:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1 uppercase">Judul Kendaraan</label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Contoh: HONDA PCX ABS ROADSYNC 160"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1 uppercase">URL Slug (Auto)</label>
              <input
                type="text"
                readOnly
                value={form.slug}
                className="w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-xs text-slate-500 outline-none cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1 uppercase">Tipe Bisnis</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value, priceUnit: e.target.value === "SEWA" ? "/hari" : "" })}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              >
                <option value="SEWA">Sewa / Rental</option>
                <option value="JUAL_BELI">Jual Beli</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1 uppercase">Kategori</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              >
                <option value="MOTOR">Motor</option>
                <option value="MOBIL">Mobil</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1 uppercase">Harga (Rp)</label>
              <input
                type="number"
                required
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="Contoh: 250000"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* 3. SPESIFIKASI TEKNIS */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
            Spesifikasi Detail Kendaraan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1 uppercase">Merk / Brand</label>
              <input
                type="text"
                value={form.brand}
                onChange={(e) => setForm({ ...form, brand: e.target.value })}
                placeholder="HONDA / TOYOTA"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1 uppercase">Tahun Pembuatan</label>
              <input
                type="text"
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
                placeholder="2023"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1 uppercase">Transmisi</label>
              <select
                value={form.transmission}
                onChange={(e) => setForm({ ...form, transmission: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              >
                <option value="Automatic">Automatic (AT)</option>
                <option value="Manual">Manual (MT)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1 uppercase">Kapasitas Mesin (CC)</label>
              <input
                type="text"
                value={form.engineCapacity}
                onChange={(e) => setForm({ ...form, engineCapacity: e.target.value })}
                placeholder="160 cc / 2000 cc"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1 uppercase">Odometer (KM)</label>
              <input
                type="text"
                value={form.mileage}
                onChange={(e) => setForm({ ...form, mileage: e.target.value })}
                placeholder="7650 KM"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1 uppercase">Warna Unit</label>
              <input
                type="text"
                value={form.color}
                onChange={(e) => setForm({ ...form, color: e.target.value })}
                placeholder="Cokelat / Hitam Metallic"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* 4. DOKUMEN & LEGALITAS */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
            Kelengkapan Dokumen & Legalitas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1 uppercase">Nomor Polisi (Plat)</label>
              <input
                type="text"
                value={form.plateNumber}
                onChange={(e) => setForm({ ...form, plateNumber: e.target.value })}
                placeholder="B 3241 FT"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1 uppercase">Status STNK</label>
              <select
                value={form.stnkStatus}
                onChange={(e) => setForm({ ...form, stnkStatus: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              >
                <option value="Ada">Ada</option>
                <option value="Tidak Ada">Tidak Ada</option>
                <option value="Proses Perpanjang">Proses Perpanjang</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1 uppercase">Status BPKB</label>
              <select
                value={form.bpkbStatus}
                onChange={(e) => setForm({ ...form, bpkbStatus: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              >
                <option value="READY">READY (Tersedia)</option>
                <option value="Di Jaminkan">Di Jaminkan / Leasing</option>
                <option value="Proses BBN">Proses Bea Balik Nama</option>
              </select>
            </div>
          </div>
        </div>

        {/* ACTION BUTTON */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
          <button
            type="submit"
            disabled={loading || uploading}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-md shadow-blue-600/20 hover:bg-blue-700 transition disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {loading ? "Menyimpan Unit..." : "Simpan Kendaraan"}
          </button>
        </div>

      </form>
    </div>
  );
}