"use client"; // <--- Tambahkan baris ini di paling atas!

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-xl font-bold text-red-600">Ada masalah yang terjadi!</h2>
      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-blue-900 text-white rounded-md"
      >
        Coba Lagi
      </button>
    </div>
  );
}