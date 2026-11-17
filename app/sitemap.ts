import type { MetadataRoute } from "next";
import { legalServices } from "@/lib/services";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://adoyolaw.com").replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    ...legalServices.map((service) => ({
      url: `${siteUrl}/services/${service.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
