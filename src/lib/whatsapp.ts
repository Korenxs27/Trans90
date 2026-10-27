interface WhatsAppOrderPayload {
  vehicleTitle: string;
  fullName: string;
  phone: string;
  email: string;
  location: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  withDriver: boolean;
  totalAmount: number;
  notes?: string;
}

export function generateWhatsAppLink(payload: WhatsAppOrderPayload): string {
  const adminPhone = process.env.NEXT_PUBLIC_WA_PHONE || "6281234567890";

  const message = `Halo Sales AUTOCORP, saya ingin konfirmasi sewa unit berikut:

📌 *UNIT VEHICLE*
• Unit: ${payload.vehicleTitle}
• Lokasi: ${payload.location}
• Periode: ${payload.startDate} s/d ${payload.endDate} (${payload.totalDays} Hari)
• Driver: ${payload.withDriver ? "Dengan Supir (+Rp 150rb/hari)" : "Lepas Kunci"}

👤 *DATA PEMESAN*
• Nama: ${payload.fullName}
• Phone: ${payload.phone}
• Email: ${payload.email}
${payload.notes ? `• Catatan: ${payload.notes}` : ""}

💰 *ESTIMASI BIAYA*: Rp ${payload.totalAmount.toLocaleString("id-ID")}

Mohon info ketersediaan armada dan verifikasi dokumen. Terima kasih!`;

  return `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`;
}