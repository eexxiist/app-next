import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getVehicles, getVehicleBySlug, formatPrice, formatMileage } from "@/lib/vehicles";

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getVehicles().map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const vehicle = getVehicleBySlug(params.slug);
  if (!vehicle) return {};

  return {
    title: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
    description: vehicle.description,
  };
}

export default function VehiclePage({ params }: PageProps) {
  const vehicle = getVehicleBySlug(params.slug);

  if (!vehicle) {
    notFound();
  }

  return (
    <main className="container page">
      <Link href="/catalog" className="muted" style={{ fontSize: 14, textDecoration: "none" }}>
        ← Back to Catalog
      </Link>

      <div className="vehicle-detail">

        <div>
          <div
            style={{
              position: "relative",
              height: 320,
              borderRadius: 14,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.08)",
              marginTop: 20,
            }}
          >
            <Image
              src={vehicle.images[0]}
              alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>

          <h1 style={{ margin: "20px 0 4px", fontSize: "clamp(24px, 4vw, 34px)" }}>
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h1>
          <p className="muted" style={{ margin: "0 0 8px" }}>
            {vehicle.engine} · {vehicle.power} hp · {vehicle.color}
          </p>

          <p style={{ fontSize: 28, fontWeight: 700, color: "var(--accent)", margin: "0 0 20px" }}>
            {formatPrice(vehicle.price)}
          </p>

          <div className="vehicle-specs">
            {[
              { label: "Mileage", value: formatMileage(vehicle.mileage) },
              { label: "Transmission", value: vehicle.transmission },
              { label: "Fuel", value: vehicle.fuel },
              { label: "Body", value: vehicle.bodyType },
              { label: "Condition", value: vehicle.condition },
              { label: "Location", value: vehicle.location },
            ].map(({ label, value }) => (
              <div key={label} className="spec-item">
                <div className="spec-label">{label}</div>
                <div className="spec-value">{value}</div>
              </div>
            ))}
          </div>

          <h2 className="section-title" style={{ fontSize: 20 }}>Description</h2>
          <p className="muted" style={{ lineHeight: 1.7 }}>{vehicle.description}</p>

          <h2 className="section-title" style={{ fontSize: 20 }}>Features</h2>
          <div className="card-meta">
            {vehicle.features.map((f) => (
              <span key={f} className="tag" style={{ fontSize: 13 }}>{f}</span>
            ))}
          </div>
        </div>


        <div>
          <div
            className="card"
            style={{ padding: 24, marginTop: 20, position: "sticky", top: 90 }}
          >
            <p style={{ margin: "0 0 4px", fontWeight: 700, fontSize: 18 }}>
              {vehicle.sellerName}
            </p>
            <p className="muted" style={{ fontSize: 14, margin: "0 0 20px" }}>
              Verified Dealer · Posted {new Date(vehicle.postedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </p>

            <div className="form-group">
              <label className="form-label" htmlFor="name">Your Name</label>
              <input id="name" type="text" className="form-input" placeholder="Jane Smith" />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">Email</label>
              <input id="email" type="email" className="form-input" placeholder="jane@example.com" />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="message">Message</label>
              <textarea
                id="message"
                className="form-textarea"
                defaultValue={`Hi, I'm interested in the ${vehicle.year} ${vehicle.make} ${vehicle.model}. Is it still available?`}
              />
            </div>

            <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
              Send Enquiry
            </button>

            <p className="muted" style={{ fontSize: 12, textAlign: "center", marginTop: 12 }}>
              The seller typically replies within 2 hours.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
