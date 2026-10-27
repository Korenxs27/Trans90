import Header from "@/components/public/header";
import Footer from "@/components/public/footer";
import FloatingWhatsApp from "@/components/public/FloatingWhatsApp";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col relative w-full overflow-x-hidden">
      <Header />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
      
      {/* Floating WhatsApp ditaruh di sini agar muncul di semua halaman publik */}
      <FloatingWhatsApp />
    </div>
  );
}