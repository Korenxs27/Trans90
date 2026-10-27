import Link from "next/link";
import { db } from "@/lib/db";
import HeroSearch from "@/components/public/HeroSearch";
import PublicHeroCarousel from "@/components/public/PublicHeroCarousel";

export const revalidate = 0; // Memastikan data selalu fresh real-time

export default async function HomePage() {
  // 1. Fetch data pengaturan CMS Beranda dari Prisma
  const pageContent = await db.pageContent.findUnique({
    where: { pageKey: "beranda" },
  });

  const sectionsData = (pageContent?.sections as any) || {};

  // Default Fallback Slide jika DB belum diisi
  const DEFAULT_SLIDES = [
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1920&q=80",
  ];

  // Gunakan data carousel dari DB (jika ada), atau fallback ke default
  const carouselSlides =
    Array.isArray(sectionsData.heroCarousel) && sectionsData.heroCarousel.length > 0
      ? sectionsData.heroCarousel.map((item: any) => item.imageUrl)
      : DEFAULT_SLIDES;

  const sectionOrder = sectionsData.sectionOrder || [
    "hero",
    "rentals",
    "sales",
    "whyUs",
    "news",
  ];

  // 2. Fetch data nyata dari database untuk unit sewa, jual-beli, dan berita
  const rentalVehicles = await db.vehicle.findMany({
    where: { type: "SEWA", status: "READY" },
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  const saleVehicles = await db.vehicle.findMany({
    where: { type: "JUAL_BELI", status: "READY" },
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  const newsList = await db.news.findMany({
    where: { status: "PUBLISHED" },
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  // Helper untuk mengekstrak URL gambar berita yang valid
  const getNewsImageUrl = (newsItem: any) => {
    const rawImage = newsItem.image || newsItem.imageUrl || newsItem.coverImage;
    if (typeof rawImage === "string" && rawImage.trim() !== "") {
      return rawImage;
    }
    if (Array.isArray(newsItem.images) && newsItem.images.length > 0) {
      return newsItem.images[0];
    }
    return "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=400&q=80"; // Gambar fallback berita
  };

  // 3. Renderer Komponen berdasarkan Urutan Section dari Admin
  const renderSection = (key: string) => {
    switch (key) {
      case "hero":
        return (
          <div key="hero" className="w-full">
            {/* 1. HERO CAROUSEL BANNER */}
            <section className="relative w-full pt-[72px] sm:pt-[100px] bg-[#0B2A5B]">
              <div className="relative w-full aspect-[5680/1600] min-h-[280px]">
                <PublicHeroCarousel slides={carouselSlides} />
              </div>
            </section>

            {/* 2. HERO SEARCH BOX */}
            <section className="bg-[#F8FAFC] pt-6 pb-2">
              <div className="max-w-5xl mx-auto px-4">
                <HeroSearch />
              </div>
            </section>
          </div>
        );

      case "rentals":
        return (
          <div key="rentals">
            <div className="pt-24 sm:pt-28 bg-[#F8FAFC]" />
            <section className="bg-white pt-6 pb-16 border-t border-b border-[#E3E8EF]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
                  <div>
                    <span className="text-xs font-bold text-[#1E4FA3] uppercase tracking-wider">
                      Katalog Rental
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2A5B] mt-1">
                      Pilihan Kendaraan Sewa Populer
                    </h2>
                    <p className="text-xs sm:text-sm text-[#586678] mt-1">
                      Sewa mobil & motor harian atau bulanan dengan kondisi prima dan bersih
                    </p>
                  </div>
                  <Link
                    href="/bisnis/sewa"
                    className="text-xs font-bold text-[#0B2A5B] border border-[#0B2A5B] px-4 py-2 rounded-lg hover:bg-[#0B2A5B] hover:text-white transition-colors shrink-0"
                  >
                    Lihat Semua Unit Sewa
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rentalVehicles.length === 0 ? (
                    <div className="col-span-3 text-center py-8 text-xs text-slate-400">
                      Belum ada unit sewa yang tersedia.
                    </div>
                  ) : (
                    rentalVehicles.map((item) => (
                      <div key={item.id} className="bg-[#F8FAFC] rounded-xl border border-[#E3E8EF] overflow-hidden flex flex-col justify-between">
                        <div>
                          <div className="h-44 bg-[#E2E8F0] overflow-hidden">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="p-5">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-[10px] font-bold uppercase tracking-wider bg-white px-2 py-0.5 rounded border border-[#E3E8EF] text-[#0B2A5B]">
                                {item.category} • {item.subCategory || "Unit"}
                              </span>
                              <span className="text-[11px] font-bold text-[#1F9D55]">● Ready</span>
                            </div>
                            <h3 className="text-base font-bold text-[#1A2233] line-clamp-1">{item.title}</h3>
                            <p className="text-xs text-[#586678] mt-1">
                              {item.transmission} • {item.fuel} • {item.seats ? `${item.seats} Seats` : "Motor"}
                            </p>
                          </div>
                        </div>
                        <div className="p-5 pt-0">
                          <div className="pt-3 border-t border-[#E3E8EF] flex items-center justify-between">
                            <div>
                              <p className="text-[10px] text-[#586678]">Mulai dari</p>
                              <p className="text-base font-extrabold text-[#0B2A5B]">
                                Rp {Number(item.price).toLocaleString("id-ID")}
                                <span className="text-xs font-normal text-[#586678]">{item.priceUnit || "/hari"}</span>
                              </p>
                            </div>
                            <Link
                              href={`/bisnis/sewa/${item.slug}`}
                              className="bg-[#0B2A5B] text-white text-xs font-bold px-3.5 py-2 rounded-md hover:bg-[#071B3D]"
                            >
                              Detail Sewa
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </section>
          </div>
        );

      case "sales":
        return (
          <section key="sales" className="py-16 bg-[#F8FAFC]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
                <div>
                  <span className="text-xs font-bold text-[#1F9D55] uppercase tracking-wider">
                    Katalog Jual Beli
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2A5B] mt-1">
                    Kendaraan Dijual Siap Pakai
                  </h2>
                  <p className="text-xs sm:text-sm text-[#586678] mt-1">
                    Pilihan mobil & motor bekas terawat dengan kelengkapan surat terjamin
                  </p>
                </div>
                <Link
                  href="/bisnis/jual-beli"
                  className="text-xs font-bold text-[#1F9D55] border border-[#1F9D55] px-4 py-2 rounded-lg hover:bg-[#1F9D55] hover:text-white transition-colors shrink-0"
                >
                  Lihat Semua Unit Dijual
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {saleVehicles.length === 0 ? (
                  <div className="col-span-3 text-center py-8 text-xs text-slate-400">
                    Belum ada unit jual-beli yang tersedia.
                  </div>
                ) : (
                  saleVehicles.map((item) => (
                    <div key={item.id} className="bg-white rounded-xl border border-[#E3E8EF] overflow-hidden flex flex-col justify-between shadow-sm">
                      <div>
                        <div className="h-44 bg-[#E2E8F0] overflow-hidden">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-5">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#1F9D55]/10 text-[#1F9D55] px-2 py-0.5 rounded">
                              {item.category} • Bekas Mulus
                            </span>
                            <span className="text-xs font-bold text-[#586678]">{item.mileage || "Low KM"}</span>
                          </div>
                          <h3 className="text-base font-bold text-[#1A2233] line-clamp-1">{item.title}</h3>
                          <p className="text-xs text-[#586678] mt-1">
                            Tahun {item.year || "Terbaru"} • Surat Lengkap
                          </p>
                        </div>
                      </div>
                      <div className="p-5 pt-0">
                        <div className="pt-3 border-t border-[#E3E8EF] flex items-center justify-between">
                          <div>
                            <p className="text-[10px] text-[#586678]">Harga Cash</p>
                            <p className="text-base font-extrabold text-[#0B2A5B]">
                              Rp {Number(item.price).toLocaleString("id-ID")}
                            </p>
                          </div>
                          <Link
                            href={`/bisnis/jual-beli/${item.slug}`}
                            className="bg-[#1F9D55] text-white text-xs font-bold px-3.5 py-2 rounded-md hover:bg-[#198045]"
                          >
                            Beli via WA
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>
        );

      case "whyUs":
        return (
          <section key="whyUs" className="bg-white py-16 border-t border-b border-[#E3E8EF]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-xs font-bold text-[#1E4FA3] uppercase tracking-wider">
                  Keunggulan Kami
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B2A5B] mt-1">
                  Mengapa Memilih Kami?
                </h2>
                <p className="text-xs sm:text-sm text-[#586678] mt-2">
                  Komitmen kami dalam memberikan kenyamanan, keamanan, dan kemudahan transaksi untuk setiap pelanggan.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E3E8EF] hover:shadow-md transition-all">
                  <div className="h-12 w-12 rounded-xl bg-[#0B2A5B] text-white flex items-center justify-center font-bold text-xl mb-4">
                    🛡️
                  </div>
                  <h3 className="text-base font-bold text-[#1A2233]">Unit Terawat & Lolos Inspeksi</h3>
                  <p className="text-xs text-[#586678] mt-2 leading-relaxed">
                    Semua mobil & motor dipastikan dalam kondisi mesin prima, servis rutin teratur, serta bebas dari bekas banjir atau tabrakan.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E3E8EF] hover:shadow-md transition-all">
                  <div className="h-12 w-12 rounded-xl bg-[#0B2A5B] text-white flex items-center justify-center font-bold text-xl mb-4">
                    📄
                  </div>
                  <h3 className="text-base font-bold text-[#1A2233]">Surat-Surat Terjamin Lengkap</h3>
                  <p className="text-xs text-[#586678] mt-2 leading-relaxed">
                    Keabsahan dokumen (STNK, BPKB, Faktur) dijamin 100% aman dan jelas untuk semua unit jual beli maupun sewa.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E3E8EF] hover:shadow-md transition-all">
                  <div className="h-12 w-12 rounded-xl bg-[#0B2A5B] text-white flex items-center justify-center font-bold text-xl mb-4">
                    💬
                  </div>
                  <h3 className="text-base font-bold text-[#1A2233]">Proses Cepat via WhatsApp</h3>
                  <p className="text-xs text-[#586678] mt-2 leading-relaxed">
                    Tanya-tanya, konsultasi unit, hingga booking sewa dan negosiasi beli bisa dilakukan langsung dengan tim sales resmi via WA.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E3E8EF] hover:shadow-md transition-all">
                  <div className="h-12 w-12 rounded-xl bg-[#0B2A5B] text-white flex items-center justify-center font-bold text-xl mb-4">
                    💰
                  </div>
                  <h3 className="text-base font-bold text-[#1A2233]">Harga Transparan & Bersaing</h3>
                  <p className="text-xs text-[#586678] mt-2 leading-relaxed">
                    Tidak ada biaya tersembunyi. Harga sewa jujur dan harga jual unit sangat bersaing sesuai dengan kondisi kendaraan.
                  </p>
                </div>
              </div>
            </div>
          </section>
        );

      case "news":
        return (
          <section key="news" className="bg-[#F8FAFC] py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Ruang Berita */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex justify-between items-end border-b border-[#E3E8EF] pb-3">
                    <div>
                      <span className="text-xs font-bold text-[#1E4FA3] uppercase">Kabar Terbaru</span>
                      <h2 className="text-xl font-bold text-[#0B2A5B]">Berita & Informasi</h2>
                    </div>
                    <Link href="/ruang-berita" className="text-xs font-bold text-[#1E4FA3] hover:underline">
                      Lihat Semua &rarr;
                    </Link>
                  </div>

                  <div className="space-y-4">
                    {newsList.length === 0 ? (
                      <div className="text-xs text-slate-400 py-4">Belum ada berita dipublikasikan.</div>
                    ) : (
                      newsList.map((item) => {
                        const imgUrl = getNewsImageUrl(item);
                        return (
                          <div key={item.id} className="flex gap-4 p-3 rounded-lg bg-white border border-[#E3E8EF] hover:border-[#1E4FA3] transition-colors">
                            <div className="h-16 w-24 bg-[#E2E8F0] rounded shrink-0 overflow-hidden relative">
                              <img
                                src={imgUrl}
                                alt={item.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="text-[10px] font-bold text-[#1E4FA3] uppercase">
                                {item.category || "Siaran Pers"}
                              </span>
                              <h4 className="text-xs sm:text-sm font-bold text-[#1A2233] line-clamp-1 hover:text-[#1E4FA3]">
                                <Link href={`/ruang-berita/${item.slug}`}>
                                  {item.title}
                                </Link>
                              </h4>
                              <p className="text-[11px] text-[#586678] mt-1">
                                {new Date(item.publishedAt || item.createdAt).toLocaleDateString("id-ID", {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                })}
                              </p>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* Investor & ESG */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="bg-white p-6 rounded-xl border border-[#E3E8EF]">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-bold text-[#0B2A5B]">Hubungan Investor</h3>
                      <span className="text-[10px] font-bold bg-[#F8FAFC] px-2 py-0.5 rounded border border-[#E3E8EF]">
                        Q3 2026
                      </span>
                    </div>
                    <p className="text-xs text-[#586678] mb-4">
                      Akses keterbukaan informasi, laporan keuangan berkala, dan publikasi resmi perusahaan.
                    </p>
                    <Link
                      href="/hubungan-investor"
                      className="inline-flex items-center text-xs font-bold text-[#1E4FA3] hover:underline gap-1"
                    >
                      Lihat Laporan Keuangan &rarr;
                    </Link>
                  </div>

                  <div className="bg-[#0B2A5B] text-white p-6 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-bold">Komitmen Keberlanjutan (ESG)</h3>
                      <span className="text-[10px] font-bold bg-white/10 px-2 py-0.5 rounded border border-white/20">
                        Eco Fleet
                      </span>
                    </div>
                    <p className="text-xs text-[#F5F7FA]/80 mb-4">
                      Upaya bertahap transisi ke armada ramah lingkungan demi mendukung tata kelola bersih.
                    </p>
                    <Link
                      href="/esg"
                      className="inline-flex items-center text-xs font-bold text-white underline hover:text-[#F5F7FA] gap-1"
                    >
                      Pelajari Program ESG &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] text-[#1A2233] antialiased selection:bg-[#0B2A5B] selection:text-white">
      <main className="flex-1 w-full">
        {/* Render section berurutan sesuai konfigurasi admin */}
        {sectionOrder.map((key: string) => renderSection(key))}
      </main>
    </div>
  );
}