export function DomainsSection() {
  return (
    <section className="container mx-auto py-16">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="rounded-xl border p-8">
            Domain Card
          </div>
        ))}
      </div>
    </section>
  );
}
