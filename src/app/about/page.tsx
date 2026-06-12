import type { Metadata } from "next";
import Link from "next/link";
import MakesWidget from "@/components/MakesWidget";

export const metadata: Metadata = {
  title: "About",
  description: "Learn how MotorVault works and why thousands of buyers trust us.",
};

const STEPS = [
  {
    n: "01",
    title: "We Source the Listings",
    body: "Our team partners with verified dealerships across the US. Every listing is manually reviewed before it goes live.",
  },
  {
    n: "02",
    title: "Inspection & History",
    body: "Each vehicle passes a 150-point mechanical check. A full Carfax report is attached to every listing.",
  },
  {
    n: "03",
    title: "You Browse & Enquire",
    body: "Filter by body type, price, or location. Send a direct message to the seller — no middlemen.",
  },
  {
    n: "04",
    title: "Drive Away",
    body: "Arrange a test drive, finalise financing, and pick up your new car. It really is that simple.",
  },
];

const STATS = [
  { value: "4,200+", label: "Cars sold" },
  { value: "300+", label: "Active listings" },
  { value: "98%", label: "Buyer satisfaction" },
  { value: "$2,400", label: "Avg. saving vs. retail" },
];

export default function AboutPage() {
  return (
    <main className="container page">
      {/* Hero */}
      <div className="content" style={{ textAlign: "left", paddingTop: 20 }}>
        <div className="badge" style={{ marginBottom: 0 }}>About MotorVault</div>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", marginTop: "0.6em" }}>
          The smarter way to buy<br />a pre-owned car
        </h1>
        <p style={{ margin: "0 0 28px", fontSize: 17 }}>
          MotorVault was founded in 2020 with one goal: make buying a used car as
          transparent and stress-free as buying a new one. We connect serious
          buyers with vetted dealers — no hidden fees, no pressure tactics.
        </p>
        <Link href="/catalog" className="btn btn-primary">
          Browse Listings
        </Link>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 16,
          margin: "48px 0",
        }}
      >
        {STATS.map(({ value, label }) => (
          <div
            key={label}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 14,
              padding: "20px 24px",
            }}
          >
            <p style={{ margin: "0 0 4px", fontSize: 30, fontWeight: 800, color: "var(--accent)", letterSpacing: "-0.02em" }}>
              {value}
            </p>
            <p style={{ margin: 0, color: "var(--muted)", fontSize: 14 }}>{label}</p>
          </div>
        ))}
      </div>

      {/* How it works */}
      <h2 className="section-title">How It Works</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 16,
          marginBottom: 56,
        }}
      >
        {STEPS.map(({ n, title, body }) => (
          <div
            key={n}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 14,
              padding: "22px 24px",
            }}
          >
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "var(--accent)",
                letterSpacing: "0.08em",
              }}
            >
              STEP {n}
            </span>
            <h3 style={{ margin: "8px 0 8px", fontSize: 17 }}>{title}</h3>
            <p style={{ margin: 0, color: "var(--muted)", fontSize: 14, lineHeight: 1.6 }}>{body}</p>
          </div>
        ))}
      </div>

      {/* Team */}
      <h2 className="section-title">Our Team</h2>
      <p className="muted" style={{ maxWidth: 560, marginBottom: 32 }}>
        We're a small team of car enthusiasts, engineers, and ex-dealership
        insiders. We built the platform we wished existed when we were buying our own cars.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 14,
          marginBottom: 56,
        }}
      >
        {[
          { name: "Alex Rivera", role: "Co-founder & CEO", emoji: "👨‍💼" },
          { name: "Sam Okafor", role: "Head of Listings", emoji: "🔍" },
          { name: "Priya Mehta", role: "Lead Engineer", emoji: "👩‍💻" },
          { name: "Jordan Lee", role: "Customer Success", emoji: "🤝" },
        ].map(({ name, role, emoji }) => (
          <div
            key={name}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 14,
              padding: "20px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 36, marginBottom: 10 }}>{emoji}</div>
            <p style={{ margin: "0 0 2px", fontWeight: 700 }}>{name}</p>
            <p style={{ margin: 0, color: "var(--muted)", fontSize: 13 }}>{role}</p>
          </div>
        ))}
      </div>

      {/* Supported makes — live from NHTSA API */}
      <h2 className="section-title">Makes We Cover</h2>
      <MakesWidget />

      <div style={{ marginBottom: 48 }} />

      {/* CTA */}
      <div
        style={{
          borderRadius: 18,
          border: "1px solid rgba(47,227,154,0.2)",
          background: "rgba(47,227,154,0.04)",
          padding: "40px 32px",
          textAlign: "center",
          marginBottom: 16,
        }}
      >
        <h2 style={{ margin: "0 0 12px", fontSize: "clamp(22px, 4vw, 32px)" }}>
          Ready to find your next car?
        </h2>
        <p className="muted" style={{ margin: "0 auto 24px", maxWidth: 480 }}>
          Browse 300+ verified listings and get in touch with a dealer today.
        </p>
        <Link href="/catalog" className="btn btn-primary">
          Explore the Catalog →
        </Link>
      </div>
    </main>
  );
}
