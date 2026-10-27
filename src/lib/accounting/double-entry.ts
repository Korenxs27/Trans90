export interface JournalLineInput {
  accountId: string;
  debit: number;
  credit: number;
}

export function validateJournalBalance(lines: JournalLineInput[]): {
  isValid: boolean;
  totalDebit: number;
  totalCredit: number;
} {
  const totalDebit = lines.reduce((acc, line) => acc + (line.debit || 0), 0);
  const totalCredit = lines.reduce((acc, line) => acc + (line.credit || 0), 0);

  return {
    isValid: Math.abs(totalDebit - totalCredit) < 0.01, // Menghindari floating precision error
    totalDebit,
    totalCredit,
  };
}