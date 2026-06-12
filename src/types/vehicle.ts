export interface Vehicle {
  id: number;
  slug: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel: string;
  transmission: string;
  color: string;
  bodyType: string;
  engine: string;
  power: number;
  location: string;
  condition: "Excellent" | "Good" | "Fair";
  description: string;
  images: string[];
  features: string[];
  sellerName: string;
  postedAt: string;
}
