import { Domain } from "@/entities/domain/model";
import { DomainCard } from "@/entities/domain/ui";

type Props = {
  domains: Domain[];
};

export function DomainGrid({ domains }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {domains.map((domain) => (
        <DomainCard key={domain.slug} domain={domain} />
      ))}
    </div>
  );
}
