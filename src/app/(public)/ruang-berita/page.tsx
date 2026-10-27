"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Newspaper,
  Search,
  Calendar,
  ArrowRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

interface NewsItem {
  id: string;
  title: string;
  slug?: string;
  category: string;
  content: string;
  excerpt?: string;
  image?: string;
  createdAt: string;
  author?: string;
}

// Helper untuk membersihkan tag HTML & elemen gambar agar teks ringkasan bersih
function stripHtml(html: string) {
  if (!html) return "";
  const cleanText = html.replace(/<[^>]*>?/gm, "");
  return cleanText.trim();
}

export default function RuangBeritaPage() {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/news");
      if (!res.ok) throw new Error("Gagal mengambil data berita");
      const data = await res.json();
      setNewsList(Array.isArray(data) ? data : data.data || []);
    } catch (err: any) {
      toast.error(err.message || "Gagal memuat berita");
    } finally {
      setLoading(false);
    }
  };

  const categories = ["ALL", "KORPORAT", "ARMADA", "INVESMENT", "ESG", "ACARA"];

  const filteredNews = newsList.filter((item) => {
    const matchCategory =
      selectedCategory === "ALL" ||
      item.category?.toUpperCase() === selectedCategory;
    const matchSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.excerpt &&
        item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCategory && matchSearch;
  });

  const featuredNews = filteredNews[0];
  const regularNews = filteredNews.slice(1);

  return (
    <div className="bg-[#F8FAFC] text-[#1A2233] min-h-screen pt-30 pb-16 antialiased">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h1 className="text-3xl sm:text-5xl font-black text-[#0B2A5B] tracking-tight">
            Ruang Berita & Publikasi
          </h1>
          <p className="text-xs sm:text-base text-[#586678] leading-relaxed">
            Dapatkan informasi terkini, pers rilis resmi, serta wawasan seputar perkembangan armada dan korporasi AutoCorp.
          </p>
        </div>

        {/* SEARCH BAR & CATEGORY TABS */}
        <div className="bg-white rounded-2xl border border-[#E3E8EF] p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari berita atau artikel..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs text-slate-800 focus:bg-white focus:border-[#1E4FA3] focus:outline-none transition"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                    selectedCategory === cat
                      ? "bg-[#0B2A5B] text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat === "ALL" ? "Semua Berita" : cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* LOADING STATE */}
        {loading ? (
          <div className="min-h-[40vh] flex items-center justify-center text-xs text-slate-400 gap-2">
            <Loader2 className="h-5 w-5 animate-spin text-[#0B2A5B]" />
            <span>Memuat berita terkini...</span>
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="p-12 bg-white rounded-2xl border border-[#E3E8EF] text-center space-y-3">
            <AlertCircle className="h-8 w-8 text-amber-500 mx-auto" />
            <p className="text-sm font-bold text-slate-800">
              Berita tidak ditemukan
            </p>
            <p className="text-xs text-slate-500">
              Coba gunakan kata kunci lain atau ubah filter kategori.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* FEATURED NEWS (BERITA UTAMA) */}
            {featuredNews && (
              <div className="bg-white rounded-3xl border border-[#E3E8EF] overflow-hidden shadow-sm hover:shadow-md transition group grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-7 h-64 sm:h-80 lg:h-auto bg-slate-100 relative overflow-hidden">
                  <img
                    src={
                      featuredNews.image ||
                      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80"
                    }
                    alt={featuredNews.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-[#0B2A5B] text-white text-[10px] font-black uppercase px-3 py-1 rounded-lg">
                    {featuredNews.category || "BERITA"}
                  </span>
                </div>

                <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 font-semibold">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-[#1E4FA3]" />
                        {new Date(featuredNews.createdAt).toLocaleDateString(
                          "id-ID",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </span>
                      <span>•</span>
                      <span>{featuredNews.author || "Redaksi AutoCorp"}</span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-black text-[#0B2A5B] leading-tight group-hover:text-[#1E4FA3] transition">
                      {featuredNews.title}
                    </h2>

                    {/* DIBERSIHKAN PAKAI STRIPHTML */}
                    <p className="text-xs text-[#586678] leading-relaxed line-clamp-3">
                      {featuredNews.excerpt
                        ? stripHtml(featuredNews.excerpt)
                        : stripHtml(featuredNews.content).substring(0, 160) + "..."}
                    </p>
                  </div>

                  <Link
                    href={`/ruang-berita/${featuredNews.id}`}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#1E4FA3] hover:underline pt-2"
                  >
                    <span>Baca Selengkapnya</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            )}

            {/* REGULAR NEWS GRID */}
            {regularNews.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularNews.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-[#E3E8EF] overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between group"
                  >
                    <div>
                      <div className="h-48 bg-slate-100 relative overflow-hidden">
                        <img
                          src={
                            item.image ||
                            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
                          }
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                        <span className="absolute top-3 left-3 bg-[#0B2A5B] text-white text-[10px] font-bold uppercase px-2.5 py-0.5 rounded border border-white/20">
                          {item.category || "BERITA"}
                        </span>
                      </div>

                      <div className="p-5 space-y-2">
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-semibold">
                          <Calendar className="h-3 w-3 text-[#1E4FA3]" />
                          <span>
                            {new Date(item.createdAt).toLocaleDateString(
                              "id-ID",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </div>

                        <h3 className="text-sm font-extrabold text-[#0B2A5B] line-clamp-2 leading-snug group-hover:text-[#1E4FA3] transition">
                          {item.title}
                        </h3>

                        {/* DIBERSIHKAN PAKAI STRIPHTML */}
                        <p className="text-xs text-[#586678] line-clamp-2 leading-relaxed">
                          {item.excerpt
                            ? stripHtml(item.excerpt)
                            : stripHtml(item.content).substring(0, 100) + "..."}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 pt-0 border-t border-slate-100 mt-3">
                      <Link
                        href={`/ruang-berita/${item.id}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E4FA3] hover:underline pt-3"
                      >
                        <span>Baca Berita</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}