import Link from "next/link";
import Image from "next/image";
import { getVehicles, formatPrice } from "@/lib/vehicles";
import VehicleCard from "@/components/VehicleCard";

export default function HomePage() {
  const featured = getVehicles().slice(0, 3);

  return (
    <main>

      <section className="container">
        <div className="content">
          <div className="badge">✦ 300+ verified listings nationwide</div>
          <h1>
            Find Your Next{" "}
            <span style={{ color: "var(--accent)" }}>Dream Car</span>
          </h1>
          <p>
            MotorVault curates premium pre-owned vehicles from trusted dealers.
            Every listing is inspected, priced fairly, and comes with a full history report.
          </p>
          <div className="buttons-wrapper">
            <Link href="/catalog" className="btn btn-primary">
              Browse Catalog
            </Link>
            <Link href="/about" className="btn btn-ghost">
              How It Works
            </Link>
          </div>
        </div>
      </section>


      <section className="container" style={{ marginBottom: 48 }}>
        <div
          style={{
            borderRadius: 18,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.08)",
            position: "relative",
            height: 280,
          }}
        >
          <Image
            src="/dodge-400-200.jpg"
            alt="Featured vehicle — Dodge Charger"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, rgba(7,15,20,0.7) 0%, transparent 60%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 24,
              left: 28,
            }}
          >
            <p style={{ margin: "0 0 2px", color: "var(--muted)", fontSize: 13 }}>
              Featured Listing
            </p>
            <p style={{ margin: 0, fontWeight: 700, fontSize: 22 }}>
              2019 Dodge Charger
            </p>
            <p style={{ margin: "4px 0 0", color: "var(--accent)", fontWeight: 700, fontSize: 18 }}>
              {formatPrice(28900)}
            </p>
          </div>
        </div>
      </section>

      {/* Featured listings */}
      <section className="container page">
        <h2 className="section-title">Latest Listings</h2>
        <div className="grid">
          {featured.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 32 }}>
          <Link href="/catalog" className="btn btn-ghost">
            View All Listings →
          </Link>
        </div>
      </section>

      {/* Trust strip */}
      <section
        className="container"
        style={{
          padding: "40px 0 64px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16,
        }}
      >
        {[
          { icon: "🔍", title: "Full Inspection", body: "Every car passes a 150-point mechanical and cosmetic check." },
          { icon: "📋", title: "History Report", body: "Carfax included on all listings — accidents, ownership, service." },
          { icon: "💳", title: "Easy Finance", body: "Get pre-approved in minutes. Rates from 3.9% APR." },
        ].map(({ icon, title, body }) => (
          <div
            key={title}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 14,
              padding: "20px 22px",
            }}
          >
            <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
            <h3 style={{ margin: "0 0 6px", fontSize: 17 }}>{title}</h3>
            <p style={{ margin: 0, color: "var(--muted)", fontSize: 14 }}>{body}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
