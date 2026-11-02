import Link from "next/link";
import { db } from "@/lib/db";
import HeroSearch from "@/components/public/HeroSearch";
import PublicHeroCarousel from "@/components/public/PublicHeroCarousel";
import { 
  ShieldCheck, 
  Tag, 
  Lock, 
  Clock, 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight,
  Star,
  CheckCircle2,
  Calendar,
  Search,
  Key,
  Users,
  Briefcase
} from "lucide-react";

export const revalidate = 0; // Data real-time

export default async function HomePage() {
  // 1. Fetch CMS Beranda dari Prisma
  const pageContent = await db.pageContent.findUnique({
    where: { pageKey: "beranda" },
  });

  const sectionsData = (pageContent?.sections as any) || {};

  const DEFAULT_SLIDES = [
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1920&q=80",
  ];

  const carouselSlides =
    Array.isArray(sectionsData.heroCarousel) && sectionsData.heroCarousel.length > 0
      ? sectionsData.heroCarousel.map((item: any) => item.imageUrl)
      : DEFAULT_SLIDES;

  const configuredSectionOrder = Array.isArray(sectionsData.sectionOrder)
    ? sectionsData.sectionOrder
    : ["hero", "categories", "whyUs", "rentals", "sales", "promos", "reviews", "news", "howItWorks", "contactBar"];

  const preferredSectionOrder = [
    "hero",
    "categories",
    "whyUs",
    "rentals",
    "sales",
    "promos",
    "reviews",
    "news",
    "howItWorks",
    "contactBar",
  ];

  const sectionOrder = preferredSectionOrder.filter(
    (key) => key === "promos" || key === "reviews" || key === "categories" || configuredSectionOrder.includes(key)
  );

  // 2. Fetch Data Kendaraan & Berita
  const rentalVehicles = await db.vehicle.findMany({
    where: { type: "SEWA", status: "READY" },
    take: 6,
    orderBy: { createdAt: "desc" },
  });

  const saleVehicles = await db.vehicle.findMany({
    where: { type: "JUAL_BELI", status: "READY" },
    take: 6,
    orderBy: { createdAt: "desc" },
  });

  const newsList = await db.news.findMany({
    where: { status: "PUBLISHED" },
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  const ratedVehicles = [...rentalVehicles, ...saleVehicles].filter((vehicle: any) => {
    const value = Number(vehicle?.rating ?? vehicle?.averageRating ?? 0);
    return Number.isFinite(value) && value > 0;
  });

  const getNewsImageUrl = (newsItem: any) => {
    const rawImage = newsItem.image || newsItem.imageUrl || newsItem.coverImage;
    if (typeof rawImage === "string" && rawImage.trim() !== "") return rawImage;
    if (Array.isArray(newsItem.images) && newsItem.images.length > 0) return newsItem.images[0];
    return "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=400&q=80";
  };

  const renderVehicleRating = (vehicle: any) => {
    const ratingValue = Number(vehicle?.rating ?? vehicle?.averageRating ?? 0);
    const reviewCount = Number(vehicle?.reviewCount ?? vehicle?.totalReviews ?? 0);
    const hasRating = Number.isFinite(ratingValue) && ratingValue > 0;

    return (
      <div className="mt-2 flex min-h-4 items-center gap-1.5 text-[10px] sm:text-[11px]">
        <span className={`flex items-center gap-0.5 ${hasRating ? "text-amber-400" : "text-slate-300"}`} aria-label={hasRating ? `Rating ${ratingValue.toFixed(1)} dari 5` : "Belum ada rating"}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} className={`h-2.5 w-2.5 sm:h-3 sm:w-3 ${hasRating && index < Math.round(ratingValue) ? "fill-current" : ""}`} />
          ))}
        </span>
        {hasRating ? (
          <span className="font-semibold text-slate-700">{ratingValue.toFixed(1)} <span className="font-normal text-slate-400">({reviewCount})</span></span>
        ) : (
          <span className="text-slate-400">Belum ada ulasan</span>
        )}
      </div>
    );
  };

  // 3. Renderer Komponen berdasarkan Section Order
  const renderSection = (key: string) => {
    switch (key) {
      case "hero":
        return (
          <section key="hero" className="relative bg-[#0B2A5B] pb-6 sm:pb-8 pt-[64px] sm:pt-[76px]">
            <div className="relative isolate min-h-[400px] overflow-hidden bg-[#071B3D] sm:min-h-[480px] lg:min-h-[520px]">
              <img
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2200&q=90"
                alt="Kendaraan pilihan TRANS90"
                className="absolute inset-0 -z-20 h-full w-full object-cover object-center opacity-30"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0B2A5B] via-[#0B2A5B]/90 to-transparent" />
              <div className="mx-auto grid min-h-[400px] max-w-7xl items-center px-4 pb-20 pt-5 sm:min-h-[480px] sm:px-6 sm:pb-24 sm:pt-14 lg:min-h-[520px] lg:grid-cols-2 lg:gap-8 lg:px-8">
                <div className="max-w-xl text-white">
                  <h1 className="mt-3 text-2xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight">
                    Temukan Kendaraan <span className="text-amber-400">Impianmu.</span>
                  </h1>
                  <p className="mt-3 max-w-lg text-xs leading-relaxed text-slate-200/90 sm:text-sm">
                    Sewa kendaraan untuk setiap perjalanan atau temukan kendaraan yang tepat untuk dimiliki. Semua lebih mudah bersama TRANS90.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2.5">
                    <Link href="/bisnis/sewa" className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-2.5 sm:px-5 sm:py-3 text-xs font-bold text-slate-900 shadow-md transition hover:bg-amber-300">
                      Cari Kendaraan <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <Link href="/bisnis/jual-beli" className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md px-4 py-2.5 sm:px-5 sm:py-3 text-xs font-bold text-white transition hover:bg-white hover:text-[#0B2A5B]">
                      Lihat Jual Beli
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* FLOATING SEARCH BAR */}
            <div className="relative z-20 mx-auto -mt-12 w-full max-w-7xl px-3 sm:-mt-16 sm:px-6 lg:px-8">
              <div className="rounded-2xl border border-slate-100 bg-white p-3.5 sm:p-5 shadow-xl">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <div>
                    <p className="text-xs sm:text-sm font-extrabold text-[#0B2A5B]">Cari kendaraan pilihanmu</p>
                  </div>
                  <span className="hidden sm:inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-extrabold text-[#0B2A5B] border border-blue-100">SEWA & JUAL BELI</span>
                </div>
                <HeroSearch />
              </div>
            </div>
          </section>
        );

        return (
          <section key="categories" className="py-10 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-2">
                <div>
                  <span className="text-[10px] sm:text-xs font-bold text-amber-500 uppercase tracking-widest">CATEGORIES</span>
                  <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 mt-0.5 tracking-tight">CHOOSE YOUR RIDE</h2>
                </div>
                <Link href="/bisnis/sewa" className="text-xs font-bold text-slate-700 hover:text-amber-500 transition flex items-center gap-1">
                  View All Vehicles &rarr;
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                {[
                  { title: "Economy Cars", seats: "4 Seats", bags: "2 Bags", price: "150rb", img: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=400&q=80" },
                  { title: "Sedans", seats: "5 Seats", bags: "3 Bags", price: "250rb", img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=400&q=80" },
                  { title: "SUVs", seats: "7 Seats", bags: "4 Bags", price: "350rb", img: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=400&q=80" },
                  { title: "Luxury Cars", seats: "5 Seats", bags: "3 Bags", price: "700rb", img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=80" },
                  { title: "Motor Matic", seats: "2 Seats", bags: "1 Helm", price: "80rb", img: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=400&q=80" },
                ].map((item, idx) => (
                  <Link href="/bisnis/sewa" key={idx} className="p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all duration-300 group flex flex-col justify-between">
                    <div>
                      <div className="h-24 sm:h-28 overflow-hidden rounded-lg mb-2">
                        <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                      </div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#0B2A5B] transition">{item.title}</h3>
                      <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] text-slate-400 mt-1">
                        <span className="flex items-center gap-0.5"><Users className="h-2.5 w-2.5" /> {item.seats}</span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5"><Briefcase className="h-2.5 w-2.5" /> {item.bags}</span>
                      </div>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[9px] font-semibold text-slate-400">From</span>
                      <span className="text-xs sm:text-sm font-black text-amber-500">Rp {item.price}<span className="text-[9px] font-normal text-slate-400">/day</span></span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );

      case "whyUs":
        return (
          <section key="whyUs" className="py-10 bg-slate-50/50 border-t border-slate-100">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-xl mx-auto mb-6">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">WHY CHOOSE TRANS90?</h2>
              </div>

              {/* GRID 2x2 ATAS 2 BAWAH 2 AGAR IRIT LAPAK */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {[
                  { icon: ShieldCheck, title: "Verified Listings", desc: "Inspeksi mesin & fisik ketat garansi siap jalan." },
                  { icon: Tag, title: "Best Price", desc: "Harga jujur & transparan tanpa biaya tersembunyi." },
                  { icon: Lock, title: "Secure Deals", desc: "Kelengkapan STNK & BPKB 100% aman dan terjamin." },
                  { icon: Clock, title: "Fast Process & 24/7", desc: "Booking cepat via WA & tim siap bantu di jalan." },
                ].map((item, idx) => (
                  <div key={idx} className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-slate-100 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 hover:shadow-md transition">
                    <div className="h-9 w-9 sm:h-10 sm:w-10 shrink-0 rounded-lg sm:rounded-xl bg-[#0B2A5B] text-amber-400 flex items-center justify-center">
                      <item.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">{item.title}</h4>
                      <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5 leading-snug">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case "rentals":
        return (
          <section key="rentals" className="py-10 bg-white border-t border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-2">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">SEWA KENDARAAN</h2>
                </div>
                <Link href="/bisnis/sewa" className="text-xs font-bold text-[#0B2A5B] bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-lg hover:bg-[#0B2A5B] hover:text-white transition">
                  Lihat Semua &rarr;
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {rentalVehicles.length === 0 ? (
                  <div className="col-span-3 text-center py-8 text-xs text-slate-400">Belum ada armada sewa tersedia.</div>
                ) : (
                  rentalVehicles.map((item) => (
                    <div key={item.id} className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-3 sm:p-4 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
                      <div>
                        <div className="relative mb-2.5 h-40 sm:h-48 overflow-hidden rounded-lg bg-slate-100">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                          <span className="absolute top-2 left-2 text-[9px] font-bold uppercase bg-[#0B2A5B] text-white px-2.5 py-0.5 rounded-full">
                            {item.subCategory || item.category}
                          </span>
                        </div>
                        <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#0B2A5B] transition line-clamp-1">{item.title}</h3>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {item.transmission} • {item.fuel || "Bensin"}
                        </p>
                        {renderVehicleRating(item)}
                      </div>

                      <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <p className="text-[9px] text-slate-400">Mulai</p>
                          <p className="text-base sm:text-lg font-black text-amber-500">
                            Rp {Number(item.price).toLocaleString("id-ID")}
                            <span className="text-[10px] font-normal text-slate-400">{item.priceUnit || "/hari"}</span>
                          </p>
                        </div>
                        <Link href={`/bisnis/sewa/${item.slug}`} className="bg-[#0B2A5B] text-white text-xs font-bold px-3.5 py-2 rounded-lg hover:bg-[#071B3D] transition">
                          Sewa
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>
        );

      case "sales":
        return (
          <section key="sales" className="py-10 bg-slate-50/50 border-t border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-2">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">JUAL BELI KENDARAAN</h2>
                </div>
                <Link href="/bisnis/jual-beli" className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-lg hover:bg-emerald-600 hover:text-white transition">
                  Lihat Semua &rarr;
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {saleVehicles.length === 0 ? (
                  <div className="col-span-3 text-center py-8 text-xs text-slate-400">Belum ada unit jual beli tersedia.</div>
                ) : (
                  saleVehicles.map((item) => (
                    <div key={item.id} className="bg-white rounded-xl sm:rounded-2xl border border-slate-100 p-3 sm:p-4 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
                      <div>
                        <div className="relative mb-2.5 h-40 sm:h-48 overflow-hidden rounded-lg bg-slate-100">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                          <span className="absolute top-2 left-2 text-[9px] font-bold uppercase bg-emerald-600 text-white px-2.5 py-0.5 rounded-full">
                            Siap Pakai
                          </span>
                        </div>
                        <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-emerald-600 transition line-clamp-1">{item.title}</h3>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Tahun {item.year || "Terbaru"} • {item.mileage || "Low KM"}
                        </p>
                        {renderVehicleRating(item)}
                      </div>

                      <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <p className="text-[9px] text-slate-400">Harga Cash</p>
                          <p className="text-base sm:text-lg font-black text-slate-900">
                            Rp {Number(item.price).toLocaleString("id-ID")}
                          </p>
                        </div>
                        <Link href={`/bisnis/jual-beli/${item.slug}`} className="bg-emerald-600 text-white text-xs font-bold px-3.5 py-2 rounded-lg hover:bg-emerald-700 transition">
                          Beli WA
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>
        );

      case "promos":
        return (
          <section key="promos" className="bg-white py-8 sm:py-10 border-t border-slate-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
                <div>
                  <span className="text-[10px] sm:text-xs font-bold text-amber-500 uppercase tracking-widest">PROMO</span>
                  <h2 className="mt-0.5 text-xl sm:text-2xl font-black text-slate-900">Penawaran Spesial TRANS90</h2>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-xl bg-[#071B3D] shadow-lg border border-white/10 sm:rounded-2xl">
                <div className="h-[200px] sm:h-[300px] w-full">
                  <PublicHeroCarousel slides={carouselSlides} />
                </div>
              </div>
            </div>
          </section>
        );

      case "reviews":
        return (
          <section key="reviews" className="border-t border-slate-100 bg-slate-50/50 py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-4">
                <span className="text-[10px] sm:text-xs font-bold text-amber-500 uppercase tracking-widest">TESTIMONIAL</span>
                <h2 className="mt-0.5 text-xl sm:text-2xl font-black text-slate-900">Rating dari Pengguna</h2>
              </div>
              {ratedVehicles.length > 0 ? (
                <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:thin] sm:mx-0 sm:px-0">
                  {ratedVehicles.map((item: any) => {
                    const rating = Number(item.rating ?? item.averageRating);
                    const count = Number(item.reviewCount ?? item.totalReviews ?? 0);
                    const isRental = item.type === "SEWA";
                    return (
                      <article key={`rating-${item.id}`} className="w-[240px] shrink-0 snap-start rounded-xl border border-slate-100 bg-white p-3.5 shadow-sm sm:w-[280px]">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[9px] font-bold uppercase tracking-widest text-[#0B2A5B]">{isRental ? "SEWA" : "JUAL BELI"}</span>
                            <h3 className="mt-0.5 line-clamp-1 text-xs sm:text-sm font-extrabold text-slate-900">{item.title}</h3>
                          </div>
                          <div className="flex shrink-0 items-center gap-1 rounded bg-amber-50 px-1.5 py-0.5 text-[10px] font-extrabold text-amber-600"><Star className="h-2.5 w-2.5 fill-current" /> {rating.toFixed(1)}</div>
                        </div>
                        <div className="mt-3 flex items-center gap-1 text-amber-400">
                          {Array.from({ length: 5 }).map((_, index) => <Star key={index} className={`h-3 w-3 ${index < Math.round(rating) ? "fill-current" : "text-slate-200"}`} />)}
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-slate-200 bg-white p-6 text-center">
                  <p className="text-xs text-slate-400">Belum ada rating pengguna yang tersedia.</p>
                </div>
              )}
            </div>
          </section>
        );

      case "howItWorks":
        return (
          <section key="howItWorks" className="py-10 bg-white border-t border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-xl mx-auto mb-6">
                <span className="text-[10px] sm:text-xs font-bold text-amber-500 uppercase tracking-widest">EASY STEPS</span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">HOW IT WORKS</h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                {[
                  { icon: Search, step: "1. Search", desc: "Pilih lokasi & armada." },
                  { icon: Calendar, step: "2. Book", desc: "Isi form/WhatsApp." },
                  { icon: Key, step: "3. Pick Up", desc: "Ambil/layanan antar." },
                  { icon: CheckCircle2, step: "4. Drive & Enjoy", desc: "Nikmati perjalanan aman." },
                ].map((st, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-50/50 border border-slate-100 text-center space-y-2">
                    <div className="h-10 w-10 mx-auto rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center">
                      <st.icon className="h-5 w-5" />
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">{st.step}</h4>
                    <p className="text-[10px] sm:text-xs text-slate-400 leading-tight">{st.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case "news":
        return (
          <section key="news" className="border-t border-slate-100 bg-slate-50/50 py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-4 flex items-end justify-between gap-2">
                <div>
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#0B2A5B]">BERITA</span>
                  <h2 className="mt-0.5 text-xl sm:text-2xl font-black text-slate-900">Kabar Otomotif</h2>
                </div>
                <Link href="/ruang-berita" className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-[#0B2A5B] hover:text-amber-500 transition">Semua berita <ArrowRight className="h-3.5 w-3.5" /></Link>
              </div>
              {newsList.length === 0 ? (
                <div className="py-6 text-xs text-slate-400">Belum ada berita dipublikasikan.</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {newsList.map((item) => {
                    const imgUrl = getNewsImageUrl(item);
                    return (
                      <article key={item.id} className="group flex gap-3 rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
                        <Link href={`/ruang-berita/${item.slug}`} className="h-20 w-24 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                          <img src={imgUrl} alt={item.title} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
                        </Link>
                        <div className="flex min-w-0 flex-1 flex-col justify-center">
                          <span className="text-[9px] font-bold uppercase tracking-widest text-amber-500">{item.category || "Berita"}</span>
                          <h3 className="mt-0.5 line-clamp-2 text-xs sm:text-sm font-bold text-slate-900 transition group-hover:text-[#0B2A5B]">
                            <Link href={`/ruang-berita/${item.slug}`}>{item.title}</Link>
                          </h3>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        );

      case "contactBar":
        return (
          <section key="contactBar" className="bg-[#071B3D] py-8 text-white border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="p-2.5 rounded-lg bg-[#0B2A5B] text-amber-400">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Hubungi Sales</p>
                    <p className="text-xs sm:text-sm font-extrabold text-white">+62 812-3456-7890</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="p-2.5 rounded-lg bg-[#0B2A5B] text-amber-400">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Email Bantuan</p>
                    <p className="text-xs sm:text-sm font-extrabold text-white">support@trans90.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="p-2.5 rounded-lg bg-[#0B2A5B] text-amber-400">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Lokasi Office</p>
                    <p className="text-xs sm:text-sm font-extrabold text-white">Jakarta Selatan, Indonesia</p>
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
    <div className="flex flex-col min-h-screen bg-white text-slate-800 antialiased selection:bg-amber-400 selection:text-slate-900">
      <main className="flex-1 w-full">
        {sectionOrder.map((key: string) => renderSection(key))}
      </main>
    </div>
  );
}