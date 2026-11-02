import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const {
      customerName,
      saleDate,
      paymentMethod, // "CASH" | "CREDIT"
      dueDate,
      receivableAccountId, // ID Akun Kas/Bank atau Piutang Usaha (Debit)
      revenueAccountId,    // ID Akun Pendapatan Penjualan (Kredit)
      taxAccountId,        // ID Akun PPN Keluaran (Kredit) - Opsional
      subtotal,
      taxPercent,          // % PPN (Opsional)
      notes,
    } = await req.json();

    const amountSubtotal = Number(subtotal);
    const amountTax = (amountSubtotal * (Number(taxPercent) || 0)) / 100;
    const totalAmount = amountSubtotal + amountTax;

    if (!receivableAccountId || !revenueAccountId || amountSubtotal <= 0) {
      return NextResponse.json(
        { message: "Akun Debit, Akun Kredit, dan Subtotal wajib diisi dengan benar!" },
        { status: 400 }
      );
    }

    // Menggunakan Prisma Transaction agar data transaksi & jurnal tersimpan secara atomik (single source of truth)
    const result = await prisma.$transaction(async (tx) => {
      // 1. Buat Header Jurnal Umum (JournalEntry)
      const entryNumber = `JRN-SLS-${Date.now()}`;
      const journalEntry = await tx.journalEntry.create({
        data: {
          entryNumber,
          date: new Date(saleDate),
          refNumber: paymentMethod === "CREDIT" ? `INV-${Date.now()}` : `CASH-${Date.now()}`,
          description: notes || `Penjualan ${paymentMethod === "CREDIT" ? "Kredit" : "Tunai"} kepada ${customerName}`,
        },
      });

      // 2. Buat Baris Jurnal (JournalLine): DEBIT (Kas/Bank atau Piutang Usaha)
      await tx.journalLine.create({
        data: {
          journalEntryId: journalEntry.id,
          accountId: receivableAccountId,
          debit: totalAmount,
          credit: 0,
        },
      });

      // 3. Buat Baris Jurnal (JournalLine): KREDIT (Pendapatan Penjualan)
      await tx.journalLine.create({
        data: {
          journalEntryId: journalEntry.id,
          accountId: revenueAccountId,
          debit: 0,
          credit: amountSubtotal,
        },
      });

      // 4. Buat Baris Jurnal (JournalLine): KREDIT (PPN Keluaran jika ada pajak)
      if (amountTax > 0 && taxAccountId) {
        await tx.journalLine.create({
          data: {
            journalEntryId: journalEntry.id,
            accountId: taxAccountId,
            debit: 0,
            credit: amountTax,
          },
        });
      }

      return journalEntry;
    });

    return NextResponse.json(
      {
        message: "Penjualan berhasil dicatat & Jurnal Umum otomatis terposting!",
        journalEntry: result,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST Sales Error:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server saat memproses penjualan", error: error.message },
      { status: 500 }
    );
  }
}