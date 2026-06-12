import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container page">
      <div className="content">
        <div className="badge">404</div>
        <h1 style={{ fontSize: "clamp(32px, 6vw, 56px)", marginTop: "0.5em" }}>
          Page Not Found
        </h1>
        <p>
          The listing or page you're looking for has been removed or doesn't exist.
        </p>
        <div className="buttons-wrapper">
          <Link href="/catalog" className="btn btn-primary">
            Browse Catalog
          </Link>
          <Link href="/" className="btn btn-ghost">
            Go Home
          </Link>
        </div>
      </div>
    </main>
  );
}
