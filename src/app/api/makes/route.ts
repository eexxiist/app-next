import { NextResponse } from "next/server";
import { fetchMakes } from "@/lib/vehicles";

export const revalidate = 86400;

export async function GET() {
  try {
    const all = await fetchMakes();


    const popular = [
      "FORD", "CHEVROLET", "DODGE", "BMW", "MERCEDES-BENZ",
      "TOYOTA", "HONDA", "PORSCHE", "AUDI", "VOLKSWAGEN",
      "NISSAN", "HYUNDAI", "KIA", "SUBARU", "MAZDA",
    ];

    const filtered = all
      .filter((m) => popular.includes(m.Make_Name.toUpperCase()))
      .slice(0, 20);

    return NextResponse.json({ makes: filtered });
  } catch (err) {
    console.error("Failed to fetch makes from NHTSA:", err);
    return NextResponse.json(
      { error: "Could not load makes. Please try again later." },
      { status: 502 }
    );
  }
}
