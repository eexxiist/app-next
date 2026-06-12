import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "MotorVault — Premium Pre-Owned Vehicles",
    template: "%s | MotorVault",
  },
  description:
    "Discover handpicked, dealer-inspected pre-owned vehicles. " +
    "Transparent pricing, full history reports, and financing options.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="bg-grid" aria-hidden="true" />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
