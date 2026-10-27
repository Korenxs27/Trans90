"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Search, Edit3, Trash2, AlertTriangle, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export default function AdminNewsPage() {
  const [newsList, setNewsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetching Data Berita Real-time dari API Database
  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/news", { cache: "no-store" });
      if (!res.ok) throw new Error("Gagal mengambil data dari database");
      const data = await res.json();
      if (Array.isArray(data)) {
        setNewsList(data);
      }
    } catch (e: any) {
      toast.error(e.message || "Gagal memuat daftar berita");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Eksekusi Hapus Berita berdasarkan ID Database
  const handleDelete = async () => {
    if (!deleteId) return;

    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/news/${deleteId}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal menghapus berita");

      // Filter langsung array state agar tabel terupdate instan
      setNewsList((prev) => prev.filter((item) => item.id !== deleteId));
      toast.success("Artikel berita berhasil dihapus dari database!");
      setDeleteId(null);
    } catch (e: any) {
      toast.error(e.message || "Gagal menghapus berita");
    } finally {
      setDeleteLoading(false);
    }
  };

  // Filter pencarian judul
  const filteredNews = newsList.filter((item) =>
    item.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Ruang Berita & CMS Artikel
          </h1>
          <p className="text-sm text-slate-500">
            Kelola publikasi artikel berita, draf postingan, dan pengumuman promo AutoCorp.
          </p>
        </div>
        <Link
          href="/admin/news/editor"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 hover:bg-blue-700 transition"
        >
          <Plus className="h-4 w-4" />
          Buat Postingan Baru
        </Link>
      </div>

      {/* TABLE CONTAINER */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari judul artikel..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <button
            onClick={fetchNews}
            className="p-2 text-slate-500 hover:text-blue-600 rounded-lg hover:bg-slate-100 transition"
            title="Refresh Data"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="border-b border-slate-100 bg-slate-50/80 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-4">Judul Artikel</th>
                <th className="px-6 py-4">Kategori / Label</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Tanggal Publikasi</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-slate-400 text-xs">
                    Memuat data berita dari database...
                  </td>
                </tr>
              ) : filteredNews.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-slate-400 text-xs">
                    Belum ada postingan berita yang ditemukan.
                  </td>
                </tr>
              ) : (
                filteredNews.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition">
                    <td className="px-6 py-4 max-w-md">
                      <div className="font-semibold text-slate-900 line-clamp-1">{item.title}</div>
                      <div className="text-xs text-slate-400 font-mono">{item.slug}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-50 text-blue-700 font-semibold text-[10px] px-2.5 py-1 rounded-md border border-blue-200">
                        {item.category || "Berita"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`font-semibold text-xs px-2.5 py-1 rounded-full border ${
                          item.status === "PUBLISHED"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-500">
                      {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString("id-ID") : "-"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* TOMBOL EDIT REVISI: Mengirim parameter ID asli database */}
                        <Link
                          href={`/admin/news/editor?id=${item.id}`}
                          className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-blue-600 transition"
                          title="Edit Artikel"
                        >
                          <Edit3 className="h-4 w-4" />
                        </Link>

                        {/* TOMBOL DELETE REVISI: Membuka Modal Konfirmasi dengan ID Asli */}
                        <button
                          onClick={() => setDeleteId(item.id)}
                          className="p-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition"
                          title="Hapus Artikel"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL HAPUS KUSTOM */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-red-600">
              <div className="p-2.5 rounded-xl bg-red-50 border border-red-100">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Konfirmasi Hapus</h3>
            </div>
            <p className="text-sm text-slate-600">
              Apakah kamu yakin ingin menghapus artikel berita ini? Data akan permanen terhapus dari database.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setDeleteId(null)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={deleteLoading}
                onClick={handleDelete}
                className="rounded-xl bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-700 shadow-md shadow-red-600/20 transition disabled:opacity-50"
              >
                {deleteLoading ? "Menghapus..." : "Ya, Hapus Berita"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}