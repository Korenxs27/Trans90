import "@/app/globals.css"; // Import CSS global kamu

export const metadata = {
  title: "AutoCorp - Rental & Jual Beli Kendaraan",
  description: "Layanan sewa & jual beli mobil dan motor terpercaya",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      {/* overflow-x-hidden ditaruh di body untuk mencegah scrollbar samping */}
      <body className="antialiased overflow-x-hidden bg-[#F8FAFC]">
        {children}
      </body>
    </html>
  );
}