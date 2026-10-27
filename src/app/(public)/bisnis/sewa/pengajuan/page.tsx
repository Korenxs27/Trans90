"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  User,
  Phone,
  Mail,
  MapPin,
  Car,
  CheckCircle2,
  AlertCircle,
  FileText,
  Loader2,
  Lock,
  ShieldCheck,
  Sparkles,
  Upload,
  CreditCard,
  Building2,
  FileUp,
  Check,
} from "lucide-react";
import { toast } from "sonner";

function FormPengajuanContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Parameter dari Query String URL
  const slugParam = searchParams.get("slug");
  const vehicleIdParam = searchParams.get("vehicleId");

  const [vehicle, setVehicle] = useState<any>(null);
  const [loadingVehicle, setLoadingVehicle] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(1);

  // State Form Lengkap
  const [rentalType, setRentalType] = useState<"PRIBADI" | "PERUSAHAAN">("PRIBADI");
  const [fullName, setFullName] = useState("");
  const [nik, setNik] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  
  // Dokumen Verifikasi Identitas
  const [ktpFileName, setKtpFileName] = useState<string | null>(null);
  const [simFileName, setSimFileName] = useState<string | null>(null);

  // Detail Sewa
  const [pickupMethod, setPickupMethod] = useState<"DELIVERY" | "POOL">("DELIVERY");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [withDriver, setWithDriver] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("TRANSFER_BANK");
  const [notes, setNotes] = useState("");

  // Fetch Detail Kendaraan berdasarkan Slug atau VehicleId
  useEffect(() => {
    const targetIdentifier = slugParam || vehicleIdParam;

    if (!targetIdentifier) {
      setLoadingVehicle(false);
      return;
    }

    let isMounted = true;
    setLoadingVehicle(true);

    fetch(`/api/vehicles/${targetIdentifier}`)
      .then((res) => {
        if (!res.ok) throw new Error("Gagal mengambil data unit");
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          if (data && (data.id || data.slug)) {
            setVehicle(data);
          } else {
            setVehicle(null);
          }
        }
      })
      .catch(() => {
        if (isMounted) {
          toast.error("Gagal memuat detail unit kendaraan");
          setVehicle(null);
        }
      })
      .finally(() => {
        if (isMounted) setLoadingVehicle(false);
      });

    return () => {
      isMounted = false;
    };
  }, [slugParam, vehicleIdParam]);

  // Kalkulasi Durasi Hari
  const calculateDays = () => {
    if (!startDate || !endDate) return 1;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const totalDays = calculateDays();
  const unitPrice = vehicle ? Number(vehicle.price) : 0;
  const driverFeePerDay = 150000;
  const deliveryFee = pickupMethod === "DELIVERY" ? 50000 : 0;
  const driverFee = withDriver ? driverFeePerDay * totalDays : 0;
  const totalAmount = unitPrice * totalDays + driverFee + deliveryFee;

  // Handle Mock Upload File
  const handleFileUpload = (type: "KTP" | "SIM", e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === "KTP") {
        setKtpFileName(file.name);
        toast.success("Foto KTP berhasil diunggah!");
      } else {
        setSimFileName(file.name);
        toast.success("Foto SIM A berhasil diunggah!");
      }
    }
  };

  // Step Validation & Navigation
  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!fullName || !phone || !email || !nik) {
        toast.error("Mohon isi seluruh data identitas wajib!");
        return;
      }
      if (!ktpFileName) {
        toast.error("Mohon unggah foto KTP untuk verifikasi identitas!");
        return;
      }
      if (!withDriver && !simFileName) {
        toast.error("Sewa lepas kunci wajib mengunggah foto SIM A aktif!");
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!startDate || !endDate) {
        toast.error("Mohon tentukan tanggal mulai dan selesai sewa!");
        return;
      }
      if (pickupMethod === "DELIVERY" && !location) {
        toast.error("Mohon isi lokasi alamat pengantaran unit!");
        return;
      }
      setCurrentStep(3);
    }
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!vehicle) {
      toast.error("Unit kendaraan belum dipilih!");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vehicleId: vehicle.id,
          vehicleSlug: vehicle.slug,
          rentalType,
          fullName,
          nik,
          companyName: rentalType === "PERUSAHAAN" ? companyName : null,
          phone,
          email,
          ktpFileName,
          simFileName,
          pickupMethod,
          location: pickupMethod === "DELIVERY" ? location : "Pool Utama AutoCorp",
          startDate,
          endDate,
          totalDays,
          withDriver,
          paymentMethod,
          unitPrice,
          driverFee,
          deliveryFee,
          totalAmount,
          notes,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal mengajukan sewa");

      toast.success("Pengajuan sewa berhasil dikirim!");
      router.push(`/bisnis/sewa/pengajuan/sukses?orderNumber=${data.orderNumber}`);
    } catch (err: any) {
      toast.error(err.message || "Terjadi kesalahan saat membuat pesanan");
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingVehicle) {
    return (
      <div className="fixed inset-0 z-[999] bg-[#F8FAFC] flex flex-col items-center justify-center text-xs text-slate-500 gap-3">
        <Loader2 className="h-6 w-6 animate-spin text-[#0B2A5B]" />
        <span className="font-semibold">Memuat data unit sewa...</span>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[999] bg-[#F8FAFC] text-[#1A2233] overflow-y-auto antialiased">
      {/* HEADER SIMPEL CHECKOUT FOCUS MODE */}
      <header className="bg-white border-b border-[#E3E8EF] sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            href={vehicle?.slug ? `/bisnis/sewa/${vehicle.slug}` : "/bisnis/sewa"}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#0B2A5B] transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Kembali ke Detail Unit</span>
          </Link>

          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-[#0B2A5B] text-white font-black flex items-center justify-center text-xs shadow-sm">
              A
            </div>
            <span className="text-base font-black text-[#0B2A5B] tracking-tight">
              AUTOCORP
            </span>
          </div>
        </div>
      </header>

      {/* BODY KONTEN */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {!vehicle ? (
          /* EMPTY STATE JIKA UNIT BELUM DIPILIH */
          <div className="max-w-md mx-auto my-12 bg-white rounded-3xl border border-[#E3E8EF] p-8 text-center shadow-sm space-y-5">
            <div className="h-16 w-16 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center mx-auto border border-amber-100">
              <AlertCircle className="h-8 w-8" />
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-extrabold text-[#0B2A5B]">
                Unit Kendaraan Belum Dipilih
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                Silakan pilih unit kendaraan sewa terlebih dahulu melalui katalog resmi kami.
              </p>
            </div>
            <Link
              href="/bisnis/sewa"
              className="inline-flex items-center justify-center gap-2 bg-[#0B2A5B] hover:bg-[#1E4FA3] text-white text-xs font-bold px-5 py-3 rounded-xl transition shadow-sm w-full"
            >
              <Car className="h-4 w-4" />
              <span>Buka Katalog Sewa Armada</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {/* HEADER STEPPER */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E4FA3] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                  <Sparkles className="h-3.5 w-3.5" />
                  Reservasi Online Unit: {vehicle.title || vehicle.name}
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-[#0B2A5B] tracking-tight mt-1">
                  Formulir Pengajuan Sewa Kendaraan
                </h1>
              </div>

              {/* STEPPER INDICATOR */}
              <div className="flex items-center gap-2 text-xs font-bold">
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border ${currentStep === 1 ? "bg-[#0B2A5B] text-white border-[#0B2A5B]" : "bg-white text-slate-500 border-slate-200"}`}>
                  <span>1. Identitas</span>
                </div>
                <span className="text-slate-300">•</span>
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border ${currentStep === 2 ? "bg-[#0B2A5B] text-white border-[#0B2A5B]" : "bg-white text-slate-500 border-slate-200"}`}>
                  <span>2. Jadwal & Opsi</span>
                </div>
                <span className="text-slate-300">•</span>
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border ${currentStep === 3 ? "bg-[#0B2A5B] text-white border-[#0B2A5B]" : "bg-white text-slate-500 border-slate-200"}`}>
                  <span>3. Pembayaran</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* FORM UTAMA (BERDASARKAN STEP AKTIF) */}
              <div className="lg:col-span-7 space-y-6">
                {/* STEP 1: VERIFIKASI IDENTITAS & FOTO KTP/SIM */}
                {currentStep === 1 && (
                  <div className="bg-white rounded-2xl border border-[#E3E8EF] p-6 sm:p-8 shadow-sm space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                      <h2 className="text-xs font-extrabold text-[#0B2A5B] uppercase tracking-wider flex items-center gap-2">
                        <User className="h-4 w-4 text-[#1E4FA3]" />
                        <span>Langkah 1: Identitas & Dokumen Verifikasi</span>
                      </h2>

                      {/* KATEGORI SEWA PRIBADI / KORPORAT */}
                      <div className="flex bg-slate-100 p-1 rounded-xl">
                        <button
                          type="button"
                          onClick={() => setRentalType("PRIBADI")}
                          className={`px-3 py-1 text-[11px] font-bold rounded-lg transition ${rentalType === "PRIBADI" ? "bg-white text-[#0B2A5B] shadow-sm" : "text-slate-500"}`}
                        >
                          Pribadi
                        </button>
                        <button
                          type="button"
                          onClick={() => setRentalType("PERUSAHAAN")}
                          className={`px-3 py-1 text-[11px] font-bold rounded-lg transition ${rentalType === "PERUSAHAAN" ? "bg-white text-[#0B2A5B] shadow-sm" : "text-slate-500"}`}
                        >
                          Perusahaan
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4 text-xs">
                      {rentalType === "PERUSAHAAN" && (
                        <div>
                          <label className="block font-bold text-slate-700 mb-1.5">
                            Nama Perusahaan / PT / CV *
                          </label>
                          <input
                            type="text"
                            required
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            placeholder="Contoh: PT AutoCorp Indonesia Tbk"
                            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 focus:bg-white focus:border-[#1E4FA3] focus:outline-none transition"
                          />
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1.5">
                            Nama Lengkap Penanggung Jawab *
                          </label>
                          <input
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Sesuai KTP"
                            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 focus:bg-white focus:border-[#1E4FA3] focus:outline-none transition"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1.5">
                            NIK KTP (16 Digit) *
                          </label>
                          <input
                            type="text"
                            required
                            maxLength={16}
                            value={nik}
                            onChange={(e) => setNik(e.target.value)}
                            placeholder="3171000000000000"
                            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 focus:bg-white focus:border-[#1E4FA3] focus:outline-none transition"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1.5">
                            Nomor WhatsApp / HP *
                          </label>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="081234567890"
                            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 focus:bg-white focus:border-[#1E4FA3] focus:outline-none transition"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1.5">
                            Email Aktif *
                          </label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="email@example.com"
                            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 focus:bg-white focus:border-[#1E4FA3] focus:outline-none transition"
                          />
                        </div>
                      </div>

                      {/* UNGGAH DOKUMEN FOTO KTP & SIM A */}
                      <div className="pt-2 border-t border-slate-100 space-y-3">
                        <label className="block font-bold text-slate-800">
                          Unggah Foto Dokumen Wajib (Untuk Verifikasi Keamanan) *
                        </label>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* FOTO KTP */}
                          <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center hover:border-[#1E4FA3] transition bg-slate-50/50 relative">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFileUpload("KTP", e)}
                              className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                            <div className="space-y-1">
                              {ktpFileName ? (
                                <div className="flex items-center justify-center gap-1.5 text-emerald-600 font-bold">
                                  <Check className="h-4 w-4" />
                                  <span className="line-clamp-1">{ktpFileName}</span>
                                </div>
                              ) : (
                                <>
                                  <FileUp className="h-6 w-6 text-[#1E4FA3] mx-auto" />
                                  <span className="font-bold text-slate-700 block">Foto KTP Asli *</span>
                                  <span className="text-[10px] text-slate-400">Klik untuk upload (JPG/PNG)</span>
                                </>
                              )}
                            </div>
                          </div>

                          {/* FOTO SIM A (WAJIB JIKA LEPAS KUNCI) */}
                          <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center hover:border-[#1E4FA3] transition bg-slate-50/50 relative">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFileUpload("SIM", e)}
                              className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                            <div className="space-y-1">
                              {simFileName ? (
                                <div className="flex items-center justify-center gap-1.5 text-emerald-600 font-bold">
                                  <Check className="h-4 w-4" />
                                  <span className="line-clamp-1">{simFileName}</span>
                                </div>
                              ) : (
                                <>
                                  <FileUp className="h-6 w-6 text-[#1E4FA3] mx-auto" />
                                  <span className="font-bold text-slate-700 block">
                                    Foto SIM A Aktif {withDriver ? "(Opsional)" : "*"}
                                  </span>
                                  <span className="text-[10px] text-slate-400">Wajib jika tanpa driver</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="w-full bg-[#0B2A5B] hover:bg-[#1E4FA3] text-white text-xs font-bold py-3.5 rounded-xl transition shadow-md"
                    >
                      Lanjut ke Jadwal & Opsi Layanan →
                    </button>
                  </div>
                )}

                {/* STEP 2: JADWAL SEWA, LOKASI & OPTION DRIVER */}
                {currentStep === 2 && (
                  <div className="bg-white rounded-2xl border border-[#E3E8EF] p-6 sm:p-8 shadow-sm space-y-6">
                    <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
                      <h2 className="text-xs font-extrabold text-[#0B2A5B] uppercase tracking-wider flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-[#1E4FA3]" />
                        <span>Langkah 2: Jadwal & Opsi Penjemputan</span>
                      </h2>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="text-[11px] font-bold text-[#1E4FA3] hover:underline"
                      >
                        ← Edit Identitas
                      </button>
                    </div>

                    <div className="space-y-4 text-xs">
                      {/* TANGGAL SEWA */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1.5">
                            Tanggal Mulai Sewa *
                          </label>
                          <input
                            type="date"
                            required
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 focus:bg-white focus:border-[#1E4FA3] focus:outline-none transition"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1.5">
                            Tanggal Selesai Sewa *
                          </label>
                          <input
                            type="date"
                            required
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 focus:bg-white focus:border-[#1E4FA3] focus:outline-none transition"
                          />
                        </div>
                      </div>

                      {/* METODE PENJEMPUTAN UNIT */}
                      <div className="space-y-2 pt-2">
                        <label className="block font-bold text-slate-700">Metode Penjemputan Unit</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setPickupMethod("DELIVERY")}
                            className={`p-3.5 rounded-xl border text-left transition ${pickupMethod === "DELIVERY" ? "bg-blue-50/80 border-[#1E4FA3]" : "bg-slate-50/50 border-slate-200"}`}
                          >
                            <span className="font-bold text-slate-800 block">Diantar ke Lokasi (+Rp 50rb)</span>
                            <span className="text-[10px] text-slate-500">Dikirim langsung ke rumah/stasiun/bandara</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setPickupMethod("POOL")}
                            className={`p-3.5 rounded-xl border text-left transition ${pickupMethod === "POOL" ? "bg-blue-50/80 border-[#1E4FA3]" : "bg-slate-50/50 border-slate-200"}`}
                          >
                            <span className="font-bold text-slate-800 block">Ambil Sendiri di Pool (Gratis)</span>
                            <span className="text-[10px] text-slate-500">Ambil di Garage Pool Utama AutoCorp</span>
                          </button>
                        </div>
                      </div>

                      {pickupMethod === "DELIVERY" && (
                        <div>
                          <label className="block font-bold text-slate-700 mb-1.5">
                            Alamat Lengkap Pengantaran Armada *
                          </label>
                          <input
                            type="text"
                            required
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Alamat Lengkap / Terminal Bandara / Stasiun..."
                            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 focus:bg-white focus:border-[#1E4FA3] focus:outline-none transition"
                          />
                        </div>
                      )}

                      {/* CHECKBOX DRIVER */}
                      <div className="pt-2">
                        <label className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 bg-slate-50/50 cursor-pointer hover:bg-slate-100 transition">
                          <input
                            type="checkbox"
                            checked={withDriver}
                            onChange={(e) => setWithDriver(e.target.checked)}
                            className="h-4 w-4 mt-0.5 rounded text-[#0B2A5B] focus:ring-[#0B2A5B]"
                          />
                          <div>
                            <span className="font-bold text-slate-800">
                              Gunakan Layanan Driver Profesional (+Rp 150.000/hari)
                            </span>
                            <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                              Sewa makin praktis. Driver profesional tersertifikasi defensive driving.
                            </p>
                          </div>
                        </label>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1.5">
                          Catatan Tambahan (Opsional)
                        </label>
                        <textarea
                          rows={2}
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="Contoh: Minta dipasangkan Baby Seat, jam jemput 08.00 WIB..."
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 text-slate-900 focus:bg-white focus:border-[#1E4FA3] focus:outline-none transition resize-none"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="w-1/3 bg-slate-100 text-slate-700 font-bold text-xs py-3.5 rounded-xl hover:bg-slate-200 transition"
                      >
                        Kembali
                      </button>
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="w-2/3 bg-[#0B2A5B] hover:bg-[#1E4FA3] text-white text-xs font-bold py-3.5 rounded-xl transition shadow-md"
                      >
                        Lanjut ke Pembayaran →
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: METODE PEMBAYARAN & SUBMIT */}
                {currentStep === 3 && (
                  <div className="bg-white rounded-2xl border border-[#E3E8EF] p-6 sm:p-8 shadow-sm space-y-6">
                    <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
                      <h2 className="text-xs font-extrabold text-[#0B2A5B] uppercase tracking-wider flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-[#1E4FA3]" />
                        <span>Langkah 3: Metode Pembayaran & Konfirmasi</span>
                      </h2>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="text-[11px] font-bold text-[#1E4FA3] hover:underline"
                      >
                        ← Edit Jadwal
                      </button>
                    </div>

                    <div className="space-y-4 text-xs">
                      <label className="block font-bold text-slate-800">
                        Pilih Metode Pembayaran
                      </label>

                      <div className="space-y-2">
                        <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 cursor-pointer hover:bg-slate-100 transition">
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="payment"
                              value="TRANSFER_BANK"
                              checked={paymentMethod === "TRANSFER_BANK"}
                              onChange={(e) => setPaymentMethod(e.target.value)}
                              className="h-4 w-4 text-[#0B2A5B]"
                            />
                            <span className="font-bold text-slate-800">Transfer Bank / Virtual Account (BCA, Mandiri, BNI)</span>
                          </div>
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Otomatis</span>
                        </label>

                        <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 cursor-pointer hover:bg-slate-100 transition">
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="payment"
                              value="CREDIT_CARD"
                              checked={paymentMethod === "CREDIT_CARD"}
                              onChange={(e) => setPaymentMethod(e.target.value)}
                              className="h-4 w-4 text-[#0B2A5B]"
                            />
                            <span className="font-bold text-slate-800">Kartu Kredit / Debit Online</span>
                          </div>
                        </label>
                      </div>

                      <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 space-y-1 text-slate-600">
                        <span className="font-bold text-[#0B2A5B] block">Informasi Garansi Pemesanan:</span>
                        <p className="text-[11px] leading-relaxed">
                          Pengajuan ini aman dan tidak memotong dana instan. Tim admin akan memverifikasi dokumen KTP & SIM Anda sebelum menerbitkan invoice resmi.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="w-1/3 bg-slate-100 text-slate-700 font-bold text-xs py-3.5 rounded-xl hover:bg-slate-200 transition"
                      >
                        Kembali
                      </button>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-2/3 flex items-center justify-center gap-2 rounded-xl bg-[#0B2A5B] hover:bg-[#1E4FA3] text-white text-xs font-bold py-3.5 shadow-md shadow-[#0B2A5B]/20 transition disabled:opacity-50"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Memproses Pengajuan...</span>
                          </>
                        ) : (
                          <>
                            <FileText className="h-4 w-4" />
                            <span>Kirim Pengajuan Sekarang</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* KOLOM KANAN: RINGKASAN SEWA & HITUNG BIAYA */}
              <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-24">
                <div className="bg-white rounded-2xl border border-[#E3E8EF] p-6 shadow-sm space-y-5">
                  <h2 className="text-xs font-extrabold text-[#0B2A5B] uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
                    <Car className="h-4 w-4 text-[#1E4FA3]" />
                    <span>Ringkasan Rincian Sewa</span>
                  </h2>

                  <div className="flex items-center gap-3.5">
                    <img
                      src={vehicle.image || vehicle.images?.[0] || "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=400&q=80"}
                      alt={vehicle.title || vehicle.name}
                      className="h-16 w-20 object-cover rounded-xl border border-slate-200 shrink-0"
                    />
                    <div>
                      <span className="text-[10px] font-bold uppercase bg-blue-50 text-[#1E4FA3] px-2 py-0.5 rounded border border-blue-100">
                        {vehicle.category || "SEWA"}
                      </span>
                      <h3 className="font-bold text-sm text-slate-900 mt-1 leading-snug">
                        {vehicle.title || vehicle.name}
                      </h3>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {vehicle.transmission || "Automatic"} • {vehicle.fuel || "Bensin/Hybrid"}
                      </p>
                    </div>
                  </div>

                  {/* RINCIAN KALKULASI HARGA BIAYA */}
                  <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span>Tarif Unit / Hari</span>
                      <span className="font-bold text-slate-800">
                        Rp {unitPrice.toLocaleString("id-ID")}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Total Durasi Sewa</span>
                      <span className="font-bold text-slate-800">{totalDays} Hari</span>
                    </div>

                    {pickupMethod === "DELIVERY" && (
                      <div className="flex justify-between text-[#1E4FA3]">
                        <span>Biaya Antar Unit</span>
                        <span className="font-bold">Rp {deliveryFee.toLocaleString("id-ID")}</span>
                      </div>
                    )}

                    {withDriver && (
                      <div className="flex justify-between text-[#1E4FA3]">
                        <span>Layanan Driver ({totalDays} Hari)</span>
                        <span className="font-bold">
                          Rp {driverFee.toLocaleString("id-ID")}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between text-slate-400">
                      <span>Biaya Asuransi All-Risk</span>
                      <span className="font-bold text-emerald-600">INCLUDED</span>
                    </div>

                    <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
                      <span className="font-bold text-[#0B2A5B] text-xs">Total Estimasi Pembayaran</span>
                      <span className="text-lg font-black text-[#0B2A5B]">
                        Rp {totalAmount.toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50/60 border border-blue-100 p-4 rounded-xl flex items-start gap-3 text-xs text-slate-600">
                  <ShieldCheck className="h-5 w-5 text-[#1E4FA3] shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    Dokumen identitas Anda dienkripsi penuh dan hanya digunakan untuk verifikasi reservasi internal AutoCorp.
                  </p>
                </div>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}

export default function FormPengajuanPage() {
  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 z-[999] bg-[#F8FAFC] flex items-center justify-center text-xs text-slate-400 gap-2">
          <Loader2 className="h-5 w-5 animate-spin text-[#0B2A5B]" />
          Loading form...
        </div>
      }
    >
      <FormPengajuanContent />
    </Suspense>
  );
}