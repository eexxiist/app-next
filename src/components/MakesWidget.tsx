"use client";

import { useEffect, useState } from "react";

interface Make {
  Make_ID: number;
  Make_Name: string;
}

export default function MakesWidget() {
  const [makes, setMakes] = useState<Make[]>([]);
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");

  useEffect(() => {
    fetch("/api/makes")
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((data) => {
        setMakes(data.makes);
        setStatus("ok");
      })
      .catch(() => setStatus("error"));
  }, []);

  if (status === "loading") {
    return (
      <div className="loader-wrapper">
        <span className="loader" />
      </div>
    );
  }

  if (status === "error") {
    return (
      <p className="muted" style={{ fontSize: 14 }}>
        Could not load makes right now.
      </p>
    );
  }

  return (
    <div>
      <p className="muted" style={{ fontSize: 13, marginBottom: 12 }}>
        Live data via the{" "}
        <a
          href="https://vpic.nhtsa.dot.gov/api/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--accent-2)", textDecoration: "none" }}
        >
          NHTSA vPIC API
        </a>{" "}
        — {makes.length} makes loaded
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {makes.map((m) => (
          <span key={m.Make_ID} className="tag" style={{ fontSize: 13 }}>
            {m.Make_Name}
          </span>
        ))}
      </div>
    </div>
  );
}
