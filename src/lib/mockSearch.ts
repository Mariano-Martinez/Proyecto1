import { SearchResult } from "./types";

const sellers = ["TechWorld", "MercadoPlus", "Official Store", "Outlet Digital", "GadgetsYA"];
const locations = ["CABA", "Córdoba", "Rosario", "Mendoza", "La Plata"];

export function generateMockResults(label: string): SearchResult[] {
  const base = label || "Producto";
  return Array.from({ length: 10 }).map((_, idx) => {
    const price = Math.round(200 + Math.random() * 800);
    const seller = sellers[idx % sellers.length];
    const location = locations[(idx + 2) % locations.length];
    return {
      id: `res_${idx}`,
      title: `${base} ${idx + 1}`,
      price,
      seller,
      location,
      thumbnail: `https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=400&q=60&sat=${20 + idx}`,
      link: `https://articulo.mercadolibre.com.ar/MLA-${100000 + idx}`,
    };
  });
}
