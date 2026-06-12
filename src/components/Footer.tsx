export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p style={{ margin: "0 0 6px" }}>
          <strong style={{ color: "var(--accent)" }}>MotorVault</strong> — Premium Pre-Owned Vehicles
        </p>
        <p style={{ margin: 0 }}>
          © {new Date().getFullYear()} MotorVault Inc. · All rights reserved ·{" "}
          <a href="#" style={{ color: "var(--muted)", textDecoration: "underline" }}>Privacy</a>
          {" · "}
          <a href="#" style={{ color: "var(--muted)", textDecoration: "underline" }}>Terms</a>
        </p>
      </div>
    </footer>
  );
}
