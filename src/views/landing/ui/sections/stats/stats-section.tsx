import type { LandingStats } from "../../../model";

type Props = {
  stats: LandingStats;
};

export function StatsSection({ stats }: Props) {
  return (
    <section className="container mx-auto py-16">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        <StatCard title="Questions" value={stats.questions} />

        <StatCard title="Topics" value={stats.topics} />

        <StatCard title="Domains" value={stats.domains} />

        <StatCard title="Languages" value={stats.languages} />
      </div>
    </section>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-xl border p-8 text-center">
      <div className="text-4xl font-bold">{value}</div>

      <div className="text-muted-foreground mt-2 text-sm">{title}</div>
    </div>
  );
}
