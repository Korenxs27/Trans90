import { db } from "@/lib/db";
import { validateJournalBalance } from "./double-entry";

export async function createRentalJournal(orderId: string) {
  const order = await db.rentalOrder.findUnique({
    where: { id: orderId },
    include: { vehicle: true },
  });

  if (!order) throw new Error("Order tidak ditemukan");

  // Cari Akun Kas (101.01) dan Pendapatan Sewa (401.00)
  const kasAccount = await db.chartOfAccount.findFirst({ where: { code: "101.01" } });
  const revenueAccount = await db.chartOfAccount.findFirst({ where: { code: "401.00" } });

  if (!kasAccount || !revenueAccount) {
    throw new Error("Kode Akun Kas atau Pendapatan Sewa belum di-seed di COA");
  }

  const amount = Number(order.totalAmount);
  const lines = [
    { accountId: kasAccount.id, debit: amount, credit: 0 },
    { accountId: revenueAccount.id, debit: 0, credit: amount },
  ];

  const { isValid } = validateJournalBalance(lines);
  if (!isValid) throw new Error("Jurnal tidak seimbang (Debit != Kredit)");

  // Eksekusi buat Jurnal Entry
  return await db.journalEntry.create({
    data: {
      entryNumber: `JRN-REV-${Date.now().toString().slice(-6)}`,
      refNumber: order.orderNumber,
      description: `Pendapatan sewa armada: ${order.vehicle.title} (${order.fullName})`,
      lines: {
        create: lines,
      },
    },
  });
}