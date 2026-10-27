"use client";

import { useState } from "react";

export interface Vehicle {
  id: string;
  title: string;
  slug: string;
  type: string;
  category: string;
  subCategory?: string | null;
  image: string;
  price: number;
  priceUnit?: string | null;
}

interface StepperFormProps {
  vehicle: Vehicle;
}

export default function StepperForm({ vehicle }: StepperFormProps) {
  // Step Aktif: 1 = Pilih Tanggal & Lokasi, 2 = Data Diri, 3 = Konfirmasi & WA
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    location: "Jakarta Selatan (Head Office)",
    withDriver: false,
    fullName: "",
    phone: "",
    email: "",
    notes: "",
  });

  // Hitung durasi sewa & total estimasi biaya
  const calculateDays = () => {
    if (!formData.startDate || !formData.endDate) return 1;
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const totalDays = calculateDays();
  const driverFee = formData.withDriver ? 150000 * totalDays : 0;
  const totalPrice = vehicle.price * totalDays + driverFee;

  // Format Rupiah
  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  // Kirim Booking ke DB Supabase & Redirect ke WhatsApp Sales
  const handleSendToWhatsApp = async () => {
    setLoading(true);
    try {
      // 1. Simpan pesanan ke database via API Route
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vehicleId: vehicle.id,
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          notes: formData.notes,
          location: formData.location,
          startDate: formData.startDate,
          endDate: formData.endDate,
          totalDays,
          withDriver: formData.withDriver,
          unitPrice: vehicle.price,
          driverFee,
          totalAmount: totalPrice,
        }),
      });
    } catch (err) {
      console.error("Gagal menyimpan pesanan ke DB:", err);
    } finally {
      setLoading(false);
    }

    // 2. Redirect ke WhatsApp
    const adminPhone = "6281234567890"; // Ganti Nomor WA Admin
    const message = `Halo Sales AUTOCORP, saya ingin booking sewa kendaraan berikut:

*Unit:* ${vehicle.title}
*Lokasi Penjemputan:* ${formData.location}
*Tanggal Mulai:* ${formData.startDate}
*Tanggal Selesai:* ${formData.endDate} (${totalDays} Hari)
*Layanan Supir:* ${formData.withDriver ? "Ya (+Rp 150.000/hari)" : "Lepas Kunci"}

*Data Pemesan:*
- Nama: ${formData.fullName}
- No. HP: ${formData.phone}
- Email: ${formData.email}
${formData.notes ? `- Catatan: ${formData.notes}` : ""}

*Total Estimasi:* ${formatRupiah(totalPrice)}

Mohon info ketersediaan unit dan prosedur konfirmasi kelengkapan berkas. Terima kasih!`;

    const encodedUrl = `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`;
    window.open(encodedUrl, "_blank");
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E3E8EF] shadow-lg p-5 sm:p-8 max-w-3xl mx-auto">
      
      {/* 1. INDICATOR STEPPER */}
      <div className="flex items-center justify-between mb-8 relative">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#E3E8EF] -translate-y-1/2 z-0" />
        
        {/* Step 1 Indicator */}
        <div className="relative z-10 flex flex-col items-center gap-1.5">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              currentStep >= 1 ? "bg-[#0B2A5B] text-white shadow-md" : "bg-[#F5F7FA] text-[#586678] border border-[#E3E8EF]"
            }`}
          >
            1
          </div>
          <span className="text-[11px] font-bold text-[#1A2233]">Jadwal & Fitur</span>
        </div>

        {/* Step 2 Indicator */}
        <div className="relative z-10 flex flex-col items-center gap-1.5">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              currentStep >= 2 ? "bg-[#0B2A5B] text-white shadow-md" : "bg-[#F5F7FA] text-[#586678] border border-[#E3E8EF]"
            }`}
          >
            2
          </div>
          <span className="text-[11px] font-bold text-[#1A2233]">Data Diri</span>
        </div>

        {/* Step 3 Indicator */}
        <div className="relative z-10 flex flex-col items-center gap-1.5">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              currentStep === 3 ? "bg-[#1F9D55] text-white shadow-md" : "bg-[#F5F7FA] text-[#586678] border border-[#E3E8EF]"
            }`}
          >
            3
          </div>
          <span className="text-[11px] font-bold text-[#1A2233]">Konfirmasi</span>
        </div>
      </div>

      {/* 2. RINGKASAN UNIT YANG DIPILIH */}
      <div className="bg-[#F8FAFC] border border-[#E3E8EF] rounded-xl p-4 mb-6 flex items-center gap-4">
        <img
          src={vehicle.image}
          alt={vehicle.title}
          className="w-20 h-16 object-cover rounded-lg shrink-0"
        />
        <div className="flex-1 min-w-0">
          <span className="text-[10px] font-bold uppercase text-[#0B2A5B] bg-white px-2 py-0.5 rounded border border-[#E3E8EF]">
            {vehicle.subCategory || vehicle.category || "Sewa"}
          </span>
          <h4 className="text-sm font-bold text-[#1A2233] truncate mt-1">{vehicle.title}</h4>
          <p className="text-xs font-extrabold text-[#0B2A5B] mt-0.5">
            {formatRupiah(vehicle.price)} <span className="text-[10px] font-normal text-[#586678]">{vehicle.priceUnit || "/hari"}</span>
          </p>
        </div>
      </div>

      {/* 3. KONTEN LANGKAH (STEP CONTENT) */}
      <form onSubmit={(e) => e.preventDefault()}>
        
        {/* ================= STEP 1: JADWAL & LOKASI ================= */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#1A2233] mb-1">
                Lokasi Penjemputan / Pengambilan
              </label>
              <select
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-[#F8FAFC] border border-[#E3E8EF] rounded-lg px-3.5 py-2.5 text-xs text-[#1A2233] font-medium focus:outline-none focus:border-[#0B2A5B]"
              >
                <option value="Jakarta Selatan (Head Office)">Jakarta Selatan (Head Office)</option>
                <option value="Jakarta Pusat (Branch Office)">Jakarta Pusat (Branch Office)</option>
                <option value="Bandara Soekarno Hatta">Bandara Soekarno Hatta (Drop-off)</option>
                <option value="Pengantaran Alamat Rumah">Pengantaran Langsung ke Alamat Saya</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#1A2233] mb-1">
                  Tanggal Mulai Sewa
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full bg-[#F8FAFC] border border-[#E3E8EF] rounded-lg px-3.5 py-2.5 text-xs text-[#1A2233] font-medium focus:outline-none focus:border-[#0B2A5B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A2233] mb-1">
                  Tanggal Selesai Sewa
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full bg-[#F8FAFC] border border-[#E3E8EF] rounded-lg px-3.5 py-2.5 text-xs text-[#1A2233] font-medium focus:outline-none focus:border-[#0B2A5B]"
                />
              </div>
            </div>

            {/* Opsi Tambahan Supir (Khusus Mobil) */}
            {vehicle.category?.toUpperCase() === "MOBIL" && (
              <div className="p-3 bg-[#F5F7FA] rounded-lg border border-[#E3E8EF] flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#1A2233]">Gunakan Supir Profesional</p>
                  <p className="text-[10px] text-[#586678]">+ Rp 150.000 / hari</p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.withDriver}
                  onChange={(e) => setFormData({ ...formData, withDriver: e.target.checked })}
                  className="h-4 w-4 rounded border-[#E3E8EF] text-[#0B2A5B] focus:ring-[#0B2A5B]"
                />
              </div>
            )}
          </div>
        )}

        {/* ================= STEP 2: DATA DIRI PEMESAN ================= */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#1A2233] mb-1">
                Nama Lengkap (Sesuai KTP)
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Contoh: Muhammad Faqih"
                className="w-full bg-[#F8FAFC] border border-[#E3E8EF] rounded-lg px-3.5 py-2.5 text-xs text-[#1A2233] font-medium focus:outline-none focus:border-[#0B2A5B]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#1A2233] mb-1">
                  Nomor WhatsApp / HP
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="0812xxxxxxxx"
                  className="w-full bg-[#F8FAFC] border border-[#E3E8EF] rounded-lg px-3.5 py-2.5 text-xs text-[#1A2233] font-medium focus:outline-none focus:border-[#0B2A5B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A2233] mb-1">
                  Alamat Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@domain.com"
                  className="w-full bg-[#F8FAFC] border border-[#E3E8EF] rounded-lg px-3.5 py-2.5 text-xs text-[#1A2233] font-medium focus:outline-none focus:border-[#0B2A5B]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1A2233] mb-1">
                Catatan Tambahan (Opsional)
              </label>
              <textarea
                rows={2}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Permintaan khusus jam penjemputan, dll."
                className="w-full bg-[#F8FAFC] border border-[#E3E8EF] rounded-lg px-3.5 py-2.5 text-xs text-[#1A2233] font-medium focus:outline-none focus:border-[#0B2A5B]"
              />
            </div>
          </div>
        )}

        {/* ================= STEP 3: KONFIRMASI RINGKASAN ================= */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <div className="bg-[#F8FAFC] rounded-xl border border-[#E3E8EF] p-4 space-y-2 text-xs text-[#1A2233]">
              <div className="flex justify-between border-b border-[#E3E8EF] pb-2">
                <span className="text-[#586678]">Nama Pemesan:</span>
                <span className="font-bold">{formData.fullName || "-"}</span>
              </div>
              <div className="flex justify-between border-b border-[#E3E8EF] pb-2">
                <span className="text-[#586678]">No. WhatsApp:</span>
                <span className="font-bold">{formData.phone || "-"}</span>
              </div>
              <div className="flex justify-between border-b border-[#E3E8EF] pb-2">
                <span className="text-[#586678]">Periode Sewa:</span>
                <span className="font-bold">{totalDays} Hari ({formData.startDate} s/d {formData.endDate})</span>
              </div>
              <div className="flex justify-between border-b border-[#E3E8EF] pb-2">
                <span className="text-[#586678]">Layanan Supir:</span>
                <span className="font-bold">{formData.withDriver ? "Ya (+Rp 150 rb/hari)" : "Lepas Kunci"}</span>
              </div>
              <div className="flex justify-between pt-1 text-sm">
                <span className="font-bold text-[#0B2A5B]">Total Estimasi Biaya:</span>
                <span className="font-extrabold text-[#1F9D55] text-base">{formatRupiah(totalPrice)}</span>
              </div>
            </div>

            <p className="text-[11px] text-[#586678] text-center italic">
              *Klik tombol di bawah untuk langsung terhubung dengan Sales Admin kami via WhatsApp demi konfirmasi unit & berkas persyaratannya.
            </p>
          </div>
        )}

        {/* 4. TOMBOL KONTROL STEPS */}
        <div className="flex items-center justify-between pt-6 mt-6 border-t border-[#E3E8EF]">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="px-4 py-2 border border-[#0B2A5B] text-[#0B2A5B] text-xs font-bold rounded-lg hover:bg-[#F8FAFC] transition-colors"
            >
              &larr; Kembali
            </button>
          ) : (
            <div />
          )}

          {currentStep < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={!formData.startDate || !formData.endDate}
              className="px-5 py-2 bg-[#0B2A5B] text-white text-xs font-bold rounded-lg hover:bg-[#071B3D] transition-colors disabled:opacity-50"
            >
              Lanjut ke Langkah {currentStep + 1} &rarr;
            </button>
          ) : (
            <button
              type="button"
              disabled={loading}
              onClick={handleSendToWhatsApp}
              className="px-6 py-2.5 bg-[#1F9D55] text-white text-xs font-bold rounded-lg hover:bg-[#198045] shadow-md transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <span>💬</span> {loading ? "Memproses..." : "Kirim Booking via WA"}
            </button>
          )}
        </div>

      </form>
    </div>
  );
}