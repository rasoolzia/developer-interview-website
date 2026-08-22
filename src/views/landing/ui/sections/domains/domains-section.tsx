import type { LandingDomain } from "../../../model";

type Props = {
  domains: LandingDomain[];
};

export function DomainsSection({ domains }: Props) {
  return (
    <section className="container mx-auto py-16">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {domains.map((domain) => (
          <div key={domain.slug} className="rounded-xl border p-8">
            <h3 className="text-xl font-semibold">{domain.label}</h3>

            <p className="text-muted-foreground mt-2 text-sm">
              {domain.topics} topics
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
