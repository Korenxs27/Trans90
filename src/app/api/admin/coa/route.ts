import { NextResponse } from "next/server";
import { PrismaClient, AccountType } from "@prisma/client";

const prisma = new PrismaClient();

// GET: Ambil Akun COA + Saldo Real-Time
export async function GET() {
  try {
    const accounts = await prisma.chartOfAccount.findMany({
      orderBy: { code: "asc" },
      include: {
        journalLines: {
          select: {
            debit: true,
            credit: true,
          },
        },
        _count: {
          select: { journalLines: true },
        },
      },
    });

    const processedAccounts = accounts.map((acc) => {
      const debitTotal = acc.journalLines.reduce((sum, item) => sum + Number(item.debit || 0), 0);
      const creditTotal = acc.journalLines.reduce((sum, item) => sum + Number(item.credit || 0), 0);

      const isDebitNormal = acc.type === "ASSET" || acc.type === "EXPENSE";
      const netBalance = isDebitNormal ? debitTotal - creditTotal : creditTotal - debitTotal;

      return {
        id: acc.id,
        code: acc.code,
        name: acc.name,
        type: acc.type,
        isHeader: acc.isHeader,
        parentCode: acc.parentCode,
        description: acc.description,
        debitTotal,
        creditTotal,
        netBalance,
        journalCount: acc._count.journalLines,
      };
    });

    return NextResponse.json({ accounts: processedAccounts }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Gagal mengambil data COA", error: error.message },
      { status: 500 }
    );
  }
}

// POST: Tambah Akun COA Baru
export async function POST(req: Request) {
  try {
    const { code, name, type, isHeader, parentCode, description } = await req.json();

    if (!code || !name || !type) {
      return NextResponse.json(
        { message: "Kode akun, nama akun, dan tipe akun wajib diisi!" },
        { status: 400 }
      );
    }

    // Cek Duplikasi Kode Akun
    const existingAccount = await prisma.chartOfAccount.findUnique({
      where: { code: String(code).trim() },
    });

    if (existingAccount) {
      return NextResponse.json(
        { message: `Kode akun "${code}" sudah digunakan oleh akun ${existingAccount.name}!` },
        { status: 400 }
      );
    }

    const newAccount = await prisma.chartOfAccount.create({
      data: {
        code: String(code).trim(),
        name: String(name).trim(),
        type: type as AccountType,
        isHeader: Boolean(isHeader),
        parentCode: parentCode || null,
        description: description || null,
      },
    });

    return NextResponse.json(
      { message: "Akun COA berhasil ditambahkan!", account: newAccount },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server saat menambahkan akun", error: error.message },
      { status: 500 }
    );
  }
}