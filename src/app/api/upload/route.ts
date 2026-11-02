import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Memastikan API Route bersifat dinamis agar tidak terkena cache static
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // 1. Validasi Variabel Environment Supabase
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Konfigurasi Supabase URL atau Key belum terpasang di file .env.local",
        },
        { status: 500 }
      );
    }

    // Inisialisasi Supabase Client
    const supabase = createClient(supabaseUrl, supabaseKey);

    // 2. Ambil Berkas Gambar dari Request FormData
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json(
        { success: false, message: "Tidak ada berkas gambar yang diunggah" },
        { status: 400 }
      );
    }

    const uploadedUrls: string[] = [];

    // 3. Process Loop Unggah Setiap File ke Bucket Storage Supabase ("vehicles")
    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Buat nama file unik menggunakan Timestamp & Random Hash
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(7)}.${fileExt}`;

      // Unggah berkas ke bucket "vehicles" di Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("vehicles")
        .upload(fileName, buffer, {
          contentType: file.type,
          upsert: true,
        });

      if (uploadError) {
        console.error("Supabase Storage Error:", uploadError);
        return NextResponse.json(
          {
            success: false,
            message: `Gagal mengunggah file ${file.name}: ${uploadError.message}`,
          },
          { status: 500 }
        );
      }

      // Ambil Public URL gambar yang telah berhasil diunggah
      const { data: publicUrlData } = supabase.storage
        .from("vehicles")
        .getPublicUrl(fileName);

      if (publicUrlData?.publicUrl) {
        uploadedUrls.push(publicUrlData.publicUrl);
      }
    }

    // 4. Kembalikan Response Berhasil Berisi Array Public URL
    return NextResponse.json(
      {
        success: true,
        message: "Berkas gambar berhasil diunggah ke Supabase Storage!",
        urls: uploadedUrls,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Upload API Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Terjadi kesalahan server saat mengunggah gambar",
      },
      { status: 500 }
    );
  }
}