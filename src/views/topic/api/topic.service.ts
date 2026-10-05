import { getDomains } from "@/entities/domain/api";
import type { Domain } from "@/entities/domain/model";

export async function getAllDomains(): Promise<Domain[]> {
  const domains = await getDomains();
  return domains;
}

export async function getDomainBySlug(slug: string): Promise<Domain | null> {
  const domains = await getDomains();
  const domain = domains.find((d) => d.slug === slug);
  return domain || null;
}
