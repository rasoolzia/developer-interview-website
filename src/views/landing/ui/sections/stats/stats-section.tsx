export function StatsSection() {
  return (
    <section className="container mx-auto py-16">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        <div className="rounded-lg border p-6 text-center">Questions</div>

        <div className="rounded-lg border p-6 text-center">Topics</div>

        <div className="rounded-lg border p-6 text-center">Domains</div>

        <div className="rounded-lg border p-6 text-center">Languages</div>
      </div>
    </section>
  );
}
