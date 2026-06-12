"use client";

import { useState } from "react";
import type { Vehicle } from "@/types/vehicle";
import VehicleCard from "@/components/VehicleCard";

interface CatalogClientProps {
  vehicles: Vehicle[];
  bodyTypes: string[];
}

export default function CatalogClient({ vehicles, bodyTypes }: CatalogClientProps) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? vehicles
      : vehicles.filter((v) => v.bodyType === activeFilter);

  return (
    <>
      <div className="filter-bar">
        {bodyTypes.map((type) => (
          <button
            key={type}
            className={`filter-btn${activeFilter === type ? " active" : ""}`}
            onClick={() => setActiveFilter(type)}
          >
            {type}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="muted">No listings match this filter.</p>
      ) : (
        <div className="grid">
          {filtered.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      )}
    </>
  );
}
