import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center bg-[#FFFFFF] px-4 text-center">
      {/* Badge/Kategori */}
      <span className="rounded-full bg-[#F5F7FA] px-3 py-1 text-xs font-semibold tracking-wide text-[#1E4FA3] uppercase border border-[#E3E8EF]">
        404 Not Found
      </span>

      {/* Kode Angka Besar */}
      <h1 className="mt-4 text-7xl font-extrabold tracking-tight text-[#0B2A5B] sm:text-9xl">
        404
      </h1>

      {/* Judul Pesan */}
      <h2 className="mt-4 text-2xl font-bold tracking-tight text-[#1A2233] sm:text-3xl">
        Halaman Tidak Ditemukan
      </h2>

      {/* Deskripsi */}
      <p className="mt-3 max-w-md text-sm text-[#586678] sm:text-base">
        Maaf, halaman yang kamu cari tidak ada, telah dipindahkan, atau alamat URL yang dimasukkan salah.
      </p>

      {/* Tombol Navigasi */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md bg-[#0B2A5B] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#071B3D] focus:outline-none focus:ring-2 focus:ring-[#1E4FA3] focus:ring-offset-2"
        >
          Kembali ke Beranda
        </Link>
        <Link
          href="/kontak"
          className="inline-flex items-center justify-center rounded-md border border-[#E3E8EF] bg-white px-5 py-2.5 text-sm font-medium text-[#1A2233] transition-colors hover:bg-[#F5F7FA] focus:outline-none focus:ring-2 focus:ring-[#1E4FA3] focus:ring-offset-2"
        >
          Hubungi Bantuan
        </Link>
      </div>
    </div>
  );
}