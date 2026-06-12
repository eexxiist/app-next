import type { Metadata } from "next";
import { getVehicles, getBodyTypes } from "@/lib/vehicles";
import CatalogClient from "./CatalogClient";

export const metadata: Metadata = {
  title: "Catalog",
  description: "Browse all pre-owned vehicles on MotorVault.",
};

export default function CatalogPage() {
  const vehicles = getVehicles();
  const bodyTypes = getBodyTypes();

  return (
    <main className="container page">
      <div className="content" style={{ paddingTop: 20, textAlign: "left" }}>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 42px)" }}>Vehicle Catalog</h1>
        <p style={{ margin: "0 0 24px" }}>
          {vehicles.length} listings available · Updated daily
        </p>
      </div>

      <CatalogClient vehicles={vehicles} bodyTypes={bodyTypes} />
    </main>
  );
}
