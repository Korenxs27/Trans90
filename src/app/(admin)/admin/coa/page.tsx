import { PrismaClient, AccountType } from "@prisma/client";
import COAReportClient from "./CoaReportsClient";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export interface COAAccountWithBalance {
  id: string;
  code: string;
  name: string;
  type: AccountType;
  isHeader: boolean;
  parentCode: string | null;
  description: string | null;
  debitTotal: number;
  creditTotal: number;
  netBalance: number;
  journalCount: number;
}

export default async function COAPage() {
  // 1. Ambil seluruh data ChartOfAccount beserta baris Jurnal terkait
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

  // 2. Hitung Saldo Real-Time per Akun dari JournalLines
  const processedAccounts: COAAccountWithBalance[] = accounts.map((acc) => {
    const debitTotal = acc.journalLines.reduce((sum, item) => sum + Number(item.debit || 0), 0);
    const creditTotal = acc.journalLines.reduce((sum, item) => sum + Number(item.credit || 0), 0);

    // Aturan Saldo Normal:
    // ASSET & EXPENSE => Debit - Kredit
    // LIABILITY, EQUITY, REVENUE => Kredit - Debit
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

  // 3. Agregasi Kontrol Silang (Persamaan Akuntansi Aset = Liabilitas + Ekuitas + Laba Berjalan)
  const totalAssets = processedAccounts
    .filter((a) => a.type === "ASSET" && !a.isHeader)
    .reduce((sum, a) => sum + a.netBalance, 0);

  const totalLiabilities = processedAccounts
    .filter((a) => a.type === "LIABILITY" && !a.isHeader)
    .reduce((sum, a) => sum + a.netBalance, 0);

  const totalEquity = processedAccounts
    .filter((a) => a.type === "EQUITY" && !a.isHeader)
    .reduce((sum, a) => sum + a.netBalance, 0);

  const totalRevenue = processedAccounts
    .filter((a) => a.type === "REVENUE" && !a.isHeader)
    .reduce((sum, a) => sum + a.netBalance, 0);

  const totalExpense = processedAccounts
    .filter((a) => a.type === "EXPENSE" && !a.isHeader)
    .reduce((sum, a) => sum + a.netBalance, 0);

  const netIncome = totalRevenue - totalExpense;
  const isBalanced = Math.abs(totalAssets - (totalLiabilities + totalEquity + netIncome)) < 0.01;

  return (
    <COAReportClient
      initialAccounts={processedAccounts}
      summaryStats={{
        totalAssets,
        totalLiabilities,
        totalEquity,
        totalRevenue,
        totalExpense,
        netIncome,
        isBalanced,
      }}
    />
  );
}