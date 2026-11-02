
import { Plus_Jakarta_Sans } from "next/font/google";
import Header from "@/components/public/header";
import Footer from "@/components/public/footer";
import FloatingWhatsApp from "@/components/public/FloatingWhatsApp";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${plusJakartaSans.className} flex min-h-screen flex-col relative w-full overflow-x-hidden`}
    >
      <Header />
      <main className="flex-1 w-full">{children}</main>
      <Footer />

      {/* Floating WhatsApp ditaruh di sini agar muncul di semua halaman publik */}
      <FloatingWhatsApp />
    </div>
  );
}
