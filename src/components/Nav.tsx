"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/catalog", label: "Catalog" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="nav">
      <div className="nav-inner">
        <div className="navigation">
          <Link
            href="/"
            style={{
              fontWeight: 700,
              fontSize: 15,
              color: "var(--accent)",
              textDecoration: "none",
              marginRight: 4,
              letterSpacing: "-0.02em",
            }}
          >
            MotorVault
          </Link>

          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`nav-link${pathname === href ? " active" : ""}`}
            >
              {label}
            </Link>
          ))}

          <Link href="/catalog" className="btn btn-primary" style={{ marginLeft: 4, padding: "8px 16px", fontSize: 14 }}>
            Browse Cars
          </Link>
        </div>
      </div>
    </nav>
  );
}
