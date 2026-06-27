import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { cars } from "@/data/cars";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/favoritos",
    "/login",
    "/sobre",
    "/contato",
    "/privacidade",
    "/termos",
    "/cookies",
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.6,
  }));

  const carRoutes = cars.map((car) => ({
    url: `${site.url}/carros/${car.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...carRoutes];
}
