export function calculateStraightLineDepreciation(
  acquisitionCost: number, // Harga perolehan aset
  salvageValue: number,   // Nilai sisa / residu
  usefulLifeYears: number // Masa manfaat (tahun)
) {
  if (usefulLifeYears <= 0) return { annualDepreciation: 0, monthlyDepreciation: 0 };

  const depreciableAmount = acquisitionCost - salvageValue;
  const annualDepreciation = depreciableAmount / usefulLifeYears;
  const monthlyDepreciation = annualDepreciation / 12;

  return {
    annualDepreciation,
    monthlyDepreciation,
  };
}