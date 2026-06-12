import Link from "next/link";
import Image from "next/image";
import type { Vehicle } from "@/types/vehicle";
import { formatPrice, formatMileage } from "@/lib/vehicles";

interface VehicleCardProps {
  vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <Link href={`/catalog/${vehicle.slug}`} className="card">
      <div style={{ position: "relative", height: 180, overflow: "hidden" }}>
        <Image
          src={vehicle.images[0]}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw"
        />
      </div>

      <div className="card-body">
        <p className="card-title">
          {vehicle.year} {vehicle.make} {vehicle.model}
        </p>
        <p className="card-sub">{vehicle.engine} · {vehicle.power} hp</p>
        <p className="card-price">{formatPrice(vehicle.price)}</p>

        <div className="card-meta">
          <span className="tag">{formatMileage(vehicle.mileage)}</span>
          <span className="tag">{vehicle.transmission}</span>
          <span className="tag">{vehicle.bodyType}</span>
          <span className="tag">{vehicle.location.split(",")[1]?.trim() ?? vehicle.location}</span>
        </div>
      </div>
    </Link>
  );
}
