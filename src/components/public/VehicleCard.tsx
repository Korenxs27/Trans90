import Image from "next/image";
import Link from "next/link";

interface VehicleProps {
  vehicle: {
    id: string;
    title: string;
    slug: string;
    type: string;
    category: string;
    subCategory?: string | null;
    image: string;
    images?: string[];
    transmission?: string | null;
    fuel?: string | null;
    seats?: number | null;
    year?: string | null;
    price: number;
    priceUnit?: string | null;
    description?: string | null;
  };
}

export default function VehicleCard({ vehicle }: VehicleProps) {
  return (
    <div className="bg-white rounded-xl border border-[#E3E8EF] overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between">
      <div>
        {/* Gambar Utama Unit */}
        <div className="relative h-48 w-full bg-[#F1F5F9]">
          <Image
            src={vehicle.image}
            alt={vehicle.title}
            fill
            className="object-cover"
          />
          <div className="absolute top-3 left-3 bg-[#0B2A5B] text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
            {vehicle.category}
          </div>
        </div>

        {/* Info Unit */}
        <div className="p-4 space-y-2">
          <h3 className="font-extrabold text-[#0B2A5B] text-base line-clamp-1">
            {vehicle.title}
          </h3>

          <div className="flex items-center gap-2 text-xs text-[#586678]">
            <span>{vehicle.transmission || "Automatic"}</span>
            {vehicle.seats && <span>• {vehicle.seats} Seats</span>}
            {vehicle.year && <span>• {vehicle.year}</span>}
          </div>
        </div>
      </div>

      {/* Pricing & CTA Button */}
      <div className="p-4 pt-0">
        <div className="flex items-center justify-between pt-3 border-t border-[#E3E8EF]">
          <div>
            <span className="text-[10px] text-[#586678] font-semibold uppercase block">
              Harga Sewa
            </span>
            <div className="font-extrabold text-[#1E4FA3] text-base">
              Rp {vehicle.price.toLocaleString("id-ID")}
              <span className="text-xs font-normal text-[#586678]">
                {vehicle.priceUnit || "/hari"}
              </span>
            </div>
          </div>

          <Link
            href={`/bisnis/sewa/${vehicle.slug}`}
            className="rounded-lg bg-[#0B2A5B] px-3.5 py-2 text-xs font-bold text-white hover:bg-[#1E4FA3] transition"
          >
            Sewa Unit
          </Link>
        </div>
      </div>
    </div>
  );
}