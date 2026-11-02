"use client";

import { useState, useEffect, useRef } from "react";
import {
  Layers,
  Save,
  Loader2,
  Building,
  Target,
  History,
  Users,
  Plus,
  Trash2,
  CheckCircle2,
  Upload,
  Image as ImageIcon,
  MapPin,
  Award,
} from "lucide-react";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface ManagementMember {
  name: string;
  position: string;
  photoUrl: string;
}

interface CompanyValue {
  title: string;
  description: string;
}

export default function AdminTentangKamiSinglePage() {
  // 1. PROFIL PERUSAHAAN
  const [heroTitle, setHeroTitle] = useState("");
  const [heroSubtitle, setHeroSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [uploadingBanner, setUploadingBanner] = useState(false);

  // 2. VISI & MISI
  const [visi, setVisi] = useState("");
  const [misiList, setMisiList] = useState<string[]>([""]);

  // 3. SEJARAH
  const [historyList, setHistoryList] = useState<TimelineItem[]>([
    { year: "", title: "", description: "" },
  ]);

  // 4. TIM MANAJEMEN
  const [managementList, setManagementList] = useState<ManagementMember[]>([
    { name: "", position: "", photoUrl: "" },
  ]);
  const [uploadingPhotoIndex, setUploadingPhotoIndex] = useState<number | null>(null);

  // 5. INFORMASI KONTAK & KEUNGGULAN
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [mapsEmbedUrl, setMapsEmbedUrl] = useState("");
  const [companyValues, setCompanyValues] = useState<CompanyValue[]>([
    { title: "", description: "" },
  ]);

  // UI STATE
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const bannerFileRef = useRef<HTMLInputElement>(null);

  // LOAD KONTEN SAAT KOMPONEN PERTAMA DILOAD
  useEffect(() => {
    async function loadAllContent() {
      try {
        const res = await fetch("/api/admin/tentang-kami?key=tentang-kami-all");
        const data = await res.json();
        if (data.content) {
          if (data.content.profil) {
            setHeroTitle(data.content.profil.heroTitle || "");
            setHeroSubtitle(data.content.profil.heroSubtitle || "");
            setDescription(data.content.profil.description || "");
            setBannerUrl(data.content.profil.bannerUrl || "");
          }
          if (data.content.visiMisi) {
            setVisi(data.content.visiMisi.visi || "");
            setMisiList(data.content.visiMisi.misi || [""]);
          }
          if (data.content.sejarah) {
            setHistoryList(data.content.sejarah || []);
          }
          if (data.content.manajemen) {
            setManagementList(data.content.manajemen || []);
          }
          if (data.content.kontak) {
            setPhone(data.content.kontak.phone || "");
            setEmail(data.content.kontak.email || "");
            setAddress(data.content.kontak.address || "");
            setMapsEmbedUrl(data.content.kontak.mapsEmbedUrl || "");
          }
          if (data.content.values) {
            setCompanyValues(data.content.values || []);
          }
        }
      } catch (err) {
        console.error("Gagal memuat data Tentang Kami", err);
      } finally {
        setLoading(false);
      }
    }
    loadAllContent();
  }, []);

  // FUNGSI UPLOAD GAMBAR KE SUPABASE STORAGE VIA API ROUTE
  const handleFileUpload = async (file: File, onSuccess: (url: string) => void) => {
    const formData = new FormData();
    formData.append("files", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.success && data.urls && data.urls.length > 0) {
        onSuccess(data.urls[0]);
      } else {
        alert(data.message || "Gagal mengunggah gambar ke Supabase Storage");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan jaringan saat mengunggah gambar");
    }
  };

  // UPLOAD BANNER PERUSAHAAN
  const handleBannerChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingBanner(true);
    await handleFileUpload(file, (url) => setBannerUrl(url));
    setUploadingBanner(false);
  };

  // UPLOAD FOTO PROFIL MANAJEMEN
  const handleManagementPhotoChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingPhotoIndex(index);
    await handleFileUpload(file, (url) => {
      const updated = [...managementList];
      updated[index].photoUrl = url;
      setManagementList(updated);
    });
    setUploadingPhotoIndex(null);
  };

  // HANDLER LIST ITEM
  const addMisiItem = () => setMisiList([...misiList, ""]);
  const removeMisiItem = (idx: number) => setMisiList(misiList.filter((_, i) => i !== idx));

  const addHistoryItem = () => setHistoryList([...historyList, { year: "", title: "", description: "" }]);
  const removeHistoryItem = (idx: number) => setHistoryList(historyList.filter((_, i) => i !== idx));

  const addManagementItem = () => setManagementList([...managementList, { name: "", position: "", photoUrl: "" }]);
  const removeManagementItem = (idx: number) => setManagementList(managementList.filter((_, i) => i !== idx));

  const addCompanyValue = () => setCompanyValues([...companyValues, { title: "", description: "" }]);
  const removeCompanyValue = (idx: number) => setCompanyValues(companyValues.filter((_, i) => i !== idx));

  // SIMPAN KONTEN ADMIN SEKALIGUS
  const handleSaveAll = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMsg("");

    try {
      const res = await fetch("/api/admin/tentang-kami", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pageKey: "tentang-kami-all",
          title: "Halaman Tentang Kami (Terpadu)",
          sections: {
            profil: { heroTitle, heroSubtitle, description, bannerUrl },
            visiMisi: { visi, misi: misiList.filter((m) => m.trim() !== "") },
            sejarah: historyList,
            manajemen: managementList,
            kontak: { phone, email, address, mapsEmbedUrl },
            values: companyValues,
          },
        }),
      });

      if (!res.ok) throw new Error("Gagal menyimpan data");
      setStatusMsg("Seluruh perubahan Halaman Tentang Kami berhasil disimpan!");
      setTimeout(() => setStatusMsg(""), 4000);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500 text-xs">
        <Loader2 className="h-5 w-5 animate-spin mr-2 text-blue-600" /> Memuat data Admin Tentang Kami...
      </div>
    );
  }

  return (
    <form onSubmit={handleSaveAll} className="min-h-screen bg-slate-50 text-slate-800 p-4 lg:p-8 space-y-6 font-sans">
      
      {/* HEADER HALAMAN ADMIN (LAYOUT RAPI - TIDAK KETIBAN TOPBAR) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Kelola Tentang Kami</h1>
            <p className="text-xs text-slate-500 font-medium">
              Atur Profil, Visi Misi, Sejarah, Tim Manajemen, dan Informasi Kontak dalam satu tampilan terpadu.
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-blue-600/25 hover:bg-blue-700 active:scale-95 transition cursor-pointer disabled:opacity-50"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Simpan Semua Perubahan
        </button>
      </div>

      {statusMsg && (
        <div className="flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-bold text-emerald-700 shadow-sm">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" /> {statusMsg}
        </div>
      )}

      {/* SECTION 1: PROFIL PERUSAHAAN */}
      <div className="bg-white p-6 lg:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
          <Building className="h-5 w-5 text-blue-600" />
          <h2 className="text-base font-extrabold text-slate-900">1. Profil Perusahaan</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Judul Utama (Hero Title)</label>
            <input
              type="text"
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
              placeholder="Contoh: Penyedia Transportasi Terdepan"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-800 focus:border-blue-600 focus:bg-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Sub-Judul (Hero Subtitle)</label>
            <input
              type="text"
              value={heroSubtitle}
              onChange={(e) => setHeroSubtitle(e.target.value)}
              placeholder="Contoh: Mengabdi Sejak Tahun 2015"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-800 focus:border-blue-600 focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        {/* UPLOAD GAMBAR BANNER SUPABASE */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Gambar Banner Utama</label>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border border-dashed border-slate-300 rounded-2xl p-4 bg-slate-50/50">
            {bannerUrl ? (
              <div className="relative h-24 w-40 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                <img src={bannerUrl} alt="Banner Preview" className="h-full w-full object-cover" />
              </div>
            ) : (
              <div className="h-24 w-40 rounded-xl border border-slate-200 bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                <ImageIcon className="h-8 w-8" />
              </div>
            )}

            <div className="space-y-2 flex-1">
              <input
                type="file"
                ref={bannerFileRef}
                accept="image/*"
                onChange={handleBannerChange}
                className="hidden"
              />
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => bannerFileRef.current?.click()}
                  disabled={uploadingBanner}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 transition cursor-pointer disabled:opacity-50"
                >
                  {uploadingBanner ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
                  Unggah Berkas Gambar
                </button>
                <span className="text-[11px] text-slate-400">Atau tempel URL Supabase di bawah</span>
              </div>
              <input
                type="text"
                value={bannerUrl}
                onChange={(e) => setBannerUrl(e.target.value)}
                placeholder="https://... /storage/v1/object/public/vehicles/..."
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-800 focus:border-blue-600 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Deskripsi Profil Perusahaan</label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tulis ringkasan profil perusahaan..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-xs text-slate-800 focus:border-blue-600 focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      {/* SECTION 2: VISI & MISI */}
      <div className="bg-white p-6 lg:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
          <Target className="h-5 w-5 text-blue-600" />
          <h2 className="text-base font-extrabold text-slate-900">2. Visi & Misi</h2>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Pernyataan Visi</label>
          <textarea
            rows={2}
            value={visi}
            onChange={(e) => setVisi(e.target.value)}
            placeholder="Visi perusahaan..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-xs text-slate-800 focus:border-blue-600 focus:bg-white focus:outline-none"
          />
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-semibold text-slate-700">Poin Misi Perusahaan</label>
            <button
              type="button"
              onClick={addMisiItem}
              className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" /> Tambah Misi
            </button>
          </div>

          {misiList.map((misi, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 w-6 text-center">{idx + 1}.</span>
              <input
                type="text"
                value={misi}
                onChange={(e) => {
                  const updated = [...misiList];
                  updated[idx] = e.target.value;
                  setMisiList(updated);
                }}
                placeholder={`Misi Poin Ke-${idx + 1}`}
                className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-800 focus:border-blue-600 focus:bg-white focus:outline-none"
              />
              {misiList.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeMisiItem(idx)}
                  className="p-2 text-slate-400 hover:text-rose-600 transition cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: SEJARAH (TIMELINE) */}
      <div className="bg-white p-6 lg:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <History className="h-5 w-5 text-blue-600" />
            <h2 className="text-base font-extrabold text-slate-900">3. Sejarah Perusahaan</h2>
          </div>
          <button
            type="button"
            onClick={addHistoryItem}
            className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" /> Tambah Peristiwa
          </button>
        </div>

        <div className="space-y-4">
          {historyList.map((item, idx) => (
            <div key={idx} className="relative rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-3">
              <button
                type="button"
                onClick={() => removeHistoryItem(idx)}
                className="absolute top-3 right-3 text-slate-400 hover:text-rose-600 transition cursor-pointer"
              >
                <Trash2 className="h-4 w-4" />
              </button>

              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Peristiwa #{idx + 1}</span>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Tahun</label>
                  <input
                    type="text"
                    value={item.year}
                    onChange={(e) => {
                      const updated = [...historyList];
                      updated[idx].year = e.target.value;
                      setHistoryList(updated);
                    }}
                    placeholder="Contoh: 2018"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-800 focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Judul Peristiwa</label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => {
                      const updated = [...historyList];
                      updated[idx].title = e.target.value;
                      setHistoryList(updated);
                    }}
                    placeholder="Contoh: Ekspansi Armada Utama"
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-800 focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Rincian Peristiwa</label>
                <textarea
                  rows={2}
                  value={item.description}
                  onChange={(e) => {
                    const updated = [...historyList];
                    updated[idx].description = e.target.value;
                    setHistoryList(updated);
                  }}
                  placeholder="Penjelasan rincian peristiwa..."
                  className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:border-blue-600 focus:outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 4: TIM MANAJEMEN */}
      <div className="bg-white p-6 lg:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <Users className="h-5 w-5 text-blue-600" />
            <h2 className="text-base font-extrabold text-slate-900">4. Tim Manajemen</h2>
          </div>
          <button
            type="button"
            onClick={addManagementItem}
            className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" /> Tambah Anggota
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {managementList.map((member, idx) => (
            <div key={idx} className="relative rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-3">
              <button
                type="button"
                onClick={() => removeManagementItem(idx)}
                className="absolute top-3 right-3 text-slate-400 hover:text-rose-600 transition cursor-pointer"
              >
                <Trash2 className="h-4 w-4" />
              </button>

              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Anggota Eksekutif #{idx + 1}</span>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Nama Lengkap & Gelar</label>
                <input
                  type="text"
                  value={member.name}
                  onChange={(e) => {
                    const updated = [...managementList];
                    updated[idx].name = e.target.value;
                    setManagementList(updated);
                  }}
                  placeholder="Nama & Gelar"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-800 focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Jabatan</label>
                <input
                  type="text"
                  value={member.position}
                  onChange={(e) => {
                    const updated = [...managementList];
                    updated[idx].position = e.target.value;
                    setManagementList(updated);
                  }}
                  placeholder="Contoh: Chief Executive Officer"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-800 focus:border-blue-600 focus:outline-none"
                />
              </div>

              {/* UPLOAD FOTO PROFIL MANAJEMEN SUPABASE */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Foto Profil</label>
                <div className="flex items-center gap-3">
                  {member.photoUrl ? (
                    <img src={member.photoUrl} alt="Foto Profil" className="h-10 w-10 rounded-full object-cover border border-slate-200" />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 text-xs">
                      <Users className="h-5 w-5" />
                    </div>
                  )}

                  <label className="cursor-pointer inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-3 py-1.5 text-[11px] font-bold text-white hover:bg-slate-800 transition">
                    {uploadingPhotoIndex === idx ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      <Upload className="h-3 w-3" />
                    )}
                    Upload Foto
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleManagementPhotoChange(e, idx)}
                      className="hidden"
                    />
                  </label>
                </div>
                <input
                  type="text"
                  value={member.photoUrl}
                  onChange={(e) => {
                    const updated = [...managementList];
                    updated[idx].photoUrl = e.target.value;
                    setManagementList(updated);
                  }}
                  placeholder="Atau tempel URL Supabase..."
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-[11px] text-slate-800 focus:border-blue-600 focus:outline-none mt-2"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 5: INFORMASI KONTAK & ALAMAT KANTOR */}
      <div className="bg-white p-6 lg:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
          <MapPin className="h-5 w-5 text-blue-600" />
          <h2 className="text-base font-extrabold text-slate-900">5. Informasi Kontak & Alamat Kantor</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Nomor Telepon / WhatsApp</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+62 812-3456-7890"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-800 focus:border-blue-600 focus:bg-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email Resmi</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="info@trans90.co.id"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-800 focus:border-blue-600 focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Alamat Kantor Lengkap</label>
          <textarea
            rows={2}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Alamat fisik utama perusahaan..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-800 focus:border-blue-600 focus:bg-white focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Google Maps Embed URL</label>
          <input
            type="text"
            value={mapsEmbedUrl}
            onChange={(e) => setMapsEmbedUrl(e.target.value)}
            placeholder="https://www.google.com/maps/embed?..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-800 focus:border-blue-600 focus:bg-white focus:outline-none"
          />
        </div>

        {/* KEUNGGULAN PERUSAHAAN */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-blue-600" />
              <label className="block text-xs font-bold text-slate-800">Nilai & Keunggulan Utama</label>
            </div>
            <button
              type="button"
              onClick={addCompanyValue}
              className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" /> Tambah Keunggulan
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {companyValues.map((val, idx) => (
              <div key={idx} className="relative rounded-2xl border border-slate-200 bg-slate-50 p-3 space-y-2">
                <button
                  type="button"
                  onClick={() => removeCompanyValue(idx)}
                  className="absolute top-2.5 right-2.5 text-slate-400 hover:text-rose-600 transition cursor-pointer"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
                <input
                  type="text"
                  value={val.title}
                  onChange={(e) => {
                    const updated = [...companyValues];
                    updated[idx].title = e.target.value;
                    setCompanyValues(updated);
                  }}
                  placeholder="Judul Keunggulan"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-slate-800 focus:border-blue-600 focus:outline-none"
                />
                <textarea
                  rows={2}
                  value={val.description}
                  onChange={(e) => {
                    const updated = [...companyValues];
                    updated[idx].description = e.target.value;
                    setCompanyValues(updated);
                  }}
                  placeholder="Penjelasan keunggulan..."
                  className="w-full rounded-xl border border-slate-200 bg-white p-2 text-xs text-slate-800 focus:border-blue-600 focus:outline-none"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

    </form>
  );
}