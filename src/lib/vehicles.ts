import type { Vehicle } from "@/types/vehicle";

// We use the NHTSA vPIC public API for real make/model data,
// then enrich with deterministic listing details.
// Base URL: https://vpic.nhtsa.dot.gov/api

const NHTSA_BASE = "https://vpic.nhtsa.dot.gov/api";

export interface NhtsaMake {
  Make_ID: number;
  Make_Name: string;
}

/** Fetch all car makes from the NHTSA API */
export async function fetchMakes(): Promise<NhtsaMake[]> {
  const res = await fetch(
    `${NHTSA_BASE}/vehicles/GetAllMakes?format=json`,
    { next: { revalidate: 86400 } } // cache 24 h
  );

  if (!res.ok) {
    throw new Error(`NHTSA API error: ${res.status}`);
  }

  const data = await res.json();
  return data.Results as NhtsaMake[];
}

export interface NhtsaModel {
  Model_ID: number;
  Model_Name: string;
  Make_ID: number;
  Make_Name: string;
}

/** Fetch models for a given make ID */
export async function fetchModelsForMake(makeId: number): Promise<NhtsaModel[]> {
  const res = await fetch(
    `${NHTSA_BASE}/vehicles/GetModelsForMakeId/${makeId}?format=json`,
    { next: { revalidate: 86400 } }
  );

  if (!res.ok) {
    throw new Error(`NHTSA API error: ${res.status}`);
  }

  const data = await res.json();
  return data.Results as NhtsaModel[];
}

// ---------------------------------------------------------------------------
// Catalogue — deterministic mock data backed by real NHTSA make/model names
// (The NHTSA API doesn't provide pricing/mileage; we generate that locally.)
// ---------------------------------------------------------------------------

const SEED_LISTINGS: Omit<Vehicle, "id" | "slug">[] = [
  {
    make: "Dodge",
    model: "Charger",
    year: 2019,
    price: 28900,
    mileage: 41200,
    fuel: "Petrol",
    transmission: "Automatic",
    color: "Pitch Black",
    bodyType: "Sedan",
    engine: "3.6L V6",
    power: 292,
    location: "Los Angeles, CA",
    condition: "Excellent",
    description:
      "One owner, clean Carfax. Full service history at authorised dealer. " +
      "Factory tinted windows, heated front seats, Alpine audio upgrade.",
    images: ["/dodge-400-200.jpg"],
    features: ["Heated Seats", "Android Auto", "Backup Camera", "Keyless Entry"],
    sellerName: "Pacific Motors",
    postedAt: "2024-11-03",
  },
  {
    make: "Ford",
    model: "Mustang",
    year: 2021,
    price: 34500,
    mileage: 22800,
    fuel: "Petrol",
    transmission: "Manual",
    color: "Grabber Blue",
    bodyType: "Coupe",
    engine: "5.0L V8",
    power: 450,
    location: "Dallas, TX",
    condition: "Excellent",
    description:
      "GT trim, 6-speed manual. Magneride suspension, Brembo brakes, " +
      "B&O sound system. Never tracked.",
    images: ["/dodge-400-200.jpg"],
    features: ["Brembo Brakes", "MagneRide", "B&O Audio", "Launch Control"],
    sellerName: "Lone Star Autos",
    postedAt: "2024-11-10",
  },
  {
    make: "BMW",
    model: "M3",
    year: 2020,
    price: 52000,
    mileage: 31000,
    fuel: "Petrol",
    transmission: "Automatic",
    color: "Alpine White",
    bodyType: "Sedan",
    engine: "3.0L Inline-6 Turbo",
    power: 473,
    location: "Chicago, IL",
    condition: "Excellent",
    description:
      "Competition package, carbon fibre interior trim, executive package. " +
      "All service records available.",
    images: ["/dodge-400-200.jpg"],
    features: ["Carbon Ceramic Brakes", "Head-Up Display", "Adaptive Cruise", "M Driver Package"],
    sellerName: "Bavarian Auto Group",
    postedAt: "2024-10-28",
  },
  {
    make: "Toyota",
    model: "Supra",
    year: 2022,
    price: 47800,
    mileage: 11500,
    fuel: "Petrol",
    transmission: "Automatic",
    color: "Renaissance Red",
    bodyType: "Coupe",
    engine: "3.0L Inline-6 Turbo",
    power: 382,
    location: "Seattle, WA",
    condition: "Excellent",
    description:
      "3.0 GR Supra. Factory warranty transferable. Dealer maintained, " +
      "zero accidents. JBL audio, wireless charging.",
    images: ["/dodge-400-200.jpg"],
    features: ["JBL Premium Audio", "Wireless Charging", "Adaptive Dampers", "Park Assist"],
    sellerName: "Northwest Imports",
    postedAt: "2024-11-15",
  },
  {
    make: "Chevrolet",
    model: "Camaro",
    year: 2018,
    price: 24700,
    mileage: 55400,
    fuel: "Petrol",
    transmission: "Manual",
    color: "Mosaic Black",
    bodyType: "Coupe",
    engine: "6.2L V8",
    power: 455,
    location: "Miami, FL",
    condition: "Good",
    description:
      "SS trim, 1LE performance package. New tyres 6 months ago. " +
      "Minor cosmetic scratch on rear bumper — reflected in price.",
    images: ["/dodge-400-200.jpg"],
    features: ["1LE Track Package", "Brembo Brakes", "FE3 Suspension", "8-inch Infotainment"],
    sellerName: "Sunshine Motor Co.",
    postedAt: "2024-10-20",
  },
  {
    make: "Porsche",
    model: "911",
    year: 2020,
    price: 94000,
    mileage: 18700,
    fuel: "Petrol",
    transmission: "Automatic",
    color: "Carrara White Metallic",
    bodyType: "Coupe",
    engine: "3.0L Flat-6 Turbo",
    power: 443,
    location: "New York, NY",
    condition: "Excellent",
    description:
      "Carrera S, PDK. Sport Chrono, leather interior, rear-wheel steering. " +
      "Porsche Approved Certified.",
    images: ["/dodge-400-200.jpg"],
    features: ["Sport Chrono", "PASM", "Rear Axle Steering", "Bose Surround Sound"],
    sellerName: "Manhattan Performance",
    postedAt: "2024-11-01",
  },
];

/** Returns all vehicle listings with numeric IDs and URL slugs */
export function getVehicles(): Vehicle[] {
  return SEED_LISTINGS.map((v, i) => ({
    ...v,
    id: i + 1,
    slug: `${v.year}-${v.make}-${v.model}`
      .toLowerCase()
      .replace(/\s+/g, "-"),
  }));
}

/** Finds a single vehicle by its slug */
export function getVehicleBySlug(slug: string): Vehicle | undefined {
  return getVehicles().find((v) => v.slug === slug);
}

/** Returns distinct body types for filter bar */
export function getBodyTypes(): string[] {
  const types = getVehicles().map((v) => v.bodyType);
  return ["All", ...Array.from(new Set(types))];
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatMileage(miles: number): string {
  return new Intl.NumberFormat("en-US").format(miles) + " mi";
}
